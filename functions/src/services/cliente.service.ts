import * as admin from "firebase-admin";
import { Cliente } from "../models/cliente.model";
const db = admin.firestore();

export async function crearCliente(data: Cliente) {
  const ref = await db.collection("clientes").add(data);
  return { id: ref.id, ...data };
}

export async function obtenerClientesPorProveedor(proveedorId: string) {
  const snapshot = await db.collection("clientes")
    .where("proveedorId", "==", proveedorId)
    .get();
  
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  })) as Cliente[];
}

export async function obtenerCliente(id: string) {
  const doc = await db.collection("clientes").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Cliente;
}

export async function actualizarCliente(id: string, data: Partial<Cliente>) {
  await db.collection("clientes").doc(id).update(data);
  return { id, ...data };
}

export async function eliminarCliente(id: string) {
  await db.collection("clientes").doc(id).delete();
  return { id, mensaje: "Cliente eliminado correctamente" };
}
