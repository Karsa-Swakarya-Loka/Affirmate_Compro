// Stable identities for seeded media: source path under design/assets → alt text in both languages.
// The path is the media seedKey, so re-running the seed never uploads a file twice.
export const mediaAlt: Record<string, { en: string; id: string }> = {
  'design/assets/Logos/affirmate-administrative.webp': { en: 'Affirmate Administrative logo.', id: 'Logo Affirmate Administrative.' },
  'design/assets/Logos/affirmate-administrative-white.png': { en: 'Affirmate Administrative logo, white.', id: 'Logo Affirmate Administrative versi putih.' },
  'design/assets/Logos/affirmate-business-advisory.png': { en: 'Affirmate Business Advisory logo.', id: 'Logo Affirmate Business Advisory.' },
  'design/assets/Logos/affirmate-property.png': { en: 'Affirmate Property logo.', id: 'Logo Affirmate Property.' },
  'design/assets/Logos/ritz-affirmate.webp': { en: 'Ritz Affirmate Internasional logo.', id: 'Logo Ritz Affirmate Internasional.' },
  'design/assets/Logos/affirmate-group-white.webp': { en: 'Affirmate Group logo, white.', id: 'Logo Affirmate Group versi putih.' },
  'design/assets/Photography/hero-lobby-signage.jpg': { en: 'Affirmate office lobby at Ciputra World 2, Jakarta.', id: 'Lobi kantor Affirmate di Ciputra World 2, Jakarta.' },
  'design/assets/Photography/office-executive-room.jpg': { en: 'Executive room with a view over Jakarta at the Affirmate office.', id: 'Ruang eksekutif dengan pemandangan Jakarta di kantor Affirmate.' },
  'design/assets/Photography/office-glass-meeting-rooms.jpg': { en: 'Glass meeting rooms at the Affirmate office.', id: 'Ruang meeting kaca di kantor Affirmate.' },
  'design/assets/Photography/office-corridor-portrait.jpg': { en: 'Corridor of the Affirmate office with glass-walled rooms.', id: 'Koridor kantor Affirmate dengan ruang berdinding kaca.' },
  'design/assets/Photography/office-reception.jpg': { en: 'Reception desk at the Affirmate office.', id: 'Meja resepsionis kantor Affirmate.' },
  'design/assets/Photography/office-lounge-window.jpg': { en: 'Lounge with city view at the Affirmate office.', id: 'Lounge dengan pemandangan kota di kantor Affirmate.' },
  'design/assets/Photography/office-pantry-bar.jpg': { en: 'Pantry bar at the Affirmate office.', id: 'Pantry bar di kantor Affirmate.' },
  'design/assets/Photography/office-lounge-artwall.jpg': { en: 'Lounge with artwork wall at the Affirmate office.', id: 'Lounge dengan dinding karya seni di kantor Affirmate.' },
  'design/assets/Photography/office-meeting-room-portrait.jpg': { en: 'Meeting room at the Affirmate office.', id: 'Ruang meeting di kantor Affirmate.' },
  'design/assets/Photography/office-glass-corridor.jpg': { en: 'Glass corridor at the Affirmate office.', id: 'Koridor kaca di kantor Affirmate.' },
  'design/assets/People/yukifri-nazir.jpg': { en: 'Yukifri Nazir, Group CEO of Affirmate Group.', id: 'Yukifri Nazir, CEO Affirmate Group.' },
  'design/assets/People/deny-y-imran.jpg': { en: 'Deny Y. Imran, CEO of PT Affirmate Tatakelola Nusantara.', id: 'Deny Y. Imran, CEO PT Affirmate Tatakelola Nusantara.' },
  'design/assets/People/mulyadi.jpg': { en: 'Mulyadi, Finance Director.', id: 'Mulyadi, Direktur Keuangan.' },
  'design/assets/Clients/unicharm.png': { en: 'unicharm logo.', id: 'Logo unicharm.' },
  'design/assets/Clients/mufg-finance-leasing.png': { en: 'MUFG Finance and Leasing logo.', id: 'Logo MUFG Finance and Leasing.' },
  'design/assets/Clients/toda-corporation.png': { en: 'Toda Corporation logo.', id: 'Logo Toda Corporation.' },
  'design/assets/Clients/msig-life.png': { en: 'MSIG Life logo.', id: 'Logo MSIG Life.' },
  'design/assets/Clients/msig-insurance.png': { en: 'MSIG Insurance logo.', id: 'Logo MSIG Insurance.' },
}
/** Slugs the seed removes before upserting, so a renamed service never leaves its old document behind (23 Oct 2026: Management Advisory → Expatriate Advisory). */
export const retiredServices = ['management-advisory'] as const
export const seedFiles = ['site', 'home', 'legal', 'services', 'group-entities', 'milestones', 'clients', 'cities', 'posts', 'ui-dictionary'] as const
