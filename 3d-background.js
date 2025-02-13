let scene, camera, renderer, trumpet;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(ambientLight, directionalLight);
    
    const loader = new THREE.GLTFLoader();
    loader.load(
        'trumpet.glb',
        function (gltf) {
            trumpet = gltf.scene;
            trumpet.scale.set(2, 2, 2);
            trumpet.position.set(0, 0, -5);
            scene.add(trumpet);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error occurred loading the model:', error);
        }
    );
    
    camera.position.z = 5;
}

function animate() {
    requestAnimationFrame(animate);
    
    if (trumpet) {
        const targetRotation = window.scrollY * 0.002;
        trumpet.rotation.y += (targetRotation - trumpet.rotation.y) * 0.05;
        trumpet.position.y = Math.sin(Date.now() * 0.001) * 0.2;
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
