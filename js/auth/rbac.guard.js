// Whitelist enforcement & dynamic role-based access boundaries
import { MASTER_OWNERS, ROLES } from '../config/constants.js';
import { db } from '../config/firebase.config.js';

class RbacGuard {
  constructor() {
    this.currentRole = ROLES.CUSTOMER;
    this.ownerPanel = document.getElementById('owner-panel');
  }

  async resolveRole(email, uid) {
    // 1. Master Owner Whitelist Check
    if (MASTER_OWNERS.includes(email)) {
      return ROLES.OWNER;
    }

    // 2. Dynamic Role Sync from Firestore
    try {
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data();
        return data?.role || ROLES.CUSTOMER;
      }
    } catch (err) {
      console.error("Firestore role sync error:", err);
    }

    return ROLES.CUSTOMER;
  }

  applyRBAC(role, appInstance) {
    this.currentRole = role;
    
    // Owner Panel Logic
    if (role === ROLES.OWNER) {
      this.ownerPanel?.classList.add('active');
    } else {
      this.ownerPanel?.classList.remove('active');
    }

    // Dynamic UI Boundaries (Admin, Shopkeeper, Staff, Maintenance, Customer)
    // The appInstance.render2DCatalogGrid() and other UI updates are handled here
    if (appInstance) {
      appInstance.render2DCatalogGrid();
      
      // Specific role restrictions (e.g., hide Owner controls for others)
      const ownerControls = document.querySelector('#owner-panel');
      if (role !== ROLES.OWNER && ownerControls) {
        ownerControls.style.display = 'none';
      }
    }

    // Update Auth Status UI
    const statusEl = document.getElementById('auth-status');
    if (statusEl) {
      statusEl.textContent = `Authenticated: ${email || 'Guest'} (${role})`;
    }

    return role;
  }

  getRole() {
    return this.currentRole;
  }
}

export const rbacGuard = new RbacGuard();
export default RbacGuard;
