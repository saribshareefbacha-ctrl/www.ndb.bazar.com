// Dynamic 3D shop pavilion generation & online/offline states
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { NDB_STALLS } from '../config/constants.js';

export class StallsManager {
  constructor(scene) {
    this.scene = scene;
    this.stallMeshes = [];
    this.stallGroup = new THREE.Group();
    this.scene.add(this.stallGroup);
    this.init();
  }

  init() {
    NDB_STALLS.forEach(stall => {
      this.createStall(stall);
    });
  }

  createStall(stall) {
    // Base Pavilion Geometry
    const group = new THREE.Group();
    group.position.set(stall.coords.x, 0, stall.coords.z);
    group.rotation.y = stall.rotY;

    // Glass/Obsidian Base
    const baseGeo = new THREE.BoxGeometry(6, 0.8, 6);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.1, transparent: true, opacity: 0.9 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    group.add(base);

    // Glass Walls (Glassmorphism effect)
    const wallGeo = new THREE.BoxGeometry(5.8, 4.5, 5.8);
    const wallMat = new THREE.MeshPhysicalMaterial({
      color: stall.color,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.85,
      thickness: 0.15,
      transparent: true,
      opacity: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = 2.25;
    group.add(walls);

    // Signboard (Neon/Glow)
    const signGeo = new THREE.BoxGeometry(5, 0.5, 0.5);
    const signMat = new THREE.MeshStandardMaterial({ color: stall.accent, emissive: stall.accent, emissiveIntensity: 1.5 });
    const sign = new THREE.Mesh(signGeo, signMat);
    sign.position.y = 5.1;
    sign.position.z = -2.8;
    group.add(sign);

    // Status Indicator (Online/Offline)
    const indicatorGeo = new THREE.SphereGeometry(0.15, 16, 16);
    const indicatorMat = new THREE.MeshBasicMaterial({ color: stall.status === 'online' ? 0x10b981 : 0xef4444 });
    const indicator = new THREE.Mesh(indicatorGeo, indicatorMat);
    indicator.position.set(0, 5.1, -2.5);
    group.add(indicator);

    // Add to scene
    this.stallGroup.add(group);
    this.stallMeshes.push({ id: stall.id, mesh: group, stallData: stall });
  }

  update(delta) {
    // Floating animations for online stalls
    this.stallMeshes.forEach(item => {
      if (item.stallData.status === 'online') {
        item.mesh.position.y = Math.sin(Date.now() * 0.0015 + item.stallData.coords.x) * 0.1;
      }
    });
  }

  dispose() {
    this.scene.remove(this.stallGroup);
    this.stallMeshes.forEach(item => {
      item.mesh.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
          else child.material.dispose();
        }
      });
    });
  }
}

export default StallsManager;
