import React, { useEffect, useRef } from 'react';

const ThreeBackground = () => {
    const mountRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let scene, camera, renderer, cloud, linesMesh;
        let animationFrameId;
        const currentMount = mountRef.current;
        
        const pointCount = 100;
        const maxDistance = 5;
        const points = [];

        const init = () => {
            const THREE = window.THREE;
            if (!THREE) return;

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 12;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x020617, 1);
            
            if (currentMount) {
                currentMount.innerHTML = '';
                currentMount.appendChild(renderer.domElement);
            }

            // Create Points (Neural Nodes)
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(pointCount * 3);

            for (let i = 0; i < pointCount; i++) {
                const x = (Math.random() - 0.5) * 25;
                const y = (Math.random() - 0.5) * 25;
                const z = (Math.random() - 0.5) * 25;
                
                positions[i * 3] = x;
                positions[i * 3 + 1] = y;
                positions[i * 3 + 2] = z;
                
                points.push(new THREE.Vector3(x, y, z));
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const material = new THREE.PointsMaterial({
                size: 0.15,
                color: 0x00f3ff,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            cloud = new THREE.Points(geometry, material);
            scene.add(cloud);

            // Create Connections (Neural Lines) - Optimized with BufferGeometry
            const linePositions = [];
            const lineGeometry = new THREE.BufferGeometry();

            for (let i = 0; i < pointCount; i++) {
                for (let j = i + 1; j < pointCount; j++) {
                    const distance = points[i].distanceTo(points[j]);
                    if (distance < maxDistance) {
                        linePositions.push(points[i].x, points[i].y, points[i].z);
                        linePositions.push(points[j].x, points[j].y, points[j].z);
                    }
                }
            }

            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
            
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x7b2ff7,
                transparent: true,
                opacity: 0.2,
                blending: THREE.AdditiveBlending
            });

            linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
            scene.add(linesMesh);

            const onMouseMove = (event) => {
                mouse.current.x = (event.clientX / window.innerWidth - 0.5);
                mouse.current.y = (event.clientY / window.innerHeight - 0.5);
            };

            window.addEventListener('mousemove', onMouseMove);
            
            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);

                // Gentle Rotation
                cloud.rotation.y += 0.0015;
                cloud.rotation.x += 0.0008;
                linesMesh.rotation.y += 0.0015;
                linesMesh.rotation.x += 0.0008;

                // Smooth Camera Parallax
                camera.position.x += (mouse.current.x * 4 - camera.position.x) * 0.03;
                camera.position.y += (-mouse.current.y * 4 - camera.position.y) * 0.03;
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

        const checkThree = setInterval(() => {
            if (window.THREE) {
                clearInterval(checkThree);
                init();
            }
        }, 100);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener('mousemove', (e)=>{});
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            clearInterval(checkThree);
            if (currentMount) currentMount.innerHTML = '';
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            className="three-bg-container"
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: -1, 
                pointerEvents: 'none',
                background: '#020617'
            }} 
        />
    );
};

export default ThreeBackground;
