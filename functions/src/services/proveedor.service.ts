import * as admin from "firebase-admin";
import { Proveedor } from "../models/proveedor.model";
const db = admin.firestore();

export async function crearProveedor(data: Proveedor) {
  const ref = await db.collection("proveedores").add(data);
  return { id: ref.id, ...data };
}

export async function obtenerProveedor(id: string) {
  const doc = await db.collection("proveedores").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Proveedor;
}