import { db } from "../firebase";
import { Usuario } from "../models/usuario.model";

export async function crearUsuario(data: Usuario) {
  const usuarioRef = await db.collection("usuarios").add(data);
  return { id: usuarioRef.id, ...data };
}

export async function buscarUsuarioPorCorreo(
  correo: string
): Promise<{ id: string; nombre: string; correo: string; contraseña: string } | null> {
  const snap = await db.collection("usuarios").where("correo", "==", correo).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as {
    id: string;
    nombre: string;
    correo: string;
    contraseña: string;
  };
}
