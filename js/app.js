// Project data with POI coordinates and details
const projects = {
    helios: {
        title: "PROJECT HELIOS",
        region: "NODE_01 // US-EAST-1",
        description: "Next-gen orbital data visualization engine built with Three.js and custom GLSL shaders. Focused on real-time satellite telemetry mapping.",
        fullDescription: "PROJECT HELIOS is a sophisticated orbital data visualization platform designed to visualize real-time satellite telemetry and orbital mechanics. Built with Three.js and WebGL, it features custom GLSL shaders for advanced rendering techniques and immersive visualization.",
        tech: ["TYPESCRIPT", "THREE.JS", "REACT", "GLSL"],
        status: "STABLE",
        features: [
            "Real-time satellite position tracking",
            "Custom orbital mechanics simulation",
            "Interactive 3D data visualization",
            "Custom GLSL shader pipeline",
            "Multi-layer telemetry overlay system"
        ],
        poiCoordinates: { latitude: 0, longitude: 0 },
        uptime: "3224H"
    },
    neural_mesh: {
        title: "NEURAL_MESH",
        region: "NODE_02 // US-WEST-2",
        description: "Distributed AI inference node leveraging WebGPU for localized processing units.",
        fullDescription: "NEURAL_MESH is a decentralized AI inference platform that distributes computation across edge nodes using WebGPU for GPU-accelerated processing. It enables real-time machine learning inference at the network edge.",
        tech: ["TYPESCRIPT", "WEBGPU", "RUST", "WASM"],
        status: "BETA",
        features: [
            "Distributed inference architecture",
            "WebGPU GPU acceleration",
            "Edge node orchestration",
            "Model quantization & optimization",
            "Real-time performance monitoring"
        ],
        poiCoordinates: { latitude: 40, longitude: -120 },
        uptime: "812H"
    },
    aegis_gate: {
        title: "AEGIS_GATE",
        region: "NODE_03 // EU-CENTRAL-1",
        description: "Cyber-security firewall implementation with zero-knowledge proof authentication protocols.",
        fullDescription: "AEGIS_GATE is an advanced cybersecurity platform implementing zero-knowledge proof authentication and advanced threat detection. It provides enterprise-grade security with privacy-preserving authentication mechanisms.",
        tech: ["RUST", "CRYPTOGRAPHY", "ZKP", "GOLANG"],
        status: "PRODUCTION",
        features: [
            "Zero-knowledge proof authentication",
            "Advanced threat detection engine",
            "Encrypted traffic analysis",
            "Rate limiting & DDoS protection",
            "Real-time security analytics"
        ],
        poiCoordinates: { latitude: 50, longitude: 15 },
        uptime: "14212H"
    },
    quantum_sync: {
        title: "QUANTUM_SYNC",
        region: "NODE_04 // AP-SOUTHEAST-1",
        description: "Real-time state synchronization module for massively multiplayer concurrent environments.",
        fullDescription: "QUANTUM_SYNC provides real-time state synchronization for large-scale multiplayer applications. It uses advanced conflict resolution algorithms and optimistic updates to maintain consistency across distributed systems.",
        tech: ["TYPESCRIPT", "NODEJS", "REDIS", "WEBSOCKETS"],
        status: "TESTING",
        features: [
            "Real-time state synchronization",
            "Optimistic update resolution",
            "Conflict-free replicated data types",
            "Scalable pub-sub messaging",
            "Network latency compensation"
        ],
        poiCoordinates: { latitude: -10, longitude: 105 },
        uptime: "12H"
    }
};

// View management
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        targetView.classList.add('active');
        
        if (viewName === 'orbital') {
            // Initialize globe when switching to orbital view
            setTimeout(() => {
                if (window.initGlobe) {
                    window.initGlobe();
                }
            }, 100);
        }
    }
}

// View link navigation
document.querySelectorAll('.view-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const view = e.currentTarget.getAttribute('data-view');
        switchView(view);
    });
});

// Project card click handlers
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const projectKey = e.currentTarget.getAttribute('data-project');
        showProjectModal(projectKey);
    });
});

// Modal management
function showProjectModal(projectKey) {
    const project = projects[projectKey];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    
    document.getElementById('modal-tag').textContent = project.region;
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.fullDescription;
    document.getElementById('modal-tech').textContent = project.tech.join(", ");
    document.getElementById('modal-status').textContent = project.status;
    
    const detailsDiv = document.getElementById('modal-details');
    detailsDiv.innerHTML = `
        <p><strong>Uptime:</strong> ${project.uptime}</p>
        <p><strong>Type:</strong> Advanced distributed computing node</p>
        <p><strong>Deployment:</strong> Multi-region active deployment</p>
    `;
    
    const featuresList = document.getElementById('modal-features');
    featuresList.innerHTML = project.features.map(f => `<li>${f}</li>`).join('');
    
    modal.classList.remove('hidden');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

// Modal close handlers
document.getElementById('close-modal').addEventListener('click', closeProjectModal);
document.getElementById('modal-close-btn').addEventListener('click', closeProjectModal);

// Close modal on backdrop click
document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeProjectModal();
    }
});

// Micro-interactions for hover effects on dashboard
document.querySelectorAll('.cyber-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const scanline = card.querySelector('.scanline');
        if (scanline) scanline.style.animationDuration = '1.5s';
    });
    card.addEventListener('mouseleave', () => {
        const scanline = card.querySelector('.scanline');
        if (scanline) scanline.style.animationDuration = '4s';
    });
});

// Simulating data updates
setInterval(() => {
    const latencies = ['12.4', '11.8', '13.1', '12.9', '12.1'];
    const target = document.querySelector('.neon-glow');
    if (target) {
        const newValue = latencies[Math.floor(Math.random() * latencies.length)];
        target.innerText = newValue + ' MS';
    }
}, 3000);

// Export projects and helper functions for use in other scripts
window.portfolioData = {
    projects,
    switchView,
    showProjectModal,
    closeProjectModal
};
