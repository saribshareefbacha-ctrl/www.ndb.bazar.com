// Master Owner Whitelist & system configuration constants
export const MASTER_OWNERS = [
  'saribshareefbacha@gmail.com',
  'swiftstackdigi01@gmail.com',
  'saribjutt503@gmail.com'
];

export const ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  SHOPKEEPER: 'shopkeeper',
  STAFF: 'staff',
  MAINTENANCE: 'maintenance',
  CUSTOMER: 'customer'
};

export const NDB_STALLS = [
  { id: 'stall-1', name: 'Quantum Tech Pavilion', signTitle: 'QUANTUM TECH', category: 'Electronics', merchant: 'Al-Khawarizmi Systems', rating: 4.95, status: 'online', color: 0x00e5ff, accent: '#00e5ff', traffic: '24.1K', coords: { x: -25, z: -11 }, rotY: Math.PI * 0.15, description: 'Next-generation computing hardware, quantum microprocessors, holographic monitors, and neural interface terminals.', items: [{ name: 'Quantum Core Q-8', price: '1.25 ETH', tag: 'Hot' }, { name: 'HoloLens Retinal Pro', price: '0.80 ETH', tag: 'New' }, { name: 'Neural Link Terminal', price: '0.45 ETH', tag: 'Limited' }] },
  { id: 'stall-2', name: 'Cyber Silk & Wearables', signTitle: 'NOOR APPAREL', category: 'Fashion', merchant: 'Noor Smart Apparel', rating: 4.88, status: 'online', color: 0xec4899, accent: '#ec4899', traffic: '19.4K', coords: { x: -13, z: -25 }, rotY: Math.PI * 0.35, description: 'Adaptive smart-textile garments woven with programmable photonic filaments and micro-thermal climate regulators.', items: [{ name: 'Photonic Silk Kurta', price: '0.30 ETH', tag: 'Featured' }, { name: 'Chroma Light Cloak', price: '0.50 ETH', tag: 'Trending' }, { name: 'Haptic Smart Gloves', price: '0.15 ETH', tag: 'Sale' }] },
  { id: 'stall-3', name: 'Nankana Organic Flora', signTitle: 'NANKANA FLORA', category: 'Organic', merchant: 'Punjab AgriBio Cooperative', rating: 4.94, status: 'online', color: 0x10b981, accent: '#10b981', traffic: '16.8K', coords: { x: 13, z: -25 }, rotY: -Math.PI * 0.35, description: 'Authentic organic Kashmiri saffron, pure bio-honey, and hydroponic medicinal herbal extracts grown in solar biomes.', items: [{ name: 'Pure Solar Saffron (10g)', price: '0.18 ETH', tag: 'Certified' }, { name: 'Bio-Flora Honey Essence', price: '0.08 ETH', tag: 'Organic' }, { name: 'Herbal Elixir Concentrate', price: '0.12 ETH', tag: 'Pure' }] },
  { id: 'stall-4', name: 'Heritage Craft Guild', signTitle: 'WAZIRABAD CRAFT', category: 'Handicrafts', merchant: 'Wazirabad Bladesmiths', rating: 4.98, status: 'online', color: 0xf59e0b, accent: '#f59e0b', traffic: '22.0K', coords: { x: 25, z: -11 }, rotY: -Math.PI * 0.15, description: 'Hand-forged Damascus steel folding blades, brass filigree candle lamps, and NFC-authenticated ceramic pottery.', items: [{ name: 'Damascus Laser Carver', price: '0.65 ETH', tag: 'Masterwork' }, { name: 'Filigree Brass Chandelier', price: '0.35 ETH', tag: 'Artisan' }, { name: 'NFC Glazed Terracotta Urn', price: '0.20 ETH', tag: 'Historic' }] },
  { id: 'stall-5', name: 'Neural Cloud & AI Kiosk', signTitle: 'INDUS CLOUD AI', category: 'Cyber AI', merchant: 'Indus Data Foundry', rating: 4.86, status: 'online', color: 0x8b5cf6, accent: '#8b5cf6', traffic: '31.2K', coords: { x: 25, z: 12 }, rotY: -Math.PI * 0.85, description: 'Specialized LLM inference nodes, decentralized smart-contract security suites, and cold cryptostorage solutions.', items: [{ name: 'Dedicated Agent Pod', price: '1.80 ETH/mo', tag: 'Enterprise' }, { name: 'Zero-Knowledge Vault', price: '0.40 ETH', tag: 'High-Sec' }, { name: 'Audit Protocol v4', price: '0.90 ETH', tag: 'Verified' }] },
  { id: 'stall-6', name: 'Karak Chai & Robo-Dhabba', signTitle: 'KARAK CHAI CAFE', category: 'Cyber AI', merchant: 'Nankana Street Labs', rating: 4.97, status: 'online', color: 0xf97316, accent: '#f97316', traffic: '42.6K', coords: { x: 13, z: 25 }, rotY: -Math.PI * 0.65, description: 'Robotic precision-steeped Karak tea, cardamom nitro beverages, and molecular street refreshments.', items: [{ name: 'Cardamom Nitro Chai', price: '0.01 ETH', tag: 'Best Seller' }, { name: 'Molecular Street Samosa', price: '0.03 ETH', tag: 'Crispy' }, { name: 'Saffron Lassi Brew', price: '0.02 ETH', tag: 'Chilled' }] },
  { id: 'stall-7', name: 'Holowear Visual Studio', signTitle: 'MIRAGE OPTICS', category: 'Electronics', merchant: 'Mirage Optics Ltd.', rating: 4.79, status: 'offline', color: 0x3b82f6, accent: '#3b82f6', traffic: '11.4K', coords: { x: -13, z: 25 }, rotY: Math.PI * 0.65, description: 'Micro-projector contact lenses, volumetric display kiosks, and retinal glare-shield eyewear.', items: [{ name: 'Retinal AR Contact Lens', price: '0.95 ETH', tag: 'Wireless' }, { name: 'Holo-Cube Desk Projector', price: '0.48 ETH', tag: '4K Volumetric' }, { name: 'Glare Shield Visor', price: '0.14 ETH', tag: 'Durable' }] },
  { id: 'stall-8', name: 'Aero Logistics Drone Port', signTitle: 'RAVI EXPRESS', category: 'Cyber AI', merchant: 'Ravi Express Skyways', rating: 4.91, status: 'online', color: 0x14b8a6, accent: '#14b8a6', traffic: '28.7K', coords: { x: -25, z: 12 }, rotY: -Math.PI * 0.85, description: 'Point-to-point automated courier dispatch and cargo transit servicing all bazaar sectors in under 8 minutes.', items: [{ name: 'Express Skyway Dispatch', price: '0.04 ETH', tag: 'Rapid' }, { name: 'Cargo Drone Rental', price: '0.45 ETH/day', tag: 'Payload' }, { name: 'Air-Beacon Transponder', price: '0.18 ETH', tag: 'IoT' }] }
];

export default { MASTER_OWNERS, ROLES, NDB_STALLS };
