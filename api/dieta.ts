import { VercelRequest, VercelResponse } from '@vercel/node';
import { crearDieta, obtenerDietaPorUsuario } from '../lib/services/dieta.service';

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
    // Registrar dieta
    const { usuarioId, tipo, alergias, noDeseados, preferidos } = req.body;
    if (!usuarioId || !tipo) {
      res.status(400).json({ error: "Faltan campos obligatorios: usuarioId y tipo" });
      return;
    }
    
    try {
      const dieta = await crearDieta({
        usuarioId,
        tipo,
        alergias: alergias || [],
        noDeseados: noDeseados || [],
        preferidos: preferidos || [],
      });
      res.status(201).json(dieta);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === 'GET') {
    // Obtener dieta de un usuario
    const usuarioId = req.query.usuarioId as string;
    if (!usuarioId) {
      res.status(400).json({ error: "Falta el parámetro usuarioId" });
      return;
    }
    
    try {
      const dieta = await obtenerDietaPorUsuario(usuarioId);
      if (!dieta) {
        res.status(404).json({ error: "Dieta no encontrada" });
        return;
      }
      res.status(200).json(dieta);
    } catch (error) {
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
