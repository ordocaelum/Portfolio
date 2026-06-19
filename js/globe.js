// Globe visualization with Three.js
let scene, camera, renderer, globe, controls;
let poiMarkers = [];
let selectedPOI = null;
let isGlobeInitialized = false;

function initGlobe() {
    if (isGlobeInitialized) return;
    
    const canvas = document.getElementById('canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    // Camera setup
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    camera.position.z = 2.5;

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Add subtle lighting
    const ambientLight = new THREE.AmbientLight(0x4edea3, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4edea3, 0.6);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Create globe
    createGlobe();

    // Create POI markers
    createPOIMarkers();

    // Mouse controls
    setupControls();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);

    // Start animation loop
    animate();

    isGlobeInitialized = true;
}

function createGlobe() {
    // Create sphere geometry for globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);

    // Create canvas texture for globe
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Dark base color
    ctx.fillStyle = '#0e0e0e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle grid
    ctx.strokeStyle = 'rgba(78, 222, 163, 0.1)';
    ctx.lineWidth = 1;

    // Latitude lines
    for (let lat = -90; lat <= 90; lat += 30) {
        const y = (lat + 90) * (canvas.height / 180);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Longitude lines
    for (let lon = -180; lon <= 180; lon += 30) {
        const x = (lon + 180) * (canvas.width / 360);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Add some land masses (simplified)
    ctx.fillStyle = 'rgba(78, 222, 163, 0.15)';
    
    // North America
    ctx.fillRect(150, 250, 200, 150);
    // South America
    ctx.fillRect(250, 450, 100, 150);
    // Europe
    ctx.fillRect(450, 250, 150, 100);
    // Africa
    ctx.fillRect(500, 350, 200, 150);
    // Asia
    ctx.fillRect(700, 200, 300, 200);
    // Australia
    ctx.fillRect(950, 500, 120, 100);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        emissive: 0x4edea3,
        emissiveIntensity: 0.2
    });

    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.02, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x4edea3,
        transparent: true,
        opacity: 0.15
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);
}

function createPOIMarkers() {
    // Convert lat/lon to 3D coordinates on sphere
    const projectsArray = Object.entries(window.portfolioData.projects);

    projectsArray.forEach(([key, project]) => {
        const lat = project.poiCoordinates.latitude;
        const lon = project.poiCoordinates.longitude;

        // Convert to radians
        const phi = (90 - lat) * Math.PI / 180;
        const theta = (lon + 180) * Math.PI / 180;

        // Convert to 3D coordinates
        const x = Math.sin(phi) * Math.cos(theta);
        const y = Math.cos(phi);
        const z = Math.sin(phi) * Math.sin(theta);

        // Create marker
        const markerGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({
            color: 0x4edea3,
            emissive: 0x4edea3,
            emissiveIntensity: 0.8
        });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(x, y, z);
        marker.userData.projectKey = key;
        marker.userData.project = project;
        scene.add(marker);

        // Add pulsing animation
        marker.userData.pulse = {
            originalScale: 0.08,
            time: Math.random() * Math.PI * 2
        };

        poiMarkers.push(marker);
    });
}

function setupControls() {
    const canvas = document.getElementById('canvas');
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - previousMousePosition.x;
            const deltaY = e.clientY - previousMousePosition.y;

            globe.rotation.y += deltaX * 0.01;
            globe.rotation.x += deltaY * 0.01;

            poiMarkers.forEach(marker => {
                marker.rotation.y += deltaX * 0.01;
                marker.rotation.x += deltaY * 0.01;
            });

            previousMousePosition = { x: e.clientX, y: e.clientY };
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDragging = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    // Zoom with scroll
    canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const zoomSpeed = 0.1;
        const direction = e.deltaY > 0 ? 1 : -1;
        
        camera.position.z += direction * zoomSpeed;
        camera.position.z = Math.max(1.5, Math.min(5, camera.position.z));

        // Update zoom level display
        const zoomPercent = Math.round((5 - camera.position.z) / (5 - 1.5) * 100);
        document.getElementById('zoom-level').textContent = zoomPercent + '%';
    });

    // Raycaster for POI selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(poiMarkers);

        if (intersects.length > 0) {
            const selected = intersects[0].object;
            selectPOI(selected);
        } else {
            deselectPOI();
        }
    });
}

function selectPOI(marker) {
    selectedPOI = marker;
    
    // Update material
    marker.material.emissiveIntensity = 1;
    marker.scale.set(1.5, 1.5, 1.5);

    // Show project info panel
    const panel = document.getElementById('project-info-panel');
    document.getElementById('poi-region').textContent = marker.userData.project.region;
    document.getElementById('poi-title').textContent = marker.userData.project.title;
    document.getElementById('poi-description').textContent = marker.userData.project.description;
    
    document.getElementById('view-project-btn').onclick = () => {
        window.portfolioData.showProjectModal(marker.userData.projectKey);
    };
    
    panel.classList.remove('hidden');
}

function deselectPOI() {
    if (selectedPOI) {
        selectedPOI.material.emissiveIntensity = 0.8;
        selectedPOI.scale.set(1, 1, 1);
        selectedPOI = null;
    }
    document.getElementById('project-info-panel').classList.add('hidden');
}

function onWindowResize() {
    const canvas = document.getElementById('canvas');
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate globe slowly
    if (globe && !selectedPOI) {
        globe.rotation.y += 0.0001;
    }

    // Update POI markers
    poiMarkers.forEach(marker => {
        // Pulsing effect
        const pulse = marker.userData.pulse;
        pulse.time += 0.05;
        const pulseScale = 1 + Math.sin(pulse.time) * 0.3;
        marker.scale.set(pulseScale, pulseScale, pulseScale);

        // Keep markers facing camera
        marker.lookAt(camera.position);
    });

    renderer.render(scene, camera);
}

// Make init function globally accessible
window.initGlobe = initGlobe;

// Auto-initialize when orbital view is shown
document.addEventListener('DOMContentLoaded', () => {
    // Initialize on load if orbital view is active
    const orbitalView = document.getElementById('orbital-view');
    if (orbitalView && orbitalView.classList.contains('active')) {
        setTimeout(initGlobe, 100);
    }
});
