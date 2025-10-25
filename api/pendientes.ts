import { VercelRequest, VercelResponse } from '@vercel/node';
import { obtenerPedidosPendientesPorProveedor } from '../lib/services/pedido.service';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Obtener pedidos pendientes por proveedor
    const { proveedorId } = req.query;
    
    if (!proveedorId) {
      res.status(400).json({ error: "Falta el parámetro proveedorId" });
      return;
    }
    
    try {
      const pedidosPendientes = await obtenerPedidosPendientesPorProveedor(proveedorId as string);
      res.status(200).json(pedidosPendientes);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
