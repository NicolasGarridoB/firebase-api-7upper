import { db } from "../firebase";
import { Pedido } from "../models/pedido.model";

export async function crearPedido(data: Pedido) {
  const ref = await db.collection("pedidos").add(data);
  return { id: ref.id, ...data };
}

export async function obtenerPedidosPorProveedor(proveedorId: string) {
  const snapshot = await db.collection("pedidos")
    .where("proveedorId", "==", proveedorId)
    .get();
  
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  })) as Pedido[];
}

export async function obtenerPedidosPorCliente(clienteId: string) {
  const snapshot = await db.collection("pedidos")
    .where("clienteId", "==", clienteId)
    .get();
  
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  })) as Pedido[];
}

export async function obtenerPedido(id: string) {
  const doc = await db.collection("pedidos").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as Pedido;
}

export async function actualizarPedido(id: string, data: Partial<Pedido>) {
  await db.collection("pedidos").doc(id).update(data);
  return { id, ...data };
}

export async function eliminarPedido(id: string) {
  await db.collection("pedidos").doc(id).delete();
  return { id, mensaje: "Pedido eliminado correctamente" };
}

export async function obtenerPedidosPendientesPorProveedor(proveedorId: string) {
  const snapshot = await db.collection("pedidos")
    .where("proveedorId", "==", proveedorId)
    .where("estado", "in", ["pendiente", "en-proceso"])
    .get();
  
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data()
  })) as Pedido[];
}
