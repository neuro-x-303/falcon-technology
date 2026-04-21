import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
    const mountRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let scene, camera, renderer, particles, connections, dataPackets;
        let particlesData = [];
        const count = 120;
        const maxDistance = 4.5;
        const packetCount = 40;

        const createGlowTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(0, 243, 255, 1)');
            gradient.addColorStop(0.2, 'rgba(0, 243, 255, 0.4)');
            gradient.addColorStop(0.5, 'rgba(0, 243, 255, 0.1)');
            gradient.addColorStop(1, 'rgba(0, 243, 255, 0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 64, 64);
            return new window.THREE.CanvasTexture(canvas);
        };

        const init = () => {
            const THREE = window.THREE;
            if (!THREE) return;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 15;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

            // Particles (Nodes)
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            const sizes = new Float32Array(count);

            for (let i = 0; i < count; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

                particlesData.push({
                    velocity: new THREE.Vector3(
                        (-1 + Math.random() * 2) * 0.01,
                        (-1 + Math.random() * 2) * 0.01,
                        (-1 + Math.random() * 2) * 0.01
                    )
                });
                sizes[i] = 1.0 + Math.random() * 2.0;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

            const material = new THREE.PointsMaterial({
                size: 0.4,
                map: createGlowTexture(),
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                color: 0x00f3ff
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            // Connections
            const lineGeometry = new THREE.BufferGeometry();
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x7b2ff7,
                transparent: true,
                opacity: 0.2,
                blending: THREE.AdditiveBlending
            });

            connections = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(connections);

            // Data Packets
            const packetGeometry = new THREE.BufferGeometry();
            const packetPositions = new Float32Array(packetCount * 3);
            packetGeometry.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
            
            const packetMaterial = new THREE.PointsMaterial({
                size: 0.25,
                color: 0x00f3ff,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending,
                map: createGlowTexture()
            });
            
            dataPackets = new THREE.Points(packetGeometry, packetMaterial);
            scene.add(dataPackets);

            const packetState = [];
            for(let i=0; i<packetCount; i++) {
                packetState.push({
                    active: false,
                    startNode: 0,
                    endNode: 0,
                    progress: 0,
                    speed: 0.005 + Math.random() * 0.01
                });
            }

            const onMouseMove = (event) => {
                mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
            };

            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('resize', onWindowResize);
            
            const animate = () => {
                if (!scene) return;
                requestAnimationFrame(animate);

                const positions = particles.geometry.attributes.position.array;
                const linePositions = [];

                // Update Nodes
                for (let i = 0; i < count; i++) {
                    const data = particlesData[i];
                    positions[i * 3] += data.velocity.x;
                    positions[i * 3 + 1] += data.velocity.y;
                    positions[i * 3 + 2] += data.velocity.z;

                    // Bounds
                    if (Math.abs(positions[i * 3]) > 15) data.velocity.x *= -1;
                    if (Math.abs(positions[i * 3 + 1]) > 15) data.velocity.y *= -1;
                    if (Math.abs(positions[i * 3 + 2]) > 15) data.velocity.z *= -1;

                    // Mouse Depth
                    const dx = positions[i * 3] - (mouse.current.x * 10);
                    const dy = positions[i * 3 + 1] - (mouse.current.y * 10);
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 5) {
                        positions[i * 3] += dx * 0.005;
                        positions[i * 3 + 1] += dy * 0.005;
                    }
                }
                particles.geometry.attributes.position.needsUpdate = true;

                // Update Lines & Packet Triggers
                const connectionsList = [];
                for (let i = 0; i < count; i++) {
                    for (let j = i + 1; j < count; j++) {
                        const dx = positions[i * 3] - positions[j * 3];
                        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

                        if (dist < maxDistance) {
                            linePositions.push(positions[i*3], positions[i*3+1], positions[i*3+2]);
                            linePositions.push(positions[j*3], positions[j*3+1], positions[j*3+2]);
                            connectionsList.push({s: i, e: j});
                        }
                    }
                }
                connections.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));

                // Update Packets
                const pPos = dataPackets.geometry.attributes.position.array;
                const time = Date.now() * 0.001;
                
                for (let i = 0; i < packetCount; i++) {
                    const p = packetState[i];
                    if (!p.active && connectionsList.length > 0 && Math.random() < 0.05) {
                        const conn = connectionsList[Math.floor(Math.random() * connectionsList.length)];
                        p.active = true;
                        p.startNode = conn.s;
                        p.endNode = conn.e;
                        p.progress = 0;
                    }

                    if (p.active) {
                        p.progress += p.speed;
                        if (p.progress >= 1) {
                            p.active = false;
                            pPos[i * 3] = pPos[i * 3 + 1] = pPos[i * 3 + 2] = 1000;
                        } else {
                            const s = p.startNode * 3;
                            const e = p.endNode * 3;
                            pPos[i * 3] = positions[s] + (positions[e] - positions[s]) * p.progress;
                            pPos[i * 3 + 1] = positions[s + 1] + (positions[e + 1] - positions[s + 1]) * p.progress;
                            pPos[i * 3 + 2] = positions[s + 2] + (positions[e + 2] - positions[s + 2]) * p.progress;
                        }
                    } else {
                        pPos[i * 3] = pPos[i * 3 + 1] = pPos[i * 3 + 2] = 1000;
                    }
                }
                dataPackets.geometry.attributes.position.needsUpdate = true;
                dataPackets.material.opacity = 0.5 + Math.sin(time * 3) * 0.3;

                scene.rotation.y += 0.0005;
                renderer.render(scene, camera);
            };

            animate();
        };

        const onWindowResize = () => {
            if (!renderer || !camera) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        if (window.THREE) {
            init();
        } else {
            const interval = setInterval(() => {
                if (window.THREE) {
                    clearInterval(interval);
                    init();
                }
            }, 100);
            return () => clearInterval(interval);
        }

        const currentRef = mountRef.current;
        return () => {
            if (currentRef && renderer && renderer.domElement) {
                currentRef.removeChild(renderer.domElement);
            }
            window.removeEventListener('mousemove', (e)=>{});
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none', background: '#020617' }} />;
};

export default ThreeBackground;
