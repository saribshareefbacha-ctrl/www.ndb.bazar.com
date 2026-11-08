// Universal login/signup logic & Google auth flow with fallback
import { auth } from '../config/firebase.config.js';

class AuthService {
  constructor() {
    this.userEmail = null;
    this.currentUser = null;
  }

  async handleGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);
    } catch (e) {
      console.error("Popup failed, trying redirect...", e);
      await auth.signInWithRedirect(provider);
    }
  }

  async handleStandardLogin(email, pass) {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, pass);
      return userCredential.user;
    } catch (e) {
      console.error("Login Error:", e);
      throw e;
    }
  }

  async handleStandardSignup(email, pass) {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, pass);
      return userCredential.user;
    } catch (e) {
      console.error("Signup Error:", e);
      throw e;
    }
  }

  signOut() {
    return auth.signOut();
  }

  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(user => {
      this.currentUser = user;
      this.userEmail = user ? user.email : null;
      callback(user);
    });
  }
}

export const authService = new AuthService();
export default AuthService;
