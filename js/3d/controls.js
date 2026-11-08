// OrbitControls configuration & boundary locks
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js';

export class ControlsManager {
  constructor(camera, renderer, scene) {
    this.camera = camera;
    this.renderer = renderer;
    this.scene = scene;
    this.controls = null;
    this.init();
  }

  init() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.12;
    this.controls.maxPolarAngle = Math.PI * 0.48; // 86 degrees (prevents going below ground)
    this.controls.minPolarAngle = Math.PI * 0.12; // 21 degrees (prevents overhead bird-eye)
    this.controls.minDistance = 10;
    this.controls.maxDistance = 65;
    this.controls.enablePan = false;
    this.controls.target.set(0, 1.8, 0);
    this.controls.update();
  }

  update() {
    if (this.controls) {
      this.controls.update();
    }
  }

  dispose() {
    if (this.controls) {
      this.controls.dispose();
    }
  }
}

export default ControlsManager;
