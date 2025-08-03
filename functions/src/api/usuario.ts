import { onRequest } from "firebase-functions/v2/https";
import { crearUsuario, buscarUsuarioPorCorreo as buscarUsuarioPorCorreoService } from "../services/usuario.service";

// Registro
export const registro = onRequest(async (req, res) => {
  const { nombre, correo, contraseña, fechaNacimiento } = req.body;
  if (!nombre || !correo || !contraseña || !fechaNacimiento) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
    return;
  }
  // Verifica si ya existe el correo
  const existente = await buscarUsuarioPorCorreoService(correo);
  if (existente) {
    res.status(400).json({ error: "El correo ya está registrado" });
    return;
  }
  const usuario = await crearUsuario({ nombre, correo, contraseña, fechaNacimiento });
  res.json(usuario);
});

// Inicio de sesión
export const login = onRequest(async (req, res) => {
  const { correo, contraseña } = req.body;
  if (!correo || !contraseña) {
    res.status(400).json({ error: "Faltan campos obligatorios" });
    return;
  }
  const usuario = await buscarUsuarioPorCorreoService(correo);
  if (!usuario || usuario.contraseña !== contraseña) {
    res.status(401).json({ error: "Credenciales incorrectas" });
    return;
  }
  res.json({ mensaje: "Inicio de sesión exitoso", usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo } });
});
