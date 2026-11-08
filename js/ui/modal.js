// Glassmorphism auth modal toggling & tab switching
export class ModalManager {
  constructor() {
    this.modal = document.getElementById('auth-modal');
    this.card = document.getElementById('auth-card');
    this.loginTab = document.getElementById('tab-login');
    this.signupTab = document.getElementById('tab-signup');
    this.loginView = document.getElementById('view-login');
    this.signupView = document.getElementById('view-signup');
    this.googleBtn = document.getElementById('btn-google');
    this.signInBtn = document.getElementById('btn-sign-in');
    this.signUpBtn = document.getElementById('btn-sign-up');
    
    this.init();
  }

  init() {
    // Tab Switching
    if (this.loginTab && this.signupTab) {
      this.loginTab.addEventListener('click', () => this.switchTab('login'));
      this.signupTab.addEventListener('click', () => this.switchTab('signup'));
    }

    // Open/Close Modal
    window.openAuthModal = () => this.open();
    window.closeAuthModal = () => this.close();

    // Button Clicks (Delegated to auth service in app.js)
    if (this.googleBtn) {
      this.googleBtn.addEventListener('click', () => {
        if (window.handleGoogleLogin) window.handleGoogleLogin();
      });
    }
    if (this.signInBtn) {
      this.signInBtn.addEventListener('click', () => {
        if (window.handleStandardLogin) window.handleStandardLogin();
      });
    }
    if (this.signUpBtn) {
      this.signUpBtn.addEventListener('click', () => {
        if (window.handleStandardSignup) window.handleStandardSignup();
      });
    }

    // Click outside to close
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }

  open() {
    if (this.modal) {
      this.modal.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    if (this.modal) {
      this.modal.classList.remove('modal-open');
      document.body.style.overflow = '';
    }
  }

  switchTab(tab) {
    if (tab === 'login') {
      this.loginTab?.classList.add('active');
      this.signupTab?.classList.remove('active');
      this.loginView?.classList.add('active');
      this.signupView?.classList.remove('active');
    } else {
      this.loginTab?.classList.remove('active');
      this.signupTab?.classList.add('active');
      this.loginView?.classList.remove('active');
      this.signupView?.classList.add('active');
    }
  }
}

export const modalManager = new ModalManager();
export default ModalManager;
