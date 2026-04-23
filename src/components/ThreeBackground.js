import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
    const mountRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let scene, camera, renderer, linesMesh;
        let particlesData = [];
        let positions, colors;
        let particles;
        let pointCloud;
        let particlePositions;
        let linesGeometry;
        let linesMaterial;
        const particleCount = 180;
        const maxDistance = 6.5;
        const currentMount = mountRef.current;
        let animationFrameId;

        const init = () => {
            const THREE = window.THREE;
            if (!THREE) return;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 16;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x020617, 1);
            
            if (currentMount) {
                currentMount.innerHTML = '';
                currentMount.appendChild(renderer.domElement);
            }

            const segments = particleCount * particleCount;

            positions = new Float32Array(segments * 3);
            colors = new Float32Array(segments * 3);

            const pMaterial = new THREE.PointsMaterial({
                color: 0x00f3ff,
                size: 0.12,
                blending: THREE.AdditiveBlending,
                transparent: true,
                sizeAttenuation: true,
                opacity: 0.9
            });

            particles = new THREE.BufferGeometry();
            particlePositions = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount; i++) {
                const x = (Math.random() - 0.5) * 35;
                const y = (Math.random() - 0.5) * 35;
                const z = (Math.random() - 0.5) * 35;

                particlePositions[i * 3] = x;
                particlePositions[i * 3 + 1] = y;
                particlePositions[i * 3 + 2] = z;

                particlesData.push({
                    velocity: new THREE.Vector3(
                        (Math.random() - 0.5) * 0.08,
                        (Math.random() - 0.5) * 0.08,
                        (Math.random() - 0.5) * 0.08
                    ),
                    numConnections: 0,
                    phase: Math.random() * Math.PI * 2
                });
            }

            particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

            pointCloud = new THREE.Points(particles, pMaterial);
            scene.add(pointCloud);

            linesGeometry = new THREE.BufferGeometry();
            linesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            linesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            linesMaterial = new THREE.LineBasicMaterial({
                vertexColors: true,
                blending: THREE.AdditiveBlending,
                transparent: true,
                opacity: 0.4
            });

            linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
            scene.add(linesMesh);

            const onMouseMove = (event) => {
                mouse.current.x = (event.clientX - window.innerWidth / 2) * 0.001;
                mouse.current.y = (event.clientY - window.innerHeight / 2) * 0.001;
            };

            window.addEventListener('mousemove', onMouseMove);
            
            const animate = () => {
                if (!scene || !renderer) return;
                animationFrameId = requestAnimationFrame(animate);

                let vertexpos = 0;
                let colorpos = 0;
                let numConnected = 0;

                for (let i = 0; i < particleCount; i++)
                    particlesData[i].numConnections = 0;

                const time = Date.now() * 0.0015;

                for (let i = 0; i < particleCount; i++) {
                    const particleData = particlesData[i];
                    
                    // Random organic movement + physics
                    particleData.phase += 0.02;
                    const bounceX = Math.sin(particleData.phase) * 0.02;
                    const bounceY = Math.cos(particleData.phase) * 0.02;

                    particlePositions[i * 3] += particleData.velocity.x + bounceX;
                    particlePositions[i * 3 + 1] += particleData.velocity.y + bounceY;
                    particlePositions[i * 3 + 2] += particleData.velocity.z;

                    if (particlePositions[i * 3 + 1] < -17 || particlePositions[i * 3 + 1] > 17)
                        particleData.velocity.y = -particleData.velocity.y;

                    if (particlePositions[i * 3] < -17 || particlePositions[i * 3] > 17)
                        particleData.velocity.x = -particleData.velocity.x;

                    if (particlePositions[i * 3 + 2] < -17 || particlePositions[i * 3 + 2] > 17)
                        particleData.velocity.z = -particleData.velocity.z;

                    // Data Flow animation via connection highlighting
                    for (let j = i + 1; j < particleCount; j++) {
                        const particleDataB = particlesData[j];
                        
                        const dx = particlePositions[i * 3] - particlePositions[j * 3];
                        const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
                        const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
                        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                        if (dist < maxDistance) {
                            particleData.numConnections++;
                            particleDataB.numConnections++;

                            const alpha = 1.0 - dist / maxDistance;

                            positions[vertexpos++] = particlePositions[i * 3];
                            positions[vertexpos++] = particlePositions[i * 3 + 1];
                            positions[vertexpos++] = particlePositions[i * 3 + 2];

                            positions[vertexpos++] = particlePositions[j * 3];
                            positions[vertexpos++] = particlePositions[j * 3 + 1];
                            positions[vertexpos++] = particlePositions[j * 3 + 2];

                            // Data flow color effect (flashing lines mimicking data packets)
                            const flowActive = Math.sin(time * 5 + i * 0.1 + j * 0.1) > 0.95;
                            
                            // Base color: 0x7b2ff7 (123, 47, 247) -> normalized: 0.48, 0.18, 0.96
                            // Glow color: 0x00f3ff (0, 243, 255) -> normalized: 0.0, 0.95, 1.0
                            const colorA = flowActive ? 0.0 : 0.48; 
                            const colorB = flowActive ? 0.95 : 0.18;
                            const colorC = flowActive ? 1.0 : 0.96;
                            const brightness = flowActive ? 1.5 : 0.4;

                            colors[colorpos++] = colorA * alpha * brightness;
                            colors[colorpos++] = colorB * alpha * brightness;
                            colors[colorpos++] = colorC * alpha * brightness;

                            colors[colorpos++] = colorA * alpha * brightness;
                            colors[colorpos++] = colorB * alpha * brightness;
                            colors[colorpos++] = colorC * alpha * brightness;

                            numConnected++;
                        }
                    }
                }

                linesMesh.geometry.setDrawRange(0, numConnected * 2);
                linesMesh.geometry.attributes.position.needsUpdate = true;
                linesMesh.geometry.attributes.color.needsUpdate = true;
                pointCloud.geometry.attributes.position.needsUpdate = true;

                if (pointCloud && linesMesh) {
                    pointCloud.rotation.y += 0.0005;
                    linesMesh.rotation.y += 0.0005;
                }

                camera.position.x += (mouse.current.x * 10 - camera.position.x) * 0.05;
                camera.position.y += (-mouse.current.y * 10 - camera.position.y) * 0.05;
                camera.lookAt(scene.position);

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

        window.addEventListener('resize', onWindowResize);

        let checkInterval;
        if (window.THREE) {
            init();
        } else {
            checkInterval = setInterval(() => {
                if (window.THREE) {
                    clearInterval(checkInterval);
                    init();
                }
            }, 100);
            setTimeout(() => { if (checkInterval) clearInterval(checkInterval); }, 5000);
        }

        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('mousemove', (e)=>{});
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (checkInterval) clearInterval(checkInterval);
            if (currentMount) currentMount.innerHTML = '';
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            className="three-bg-canvas"
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: -1, 
                pointerEvents: 'none', 
                background: 'transparent'
            }} 
        />
    );
};

export default ThreeBackground;
