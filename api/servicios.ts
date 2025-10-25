import { VercelRequest, VercelResponse } from '@vercel/node';
import { 
  crearServicio, 
  obtenerServiciosPorProveedor, 
  obtenerServicio, 
  actualizarServicio, 
  eliminarServicio 
} from '../lib/services/servicio.service';

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
    // Obtener servicios por proveedor o un servicio específico
    const { proveedorId, id } = req.query;
    
    try {
      if (id) {
        const servicio = await obtenerServicio(id as string);
        if (!servicio) {
          res.status(404).json({ error: "Servicio no encontrado" });
          return;
        }
        res.status(200).json(servicio);
      } else if (proveedorId) {
        const servicios = await obtenerServiciosPorProveedor(proveedorId as string);
        res.status(200).json(servicios);
      } else {
        res.status(400).json({ error: "Falta el parámetro proveedorId o id" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'POST') {
    // Crear servicio
    const { 
      proveedorId, 
      nombre, 
      descripcion, 
      precio, 
      categoria, 
      disponible, 
      imagenUrl, 
      duracionEstimada 
    } = req.body;
    
    if (!proveedorId || !nombre || !descripcion || precio === undefined || !categoria) {
      res.status(400).json({ error: "Faltan campos obligatorios: proveedorId, nombre, descripcion, precio, categoria" });
      return;
    }
    
    try {
      const servicio = await crearServicio({
        proveedorId,
        nombre,
        descripcion,
        precio,
        categoria,
        disponible: disponible !== undefined ? disponible : true,
        imagenUrl: imagenUrl || "",
        duracionEstimada: duracionEstimada || "",
        fechaCreacion: new Date().toISOString()
      });
      res.status(201).json(servicio);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'PUT') {
    // Actualizar servicio
    const { id } = req.query;
    
    if (!id) {
      res.status(400).json({ error: "Falta el parámetro id" });
      return;
    }
    
    try {
      const resultado = await actualizarServicio(id as string, req.body);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'DELETE') {
    // Eliminar servicio
    const { id } = req.query;
    
    if (!id) {
      res.status(400).json({ error: "Falta el parámetro id" });
      return;
    }
    
    try {
      const resultado = await eliminarServicio(id as string);
      res.status(200).json(resultado);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
