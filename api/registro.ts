import { VercelRequest, VercelResponse } from '@vercel/node';
import { crearUsuario, buscarUsuarioPorCorreo as buscarUsuarioPorCorreoService } from '../lib/services/usuario.service';

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
    const { nombre, correo, contraseña, fechaNacimiento } = req.body;
    
    if (!nombre || !correo || !contraseña || !fechaNacimiento) {
      res.status(400).json({ error: "Faltan campos obligatorios" });
      return;
    }
    
    try {
      // Verifica si ya existe el correo
      const existente = await buscarUsuarioPorCorreoService(correo);
      if (existente) {
        res.status(400).json({ error: "El correo ya está registrado" });
        return;
      }
      
      const usuario = await crearUsuario({ nombre, correo, contraseña, fechaNacimiento });
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
