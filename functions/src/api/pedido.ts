import { onRequest } from "firebase-functions/v2/https";
import { 
  crearPedido, 
  obtenerPedidosPorProveedor, 
  obtenerPedido, 
  actualizarPedido, 
  eliminarPedido,
  obtenerPedidosPendientesPorProveedor
} from "../services/pedido.service";

// Obtener pedidos
export const obtenerPedidos = onRequest(async (req, res) => {
  const { proveedorId, id } = req.query;
  
  try {
    if (id) {
      const pedido = await obtenerPedido(id as string);
      if (!pedido) {
        res.status(404).json({ error: "Pedido no encontrado" });
        return;
      }
      res.status(200).json(pedido);
    } else if (proveedorId) {
      const pedidos = await obtenerPedidosPorProveedor(proveedorId as string);
      res.status(200).json(pedidos);
    } else {
      res.status(400).json({ error: "Falta el parámetro proveedorId o id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear pedido
export const registrarPedido = onRequest(async (req, res) => {
  const { 
    proveedorId, 
    clienteId, 
    clienteNombre, 
    servicioId, 
    servicioNombre, 
    estado, 
    total, 
    descripcion, 
    direccionEntrega 
  } = req.body;
  
  if (!proveedorId || !clienteId || !servicioId || !total) {
    res.status(400).json({ error: "Faltan campos obligatorios: proveedorId, clienteId, servicioId, total" });
    return;
  }
  
  try {
    const pedido = await crearPedido({
      proveedorId,
      clienteId,
      clienteNombre: clienteNombre || "",
      servicioId,
      servicioNombre: servicioNombre || "",
      fecha: new Date().toISOString(),
      estado: estado || 'pendiente',
      total,
      descripcion: descripcion || "",
      direccionEntrega: direccionEntrega || ""
    });
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar pedido
export const modificarPedido = onRequest(async (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ error: "Falta el parámetro id" });
    return;
  }
  
  try {
    const resultado = await actualizarPedido(id as string, req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar pedido
export const borrarPedido = onRequest(async (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ error: "Falta el parámetro id" });
    return;
  }
  
  try {
    const resultado = await eliminarPedido(id as string);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener pedidos pendientes
export const obtenerPendientes = onRequest(async (req, res) => {
  const { proveedorId } = req.query;
  
  if (!proveedorId) {
    res.status(400).json({ error: "Falta el parámetro proveedorId" });
    return;
  }
  
  try {
    const pedidosPendientes = await obtenerPedidosPendientesPorProveedor(proveedorId as string);
    res.status(200).json(pedidosPendientes);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
