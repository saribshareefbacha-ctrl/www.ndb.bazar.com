// Three.js scene setup, lights, camera, & WebGL renderer
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

export class SceneManager {
  constructor(canvasId = 'bg', containerId = 'webgl-container') {
    this.canvas = document.getElementById(canvasId);
    this.container = document.getElementById(containerId);
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.clock = new THREE.Clock();
    this.isWebGLRunning = false;
    this.animationFrameId = null;
    
    this.init();
  }

  init() {
    this.setupRenderer();
    this.setupScene();
    this.setupCamera();
    this.setupLighting();
    
    // FIX: Ensure the canvas is visible immediately by forcing a render
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
    
    // Log initialization for debugging
    console.log("SceneManager initialized: Canvas=", this.canvas ? 'Found' : 'Missing', "Renderer=", this.renderer ? 'Ready' : 'Missing');
  }

  setupRenderer() {
    if (this.renderer) this.renderer.dispose();
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e17);
    this.scene.fog = new THREE.Fog(0x0a0e17, 35, 100);
  }

  setupCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    const fov = aspect < 1 ? 48 : 38;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, 0.5, 105);
    
    // FIX: Ensure camera looks at center and is positioned correctly immediately
    this.camera.position.set(26, 15, 28);
    this.camera.lookAt(0, 1.8, 0);
    this.camera.updateProjectionMatrix();
  }

  resetCamera(animated = true, targetPos = { x: 26, y: 15, z: 28 }, targetLook = { x: 0, y: 1.8, z: 0 }) {
    if (!animated) {
      this.camera.position.set(targetPos.x, targetPos.y, targetPos.z);
      this.camera.lookAt(targetLook.x, targetLook.y, targetLook.z);
      this.camera.updateProjectionMatrix();
      return;
    }
    // Note: GSAP animation for camera position is handled in app.js or controls.js
    this.camera.position.set(targetPos.x, targetPos.y, targetPos.z);
    this.camera.lookAt(targetLook.x, targetLook.y, targetLook.z);
    this.camera.updateProjectionMatrix();
  }

  setupLighting() {
    this.lights = {};
    this.lights.hemi = new THREE.HemisphereLight(0x8ea2be, 0x111724, 0.95);
    this.lights.hemi.position.set(0, 50, 0);
    this.scene.add(this.lights.hemi);

    this.lights.ambient = new THREE.AmbientLight(0x0f172a, 0.4);
    this.scene.add(this.lights.ambient);

    this.lights.sun = new THREE.DirectionalLight(0xfff5e6, 1.65);
    this.lights.sun.position.set(34, 48, 28);
    this.lights.sun.castShadow = true;
    this.lights.sun.shadow.mapSize.set(2048, 2048);
    this.lights.sun.shadow.camera.set(-38, 38, 38, -38, 1.0, 120);
    this.lights.sun.shadow.bias = -0.0003;
    this.lights.sun.shadow.normalBias = 0.02;
    this.lights.sun.shadow.radius = 3.5;
    this.scene.add(this.lights.sun);
  }

  onResize() {
    if (!this.renderer || !this.camera) return;
    const w = window.innerWidth, h = window.innerHeight, a = w / h;
    this.camera.aspect = a;
    this.camera.fov = a < 1 ? 48 : 38;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  render() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

export default SceneManager;
