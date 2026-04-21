import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        let scene, camera, renderer, particles, connections;
        let particlesData = [];
        const count = 100; // Fewer particles for connections
        const maxDistance = 3;

        const init = () => {
            const THREE = window.THREE;
            if (!THREE) return;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 10;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            if (mountRef.current) mountRef.current.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);

            for (let i = 0; i < count; i++) {
                const x = (Math.random() - 0.5) * 20;
                const y = (Math.random() - 0.5) * 20;
                const z = (Math.random() - 0.5) * 20;

                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;

                particlesData.push({
                    velocity: new THREE.Vector3(-0.01 + Math.random() * 0.02, -0.01 + Math.random() * 0.02, -0.01 + Math.random() * 0.02),
                    numConnections: 0
                });
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const material = new THREE.PointsMaterial({
                size: 0.1,
                color: 0x00f3ff,
                transparent: true,
                opacity: 0.8
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            const lineGeometry = new THREE.BufferGeometry();
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x7b2ff7,
                transparent: true,
                opacity: 0.2
            });

            connections = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(connections);

            window.addEventListener('resize', onWindowResize, false);
            animate();
        };

        const onWindowResize = () => {
            const THREE = window.THREE;
            if (!THREE || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const animate = () => {
            const THREE = window.THREE;
            if (!THREE || !renderer) return;
            
            requestAnimationFrame(animate);

            const positions = particles.geometry.attributes.position.array;
            const linePositions = [];

            for (let i = 0; i < count; i++) {
                const p = particlesData[i];
                positions[i * 3] += p.velocity.x;
                positions[i * 3 + 1] += p.velocity.y;
                positions[i * 3 + 2] += p.velocity.z;

                // Bounce
                if (positions[i * 3] < -10 || positions[i * 3] > 10) p.velocity.x *= -1;
                if (positions[i * 3 + 1] < -10 || positions[i * 3 + 1] > 10) p.velocity.y *= -1;
                if (positions[i * 3 + 2] < -10 || positions[i * 3 + 2] > 10) p.velocity.z *= -1;

                // Connections
                for (let j = i + 1; j < count; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < maxDistance) {
                        linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                        linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                    }
                }
            }

            particles.geometry.attributes.position.needsUpdate = true;
            connections.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
            
            particles.rotation.y += 0.0005;
            renderer.render(scene, camera);
        };

        // Try to initialize immediately, or Wait for THREE to load
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
            if (currentRef && renderer) {
                currentRef.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />;
};

export default ThreeBackground;
