export interface Cliente {
  id?: string;
  proveedorId: string;
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro: string;
  totalPedidos: number;
  ultimoPedido?: string;
}
