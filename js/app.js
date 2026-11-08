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

    // 4. Bind UI Actions (FIXED: Correct ID and Category Filters)
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
    // Navbar Get Started Button (Clean Navbar Action)
    const getStartedBtn = document.getElementById('btn-open-auth');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Get Started clicked - Opening Modal");
        modalManager.open();
      });
    }

    // Category Filters Interactivity
    const categoryPills = document.querySelectorAll('.cat-pill');
    categoryPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        // Remove active class from all
        categoryPills.forEach(p => p.classList.remove('active', 'bg-cyan-500', 'text-black', 'shadow-md', 'shadow-cyan-500/25'));
        // Add active class to clicked
        e.target.classList.add('active', 'bg-cyan-500', 'text-black', 'shadow-md', 'shadow-cyan-500/25');
        const category = e.target.getAttribute('data-cat');
        console.log("Filtering Stalls by Category:", category);
        // Logic to filter stalls in 3D scene or 2D grid
        if (this.stallsManager) {
          this.stallsManager.filterCategory(category);
        }
      });
    });

    // Window Resize
    window.addEventListener('resize', () => {
      this.sceneManager?.onResize();
    });
    
    // Ensure modal buttons are bound (in case modalManager.init doesn't catch them early enough)
    const btnGoogle = document.getElementById('btn-login-google');
    if (btnGoogle) btnGoogle.addEventListener('click', () => { console.log("Google Login Triggered"); authService.handleGoogleLogin(); });
    
    const btnSignIn = document.getElementById('btn-login-standard');
    if (btnSignIn) btnSignIn.addEventListener('click', () => {
      const email = document.getElementById('auth-email').value;
      const pass = document.getElementById('auth-password').value;
      authService.handleStandardLogin(email, pass);
    });

    const btnSignUp = document.getElementById('btn-signup-standard');
    if (btnSignUp) btnSignUp.addEventListener('click', () => {
      const email = document.getElementById('signup-email').value;
      const pass = document.getElementById('signup-password').value;
      authService.handleStandardSignup(email, pass);
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

// Global Instance & DOMContentLoaded Wrapper
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.ndbApp = new App();
    window.ndbApp.init().catch(err => console.error("App Init Error:", err));
  } catch (error) {
    console.error("Critical App Initialization Error:", error);
  }
});

export default window.ndbApp;
