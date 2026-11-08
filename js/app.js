// Main entry point bootstrapping 3D scene & auth listeners
import { SceneManager } from '../3d/scene.js';
import { ControlsManager } from '../3d/controls.js';
import { StallsManager } from '../3d/stalls.js';
import { authService } from '../auth/auth.service.js';
import { rbacGuard } from '../auth/rbac.guard.js';
import { modalManager } from '../ui/modal.js';
import { dashboardManager } from '../ui/dashboard.js';

class App {
  constructor() {
    this.sceneManager = null;
    this.controlsManager = null;
    this.stallsManager = null;
    this.clock = new THREE.Clock();
    this.animationId = null;
    this.isInitialized = false;
  }

  async init() {
    console.log("Initializing Nankana Digital Bazaar 3D Marketplace...");
    
    // 1. Setup 3D Environment
    this.sceneManager = new SceneManager();
    this.controlsManager = new ControlsManager(this.sceneManager.camera, this.sceneManager.renderer, this.sceneManager.scene);
    this.stallsManager = new StallsManager(this.sceneManager.scene);

    // 2. Setup Auth Listeners
    authService.onAuthStateChanged((user) => {
      this.handleAuthState(user);
    });

    // 3. Start Render Loop
    this.animate();

    // 4. Bind UI Actions
    this.bindUI();

    this.isInitialized = true;
    console.log("App Bootstrapped Successfully.");
  }

  handleAuthState(user) {
    if (user) {
      modalManager.close();
      const email = user.email;
      const uid = user.uid;
      
      // Resolve Role and Apply RBAC
      rbacGuard.resolveRole(email, uid).then(role => {
        rbacGuard.applyRBAC(role, this);
        dashboardManager.updateStatus(email, role);
      });
    } else {
      modalManager.open();
      dashboardManager.updateStatus('Guest', 'customer');
      rbacGuard.applyRBAC('customer', this);
    }
  }

  bindUI() {
    // Navbar Get Started Button
    const getStartedBtn = document.getElementById('navbar-get-started');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', () => modalManager.open());
    }

    // Window Resize
    window.addEventListener('resize', () => {
      this.sceneManager?.onResize();
    });
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());
    const delta = this.clock.getDelta();
    
    if (this.controlsManager) this.controlsManager.update();
    if (this.stallsManager) this.stallsManager.update(delta);
    if (this.sceneManager) this.sceneManager.render();
  }

  render2DCatalogGrid() {
    // Triggered by rbacGuard
    console.log("Rendering 2D Catalog Grid based on RBAC...");
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    this.controlsManager?.dispose();
    this.stallsManager?.dispose();
    if (this.sceneManager?.renderer) this.sceneManager.renderer.dispose();
  }
}

// Global Instance
window.ndbApp = new App();
window.ndbApp.init().catch(err => console.error("App Init Error:", err));

export default window.ndbApp;
