import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({
      message: '7Upper API Proveedores está funcionando correctamente',
      timestamp: new Date().toISOString(),
      endpoints: {
        'GET /api/clientes?proveedorId={id}': 'Obtener clientes del proveedor',
        'POST /api/clientes': 'Crear nuevo cliente',
        'PUT /api/clientes?id={id}': 'Actualizar cliente',
        'DELETE /api/clientes?id={id}': 'Eliminar cliente',
        'GET /api/pedidos?proveedorId={id}': 'Obtener pedidos del proveedor',
        'POST /api/pedidos': 'Crear nuevo pedido',
        'PUT /api/pedidos?id={id}': 'Actualizar pedido',
        'DELETE /api/pedidos?id={id}': 'Eliminar pedido',
        'GET /api/servicios?proveedorId={id}': 'Obtener servicios del proveedor',
        'POST /api/servicios': 'Crear nuevo servicio',
        'PUT /api/servicios?id={id}': 'Actualizar servicio',
        'DELETE /api/servicios?id={id}': 'Eliminar servicio',
        'GET /api/pendientes?proveedorId={id}': 'Obtener pedidos pendientes del proveedor',
        'GET /api/proveedor?id={id}': 'Obtener proveedor por ID',
        'POST /api/proveedor': 'Crear proveedor'
      }
    });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
