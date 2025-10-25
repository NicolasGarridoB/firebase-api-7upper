export interface Servicio {
  id?: string;
  proveedorId: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  disponible: boolean;
  imagenUrl?: string;
  duracionEstimada?: string; // ej: "30 minutos", "2 horas"
  fechaCreacion: string;
}
