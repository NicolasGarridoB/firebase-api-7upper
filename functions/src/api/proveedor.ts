import { onRequest } from "firebase-functions/v2/https";
import { crearProveedor, obtenerProveedor } from "../services/proveedor.service";

// Crear proveedor
export const registrarProveedor = onRequest(async (req, res) => {
  const { nombre, fotoPerfil, puntuacion, totalClientes, serviciosActivos } = req.body;
  if (!nombre) {
    res.status(400).json({ error: "Falta el nombre del proveedor" });
    return;
  }
  const proveedor = await crearProveedor({
    nombre,
    fotoPerfil: fotoPerfil || "",
    puntuacion: puntuacion || 0,
    totalClientes: totalClientes || 0,
    serviciosActivos: serviciosActivos || 0,
  });
  res.json(proveedor);
});

// Obtener perfil proveedor
export const perfilProveedor = onRequest(async (req, res) => {
  const proveedorId = req.query.id as string;
  if (!proveedorId) {
    res.status(400).json({ error: "Falta el id del proveedor" });
    return;
  }
  const proveedor = await obtenerProveedor(proveedorId);
  if (!proveedor) {
    res.status(404).json({ error: "Proveedor no encontrado" });
    return;
  }
  res.json(proveedor);
});