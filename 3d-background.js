let scene, camera, renderer, trumpet;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Enhanced lighting for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(-5, -5, -5);
    scene.add(ambientLight, directionalLight, backLight);
    
    const loader = new THREE.GLTFLoader();
    loader.load(
        './trumpet.glb',
        function (gltf) {
            trumpet = gltf.scene;
            trumpet.scale.set(4, 4, 4); // Bigger trumpet
            trumpet.position.set(0, 0, -10); // Positioned further back
            trumpet.rotation.x = 0.2; // Slight tilt
            scene.add(trumpet);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error occurred loading the model:', error);
        }
    );
    
    camera.position.z = 15;
}

function animate() {
    requestAnimationFrame(animate);
    
    if (trumpet) {
        // Gentle continuous rotation
        trumpet.rotation.y += 0.002;
    }
    
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
window.addEventListener('load', init);
window.addEventListener('load', animate);
