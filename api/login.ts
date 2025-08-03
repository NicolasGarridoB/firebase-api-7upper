import { VercelRequest, VercelResponse } from '@vercel/node';
import { buscarUsuarioPorCorreo as buscarUsuarioPorCorreoService } from '../lib/services/usuario.service';

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
    const { correo, contraseña } = req.body;
    
    if (!correo || !contraseña) {
      res.status(400).json({ error: "Faltan campos obligatorios" });
      return;
    }
    
    try {
      const usuario = await buscarUsuarioPorCorreoService(correo);
      if (!usuario || usuario.contraseña !== contraseña) {
        res.status(401).json({ error: "Credenciales incorrectas" });
        return;
      }
      
      res.status(200).json({ 
        mensaje: "Inicio de sesión exitoso", 
        usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo } 
      });
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
