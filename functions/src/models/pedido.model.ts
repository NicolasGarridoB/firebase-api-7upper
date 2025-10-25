export interface Pedido {
  id?: string;
  proveedorId: string;
  clienteId: string;
  clienteNombre?: string;
  servicioId: string;
  servicioNombre?: string;
  fecha: string;
  estado: 'pendiente' | 'en-proceso' | 'completado' | 'cancelado';
  total: number;
  descripcion?: string;
  direccionEntrega?: string;
}
