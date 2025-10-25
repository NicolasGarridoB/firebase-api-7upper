# API Proveedores - 7Upper

Esta rama (`proveedores-develop`) maneja los endpoints para proveedores.

## Endpoints Disponibles

### 1. Mis Clientes (`/api/clientes`)

Gestión de clientes del proveedor.

#### GET - Obtener clientes
```
GET /api/clientes?proveedorId={proveedorId}
GET /api/clientes?id={clienteId}
```

**Respuesta:**
```json
[
  {
    "id": "cliente123",
    "proveedorId": "prov456",
    "nombre": "Juan Pérez",
    "correo": "juan@example.com",
    "telefono": "+1234567890",
    "direccion": "Calle 123",
    "fechaRegistro": "2025-10-25T00:00:00.000Z",
    "totalPedidos": 5,
    "ultimoPedido": "2025-10-24T00:00:00.000Z"
  }
]
```

#### POST - Crear cliente
```
POST /api/clientes
Content-Type: application/json

{
  "proveedorId": "prov456",
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "telefono": "+1234567890",
  "direccion": "Calle 123"
}
```

#### PUT - Actualizar cliente
```
PUT /api/clientes?id={clienteId}
Content-Type: application/json

{
  "nombre": "Juan Pérez Actualizado",
  "telefono": "+9876543210"
}
```

#### DELETE - Eliminar cliente
```
DELETE /api/clientes?id={clienteId}
```

---

### 2. Pedidos (`/api/pedidos`)

Gestión de pedidos del proveedor.

#### GET - Obtener pedidos
```
GET /api/pedidos?proveedorId={proveedorId}
GET /api/pedidos?id={pedidoId}
```

**Respuesta:**
```json
[
  {
    "id": "pedido123",
    "proveedorId": "prov456",
    "clienteId": "cliente123",
    "clienteNombre": "Juan Pérez",
    "servicioId": "servicio789",
    "servicioNombre": "Servicio Premium",
    "fecha": "2025-10-25T00:00:00.000Z",
    "estado": "pendiente",
    "total": 150.00,
    "descripcion": "Pedido especial",
    "direccionEntrega": "Calle 123"
  }
]
```

**Estados posibles:** `pendiente`, `en-proceso`, `completado`, `cancelado`

#### POST - Crear pedido
```
POST /api/pedidos
Content-Type: application/json

{
  "proveedorId": "prov456",
  "clienteId": "cliente123",
  "clienteNombre": "Juan Pérez",
  "servicioId": "servicio789",
  "servicioNombre": "Servicio Premium",
  "estado": "pendiente",
  "total": 150.00,
  "descripcion": "Pedido especial",
  "direccionEntrega": "Calle 123"
}
```

#### PUT - Actualizar pedido
```
PUT /api/pedidos?id={pedidoId}
Content-Type: application/json

{
  "estado": "completado"
}
```

#### DELETE - Eliminar pedido
```
DELETE /api/pedidos?id={pedidoId}
```

---

### 3. Servicios (`/api/servicios`)

Gestión de servicios ofrecidos por el proveedor.

#### GET - Obtener servicios
```
GET /api/servicios?proveedorId={proveedorId}
GET /api/servicios?id={servicioId}
```

**Respuesta:**
```json
[
  {
    "id": "servicio789",
    "proveedorId": "prov456",
    "nombre": "Servicio Premium",
    "descripcion": "Descripción del servicio",
    "precio": 150.00,
    "categoria": "Premium",
    "disponible": true,
    "imagenUrl": "https://example.com/imagen.jpg",
    "duracionEstimada": "2 horas",
    "fechaCreacion": "2025-10-25T00:00:00.000Z"
  }
]
```

#### POST - Crear servicio
```
POST /api/servicios
Content-Type: application/json

{
  "proveedorId": "prov456",
  "nombre": "Servicio Premium",
  "descripcion": "Descripción del servicio",
  "precio": 150.00,
  "categoria": "Premium",
  "disponible": true,
  "imagenUrl": "https://example.com/imagen.jpg",
  "duracionEstimada": "2 horas"
}
```

#### PUT - Actualizar servicio
```
PUT /api/servicios?id={servicioId}
Content-Type: application/json

{
  "precio": 175.00,
  "disponible": false
}
```

#### DELETE - Eliminar servicio
```
DELETE /api/servicios?id={servicioId}
```

---

### 4. Pendientes (`/api/pendientes`)

Obtener pedidos pendientes y en proceso del proveedor.

#### GET - Obtener pendientes
```
GET /api/pendientes?proveedorId={proveedorId}
```

**Respuesta:**
```json
[
  {
    "id": "pedido123",
    "proveedorId": "prov456",
    "clienteId": "cliente123",
    "clienteNombre": "Juan Pérez",
    "servicioId": "servicio789",
    "servicioNombre": "Servicio Premium",
    "fecha": "2025-10-25T00:00:00.000Z",
    "estado": "pendiente",
    "total": 150.00
  }
]
```

Este endpoint retorna únicamente los pedidos con estado `pendiente` o `en-proceso`.

---

### 5. Proveedor (`/api/proveedor`)

Gestión de información del proveedor (mantiene la funcionalidad original).

#### GET - Obtener proveedor
```
GET /api/proveedor?id={proveedorId}
```

#### POST - Crear proveedor
```
POST /api/proveedor
Content-Type: application/json

{
  "nombre": "Proveedor XYZ",
  "fotoPerfil": "https://example.com/foto.jpg",
  "puntuacion": 4.5,
  "totalClientes": 100,
  "serviciosActivos": 10
}
```

---

## Colecciones de Firebase

Los datos se almacenan en las siguientes colecciones:

- `clientes` - Clientes de los proveedores
- `pedidos` - Pedidos realizados
- `servicios` - Servicios ofrecidos
- `proveedores` - Información de proveedores

## CORS

Todos los endpoints tienen CORS habilitado con:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

## Despliegue

Esta rama se despliega en Vercel de la misma forma que la rama `main`.

```bash
# Instalar dependencias
npm install

# Desplegar
vercel --prod
```
