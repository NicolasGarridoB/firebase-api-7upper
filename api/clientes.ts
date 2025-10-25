import { VercelRequest, VercelResponse } from '@vercel/node';
import { 
  crearCliente, 
  obtenerClientesPorProveedor, 
  obtenerCliente, 
  actualizarCliente, 
  eliminarCliente 
} from '../lib/services/cliente.service';

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
    // Obtener clientes por proveedor o un cliente específico
    const { proveedorId, id } = req.query;
    
    try {
      if (id) {
        const cliente = await obtenerCliente(id as string);
        if (!cliente) {
          res.status(404).json({ error: "Cliente no encontrado" });
          return;
        }
        res.status(200).json(cliente);
      } else if (proveedorId) {
        const clientes = await obtenerClientesPorProveedor(proveedorId as string);
        res.status(200).json(clientes);
      } else {
        res.status(400).json({ error: "Falta el parámetro proveedorId o id" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'POST') {
    // Crear cliente
    const { proveedorId, nombre, correo, telefono, direccion, totalPedidos, ultimoPedido } = req.body;
    
    if (!proveedorId || !nombre || !correo) {
      res.status(400).json({ error: "Faltan campos obligatorios: proveedorId, nombre, correo" });
      return;
    }
    
    try {
      const cliente = await crearCliente({
        proveedorId,
        nombre,
        correo,
        telefono: telefono || "",
        direccion: direccion || "",
        fechaRegistro: new Date().toISOString(),
        totalPedidos: totalPedidos || 0,
        ultimoPedido: ultimoPedido || ""
      });
      res.status(201).json(cliente);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'PUT') {
    // Actualizar cliente
    const { id } = req.query;
    
    if (!id) {
      res.status(400).json({ error: "Falta el parámetro id" });
      return;
    }
    
    try {
      const resultado = await actualizarCliente(id as string, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'DELETE') {
    // Eliminar cliente
    const { id } = req.query;
    
    if (!id) {
      res.status(400).json({ error: "Falta el parámetro id" });
      return;
    }
    
    try {
      const resultado = await eliminarCliente(id as string);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
