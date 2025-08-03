import { onRequest } from "firebase-functions/v2/https";
import { crearDieta, obtenerDietaPorUsuario } from "../services/dieta.service";

// Registrar dieta
export const registrarDieta = onRequest(async (req, res) => {
  const { usuarioId, tipo, alergias, noDeseados, preferidos } = req.body;
  if (!usuarioId || !tipo) {
    res.status(400).json({ error: "Faltan campos obligatorios: usuarioId y tipo" });
    return;
  }
  const dieta = await crearDieta({
    usuarioId,
    tipo,
    alergias: alergias || [],
    noDeseados: noDeseados || [],
    preferidos: preferidos || [],
  });
  res.json(dieta);
});

// Obtener dieta de un usuario
export const obtenerDieta = onRequest(async (req, res) => {
  const usuarioId = req.query.usuarioId as string;
  if (!usuarioId) {
    res.status(400).json({ error: "Falta el parámetro usuarioId" });
    return;
  }
  const dieta = await obtenerDietaPorUsuario(usuarioId);
  if (!dieta) {
    res.status(404).json({ error: "Dieta no encontrada" });
    return;
  }
  res.json(dieta);
});