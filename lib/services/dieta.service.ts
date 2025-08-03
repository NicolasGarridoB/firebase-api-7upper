import { db } from "../firebase";
import { Dieta } from "../models/dieta.model";

export async function crearDieta(data: Dieta) {
  const dietaRef = await db.collection("dietas").add(data);
  return { id: dietaRef.id, ...data };
}

export async function obtenerDietaPorUsuario(usuarioId: string) {
  const snap = await db.collection("dietas").where("usuarioId", "==", usuarioId).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as Dieta & { id: string };
}
