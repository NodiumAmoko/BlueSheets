// Importation des bibliothèques Three.js nécessaires
import * as THREE from 'https://cdn.skypack.dev/three';
import { STLLoader } from 'https://cdn.skypack.dev/three/examples/jsm/loaders/STLLoader.js';

// Création de la scène principale
const scene = new THREE.Scene();

// Configuration de la caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;

// Création du renderer et ajout au DOM
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lumière directionnelle
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Fonction pour charger et afficher un fichier STL
const loadSTLModel = (url) => {
  const loader = new STLLoader();
  loader.load(url, (geometry) => {
    const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position initiale aléatoire
    mesh.position.set(
      (Math.random() - 0.5) * 40, 
      (Math.random() - 0.5) * 40, 
      (Math.random() - 0.5) * 40
    );
    
    // Ajout de l'objet à la scène
    scene.add(mesh);
    
    // Ajout d'une animation de déplacement aléatoire
    animateMesh(mesh);
  });
};

// Fonction de déplacement aléatoire de l'objet
const animateMesh = (mesh) => {
  const speedX = (Math.random() - 0.5) * 0.2;
  const speedY = (Math.random() - 0.5) * 0.2;
  const speedZ = (Math.random() - 0.5) * 0.2;
  
  const animate = () => {
    mesh.position.x += speedX;
    mesh.position.y += speedY;
    mesh.position.z += speedZ;
    
    // Rebond sur les bords de l'écran (ajustez les limites si nécessaire)
    if (mesh.position.x > 20 || mesh.position.x < -20) speedX *= -1;
    if (mesh.position.y > 20 || mesh.position.y < -20) speedY *= -1;
    if (mesh.position.z > 20 || mesh.position.z < -20) speedZ *= -1;
    
    requestAnimationFrame(animate);
  };
  animate();
};

// Fonction d'animation principale
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Chargement de plusieurs modèles STL (vous pouvez ajouter d'autres URL ici)
loadSTLModel('./models/1.STL');
loadSTLModel('./models/2.STL');

// Démarrage de l'animation principale
animate();

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
