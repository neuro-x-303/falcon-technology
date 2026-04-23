// --- High-Fidelity Neural Mesh with Data Pulses ---
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const nodes = [];
    const nodeCount = 80;
    const maxDistance = 5;

    // Node Class for Individual Control
    class Node {
        constructor() {
            this.init();
        }

        init() {
            this.pos = new THREE.Vector3(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25
            );
            this.vel = new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            );
            this.life = Math.random() * 0.5 + 0.5;
            this.blinkState = 0;
        }

        update() {
            this.pos.add(this.vel);
            
            // Boundary Check
            if (Math.abs(this.pos.x) > 15) this.vel.x *= -1;
            if (Math.abs(this.pos.y) > 15) this.vel.y *= -1;
            if (Math.abs(this.pos.z) > 15) this.vel.z *= -1;

            // Life Cycle / Blinking
            this.life -= 0.001;
            if (this.life <= 0) {
                this.init(); // Respawn
            }
        }
    }

    for (let i = 0; i < nodeCount; i++) nodes.push(new Node());

    // Materials
    const pointMaterial = new THREE.PointsMaterial({
        size: 0.12,
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x7b2ff7,
        transparent: true,
        opacity: 0.15
    });

    const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0x00f3ff,
        transparent: true,
        opacity: 0.8
    });

    const pulseGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const pulseGroup = new THREE.Group();
    scene.add(pulseGroup);

    // Dynamic Geometries
    const pointGeometry = new THREE.BufferGeometry();
    const lineGeometry = new THREE.BufferGeometry();
    
    const cloud = new THREE.Points(pointGeometry, pointMaterial);
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    
    scene.add(cloud);
    scene.add(lines);

    camera.position.z = 12;

    // Pulse System
    const activePulses = [];

    function triggerPulse(start, end) {
        if (Math.random() > 0.98) { // Only some connections pulse
            const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
            activePulses.push({
                mesh: pulse,
                start: start.clone(),
                end: end.clone(),
                progress: 0
            });
            pulseGroup.add(pulse);
        }
    }

    // Interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.0005;
    });

    function animate() {
        requestAnimationFrame(animate);

        const positions = [];
        const linePositions = [];

        // Update Nodes
        nodes.forEach(node => {
            node.update();
            positions.push(node.pos.x, node.pos.y, node.pos.z);
        });

        // Build Connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dist = nodes[i].pos.distanceTo(nodes[j].pos);
                if (dist < maxDistance) {
                    linePositions.push(
                        nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
                        nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
                    );
                    triggerPulse(nodes[i].pos, nodes[j].pos);
                }
            }
        }

        // Update Pulses
        for (let i = activePulses.length - 1; i >= 0; i--) {
            const p = activePulses[i];
            p.progress += 0.02;
            if (p.progress >= 1) {
                pulseGroup.remove(p.mesh);
                activePulses.splice(i, 1);
            } else {
                p.mesh.position.lerpVectors(p.start, p.end, p.progress);
            }
        }

        pointGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

        camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 10 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
