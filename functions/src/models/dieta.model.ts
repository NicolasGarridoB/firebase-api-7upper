export interface Dieta {
  usuarioId: string;
  tipo: string; // Ej: "Vegan", "Keto", etc.
  alergias: string[]; // Ej: ["Soya", "Mani"]
  noDeseados: string[]; // Ej: ["Champiñones", "Espinaca"]
  preferidos: string[]; // Ej: ["Ensalada César", "Tacos"]
}