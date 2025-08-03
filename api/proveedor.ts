import { VercelRequest, VercelResponse } from '@vercel/node';
import { crearProveedor, obtenerProveedor } from '../lib/services/proveedor.service';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Crear proveedor
    const { nombre, fotoPerfil, puntuacion, totalClientes, serviciosActivos } = req.body;
    if (!nombre) {
      res.status(400).json({ error: "Falta el nombre del proveedor" });
      return;
    }
    
    try {
      const proveedor = await crearProveedor({
        nombre,
        fotoPerfil: fotoPerfil || "",
        puntuacion: puntuacion || 0,
        totalClientes: totalClientes || 0,
        serviciosActivos: serviciosActivos || 0,
      });
      res.status(201).json(proveedor);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'GET') {
    // Obtener perfil proveedor
    const proveedorId = req.query.id as string;
    if (!proveedorId) {
      res.status(400).json({ error: "Falta el id del proveedor" });
      return;
    }
    
    try {
      const proveedor = await obtenerProveedor(proveedorId);
      if (!proveedor) {
        res.status(404).json({ error: "Proveedor no encontrado" });
        return;
      }
      res.status(200).json(proveedor);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
