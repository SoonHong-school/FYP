// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.getElementById("canvas-container").appendChild(renderer.domElement);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

// Orbit Controls (optional if you want rotation)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Load model
const loader = new THREE.GLTFLoader();
loader.load(
  "assets/models/car.glb", // adjust path if needed
  function(gltf) {
    const model = gltf.scene;
    model.scale.set(2, 2, 2);
    scene.add(model);
    animate();
  },
  undefined,
  function(error) {
    console.error("Error loading model:", error);
  }
);

camera.position.z = 5;

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
