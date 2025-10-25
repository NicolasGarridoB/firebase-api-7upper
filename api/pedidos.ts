import { VercelRequest, VercelResponse } from '@vercel/node';
import { 
  crearPedido, 
  obtenerPedidosPorProveedor, 
  obtenerPedido, 
  actualizarPedido, 
  eliminarPedido 
} from '../lib/services/pedido.service';

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
    // Obtener pedidos por proveedor o un pedido específico
    const { proveedorId, id } = req.query;
    
    try {
      if (id) {
        const pedido = await obtenerPedido(id as string);
        if (!pedido) {
          res.status(404).json({ error: "Pedido no encontrado" });
          return;
        }
        res.status(200).json(pedido);
      } else if (proveedorId) {
        const pedidos = await obtenerPedidosPorProveedor(proveedorId as string);
        res.status(200).json(pedidos);
      } else {
        res.status(400).json({ error: "Falta el parámetro proveedorId o id" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'POST') {
    // Crear pedido
    const { 
      proveedorId, 
      clienteId, 
      clienteNombre, 
      servicioId, 
      servicioNombre, 
      estado, 
      total, 
      descripcion, 
      direccionEntrega 
    } = req.body;
    
    if (!proveedorId || !clienteId || !servicioId || !total) {
      res.status(400).json({ error: "Faltan campos obligatorios: proveedorId, clienteId, servicioId, total" });
      return;
    }
    
    try {
      const pedido = await crearPedido({
        proveedorId,
        clienteId,
        clienteNombre: clienteNombre || "",
        servicioId,
        servicioNombre: servicioNombre || "",
        fecha: new Date().toISOString(),
        estado: estado || 'pendiente',
        total,
        descripcion: descripcion || "",
        direccionEntrega: direccionEntrega || ""
      });
      res.status(201).json(pedido);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'PUT') {
    // Actualizar pedido
    const { id } = req.query;
    
    if (!id) {
      res.status(400).json({ error: "Falta el parámetro id" });
      return;
    }
    
    try {
      const resultado = await actualizarPedido(id as string, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'DELETE') {
    // Eliminar pedido
    const { id } = req.query;
    
    if (!id) {
      res.status(400).json({ error: "Falta el parámetro id" });
      return;
    }
    
    try {
      const resultado = await eliminarPedido(id as string);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
