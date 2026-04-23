// --- Three.js Background Implementation ---
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create Neural Mesh
const points = [];
for (let i = 0; i < 100; i++) {
    points.push(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    ));
}

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const material = new THREE.PointsMaterial({
    size: 0.1,
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const cloud = new THREE.Points(geometry, material);
scene.add(cloud);

// Connections (Neural Lines)
const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x7b2ff7,
    transparent: true,
    opacity: 0.2
});

const lines = new THREE.Group();
for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
        const distance = points[i].distanceTo(points[j]);
        if (distance < 5) {
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
            const line = new THREE.Line(lineGeometry, lineMaterial);
            lines.add(line);
        }
    }
}
scene.add(lines);

camera.position.z = 10;

// Animation Loop
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
});

function animate() {
    requestAnimationFrame(animate);

    cloud.rotation.y += 0.002;
    cloud.rotation.x += 0.001;
    lines.rotation.y += 0.002;
    lines.rotation.x += 0.001;

    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Dynamic Neural Grid ---
const neuralNodes = [
    {
        id: 1,
        title: 'Construction Management',
        status: 'Operational',
        latency: '0.4ms',
        load: '42%',
        tech: 'Structural-Neural',
        description: 'Real-time workforce tracking, material logistics, and structural integrity monitoring via neural sensors.'
    },
    {
        id: 2,
        title: 'Library Management',
        status: 'Synching',
        latency: '1.2ms',
        load: '88%',
        tech: 'Semantic-Index',
        description: 'Autonomous indexing and semantic search architectures for massive knowledge repositories.'
    },
    {
        id: 3,
        title: 'School Management',
        status: 'Operational',
        latency: '0.1ms',
        load: '15%',
        tech: 'Cognitive-Analytics',
        description: 'Next-gen student cognitive analytics and hyper-personalized learning path synthesis.'
    },
    {
        id: 4,
        title: 'Office Management',
        status: 'Optimizing',
        latency: '2.4ms',
        load: '67%',
        tech: 'Resource-Orchestrator',
        description: 'Enterprise-grade resource orchestration and smart environment automation for high-performance teams.'
    }
];

const propertyGrid = document.getElementById('propertyGrid');

function renderNodes(nodes) {
    propertyGrid.innerHTML = '';
    nodes.forEach(node => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <span class="price-tag">${node.tech}</span>
            <h3 class="card-title">${node.title}</h3>
            <div style="margin-bottom: 1rem; color: ${node.status === 'Operational' ? '#00f3ff' : '#ff007a'}; font-size: 0.8rem; font-weight: bold;">
                ● ${node.status}
            </div>
            <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 1.5rem;">${node.description}</p>
            <div style="display: flex; justify-content: space-between; border-top: 1px solid rgba(0, 243, 255, 0.1); padding-top: 1rem; font-size: 0.8rem; color: #64748b;">
                <span>Latency: ${node.latency}</span>
                <span>Load: ${node.load}</span>
            </div>
        `;
        propertyGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderNodes(neuralNodes);

    // Fade-in animation for cards
    const cards = document.querySelectorAll('.property-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.5s ease ${i * 0.1}s`;
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
});
