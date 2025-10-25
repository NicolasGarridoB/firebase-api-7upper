import { onRequest } from "firebase-functions/v2/https";
import { 
  crearCliente, 
  obtenerClientesPorProveedor, 
  obtenerCliente, 
  actualizarCliente, 
  eliminarCliente 
} from "../services/cliente.service";

// Obtener clientes por proveedor
export const obtenerClientes = onRequest(async (req, res) => {
  const { proveedorId, id } = req.query;
  
  try {
    if (id) {
      const cliente = await obtenerCliente(id as string);
      if (!cliente) {
        res.status(404).json({ error: "Cliente no encontrado" });
        return;
      }
      res.status(200).json(cliente);
    } else if (proveedorId) {
      const clientes = await obtenerClientesPorProveedor(proveedorId as string);
      res.status(200).json(clientes);
    } else {
      res.status(400).json({ error: "Falta el parámetro proveedorId o id" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Crear cliente
export const registrarCliente = onRequest(async (req, res) => {
  const { proveedorId, nombre, correo, telefono, direccion, totalPedidos, ultimoPedido } = req.body;
  
  if (!proveedorId || !nombre || !correo) {
    res.status(400).json({ error: "Faltan campos obligatorios: proveedorId, nombre, correo" });
    return;
  }
  
  try {
    const cliente = await crearCliente({
      proveedorId,
      nombre,
      correo,
      telefono: telefono || "",
      direccion: direccion || "",
      fechaRegistro: new Date().toISOString(),
      totalPedidos: totalPedidos || 0,
      ultimoPedido: ultimoPedido || ""
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar cliente
export const modificarCliente = onRequest(async (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ error: "Falta el parámetro id" });
    return;
  }
  
  try {
    const resultado = await actualizarCliente(id as string, req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar cliente
export const borrarCliente = onRequest(async (req, res) => {
  const { id } = req.query;
  
  if (!id) {
    res.status(400).json({ error: "Falta el parámetro id" });
    return;
  }
  
  try {
    const resultado = await eliminarCliente(id as string);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
