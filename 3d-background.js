let scene, camera, renderer, trumpet;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Powerful lighting setup for dramatic effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 5, 5);
    const backLight = new THREE.DirectionalLight(0xffffff, 2);
    backLight.position.set(-5, -5, -5);
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 10, 0);
    const bottomLight = new THREE.PointLight(0xffffff, 1.5);
    bottomLight.position.set(0, -10, 0);
    scene.add(ambientLight, directionalLight, backLight, spotLight, bottomLight);
    
    const loader = new THREE.GLTFLoader();
    loader.load(
        './trumpet.glb',
        function (gltf) {
            trumpet = gltf.scene;
            trumpet.scale.set(8, 8, 8); // Much much bigger trumpet
            trumpet.position.set(0, 0, -2); // Brought more forward
            trumpet.rotation.x = 0.3; // Dramatic initial tilt
            scene.add(trumpet);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error occurred loading the model:', error);
        }
    );
    
    camera.position.z = 10;
}

function animate() {
    requestAnimationFrame(animate);
    
    if (trumpet) {
        // Dynamic scroll-based rotation
        const scrollPosition = window.scrollY;
        trumpet.rotation.y = scrollPosition * 0.005; // More pronounced rotation
        trumpet.rotation.x = 0.3 + (scrollPosition * 0.001); // Added tilt variation
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

// Initialize AOS
AOS.init({
    duration: 800,
    once: true
});

// Theme switcher
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
