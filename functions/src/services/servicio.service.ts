import * as admin from "firebase-admin";
import { Servicio } from "../models/servicio.model";
const db = admin.firestore();

export async function crearServicio(data: Servicio) {
  const ref = await db.collection("servicios").add(data);
  return { id: ref.id, ...data };
}

export async function obtenerServiciosPorProveedor(proveedorId: string) {
  const snapshot = await db.collection("servicios")
    .where("proveedorId", "==", proveedorId)
    .get();
  
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  })) as Servicio[];
}

export async function obtenerServicio(id: string) {
  const doc = await db.collection("servicios").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Servicio;
}

export async function actualizarServicio(id: string, data: Partial<Servicio>) {
  await db.collection("servicios").doc(id).update(data);
  return { id, ...data };
}

export async function eliminarServicio(id: string) {
  await db.collection("servicios").doc(id).delete();
  return { id, mensaje: "Servicio eliminado correctamente" };
}

export async function obtenerServiciosDisponibles(proveedorId: string) {
  const snapshot = await db.collection("servicios")
    .where("proveedorId", "==", proveedorId)
    .where("disponible", "==", true)
    .get();
  
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  })) as Servicio[];
}
