// Initialize Three.js Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("three-container").appendChild(renderer.domElement);

// Load Earth Texture (High-Resolution 8K)
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load("https://blenderartists.org/uploads/default/original/4X/5/0/2/5029a48052f6f91a399a41dcd1004adf854b17ea.jpeg");

// Create Sphere with Earth Texture
const geometry = new THREE.SphereGeometry(1, 64, 64);
const material = new THREE.MeshStandardMaterial({ map: earthTexture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lighting for realism
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 20);
scene.add(light);

camera.position.z = 3;

// Mouse drag variables
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

// Detect when mouse is pressed
document.addEventListener("mousedown", (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

// Detect when mouse is released
document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Detect and apply rotation when dragging
document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;

        sphere.rotation.y += deltaX * 0.005;  // Rotate horizontally
        sphere.rotation.x += deltaY * 0.005;  // Rotate vertically

        previousMousePosition = { x: event.clientX, y: event.clientY };
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();