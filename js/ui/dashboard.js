// Dynamic role-based control panel rendering (Owner/Admin/Staff)
import { ROLES } from '../config/constants.js';

export class DashboardManager {
  constructor() {
    this.panel = document.getElementById('owner-panel');
    this.statusEl = document.getElementById('auth-status');
    this.catalogGrid = document.getElementById('2d-catalog-grid');
    this.init();
  }

  init() {
    // Owner Global Toggle
    const masterToggle = document.getElementById('owner-master-toggle');
    if (masterToggle) {
      masterToggle.addEventListener('change', (e) => {
        const state = e.target.checked;
        console.log("Global Shop Master Toggle:", state);
        // Logic to broadcast state to stalls
      });
    }

    // Role Management UI
    const roleSelect = document.getElementById('role-select-input');
    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        console.log("Role Management Change:", e.target.value);
      });
    }
  }

  render2DCatalogGrid(role = ROLES.CUSTOMER) {
    if (!this.catalogGrid) return;

    // Clear existing
    this.catalogGrid.innerHTML = '';

    // Render based on role
    if (role === ROLES.OWNER || role === ROLES.ADMIN) {
      this.catalogGrid.innerHTML = `<div class="text-center p-8 text-cyan-400 font-bold">Owner/Admin Master Catalog Controls Active</div>`;
    } else if (role === ROLES.SHOPKEEPER || role === ROLES.STAFF) {
      this.catalogGrid.innerHTML = `<div class="text-center p-8 text-emerald-400 font-bold">Shopkeeper/Staff Inventory View Active</div>`;
    } else {
      this.catalogGrid.innerHTML = `<div class="text-center p-8 text-slate-400 font-bold">Customer Catalog View Active</div>`;
    }
  }

  updateStatus(email, role) {
    if (this.statusEl) {
      this.statusEl.textContent = `Authenticated: ${email} (${role})`;
      this.statusEl.style.color = role === ROLES.OWNER ? '#00e5ff' : '#64748b';
    }
  }
}

export const dashboardManager = new DashboardManager();
export default DashboardManager;
