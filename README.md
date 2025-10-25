# 7Upper API - Proveedores

API REST para proveedores de la aplicación 7Upper desplegada en Vercel.

## Ramas del Proyecto

- **`main`**: Endpoints para usuarios
- **`proveedores-develop`**: Endpoints para proveedores (rama actual)

## Estructura del Proyecto

```
├── api/                    # Endpoints de Vercel
│   ├── clientes.ts        # GET/POST/PUT/DELETE /api/clientes
│   ├── pedidos.ts         # GET/POST/PUT/DELETE /api/pedidos
│   ├── servicios.ts       # GET/POST/PUT/DELETE /api/servicios
│   ├── pendientes.ts      # GET /api/pendientes
│   ├── proveedor.ts       # GET/POST /api/proveedor
│   └── index.ts           # GET /api (info de endpoints)
├── lib/                   # Lógica de negocio
│   ├── firebase.ts        # Configuración de Firebase
│   ├── models/            # Modelos de datos
│   │   ├── cliente.model.ts
│   │   ├── pedido.model.ts
│   │   ├── servicio.model.ts
│   │   └── proveedor.model.ts
│   └── services/          # Servicios de base de datos
│       ├── cliente.service.ts
│       ├── pedido.service.ts
│       ├── servicio.service.ts
│       └── proveedor.service.ts
└── functions/             # Código original de Firebase Functions
```

## Endpoints Disponibles

### Mis Clientes
- `GET /api/clientes?proveedorId={id}` - Obtener clientes del proveedor
- `GET /api/clientes?id={id}` - Obtener cliente específico
- `POST /api/clientes` - Crear nuevo cliente
- `PUT /api/clientes?id={id}` - Actualizar cliente
- `DELETE /api/clientes?id={id}` - Eliminar cliente

### Pedidos
- `GET /api/pedidos?proveedorId={id}` - Obtener pedidos del proveedor
- `GET /api/pedidos?id={id}` - Obtener pedido específico
- `POST /api/pedidos` - Crear nuevo pedido
- `PUT /api/pedidos?id={id}` - Actualizar pedido
- `DELETE /api/pedidos?id={id}` - Eliminar pedido

### Servicios
- `GET /api/servicios?proveedorId={id}` - Obtener servicios del proveedor
- `GET /api/servicios?id={id}` - Obtener servicio específico
- `POST /api/servicios` - Crear nuevo servicio
- `PUT /api/servicios?id={id}` - Actualizar servicio
- `DELETE /api/servicios?id={id}` - Eliminar servicio

### Pendientes
- `GET /api/pendientes?proveedorId={id}` - Obtener pedidos pendientes y en proceso

### Proveedores
- `POST /api/proveedor` - Crear proveedor
- `GET /api/proveedor?id={id}` - Obtener proveedor por ID

## Documentación Detallada

Para más información sobre los endpoints y ejemplos de uso, consulta [ENDPOINTS_PROVEEDORES.md](./ENDPOINTS_PROVEEDORES.md)

## Configuración para Despliegue

### Variables de Entorno Requeridas

En Vercel, configura las siguientes variables de entorno:

```
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_PRIVATE_KEY=tu-private-key
FIREBASE_CLIENT_EMAIL=tu-client-email
```

### Comandos de Despliegue

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Desplegar a producción
npm run deploy
```

## Colecciones de Firebase

Los datos se almacenan en las siguientes colecciones:

- `clientes` - Clientes de los proveedores
- `pedidos` - Pedidos realizados
- `servicios` - Servicios ofrecidos por proveedores
- `proveedores` - Información de proveedores

## CORS

Todos los endpoints tienen CORS habilitado para permitir peticiones desde cualquier origen.
