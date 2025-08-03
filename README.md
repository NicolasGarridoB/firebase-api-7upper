# 7Upper API - Vercel

API REST para la aplicación 7Upper desplegada en Vercel.

## Estructura del Proyecto

```
├── api/                    # Endpoints de Vercel
│   ├── registro.ts        # POST /api/registro
│   ├── login.ts           # POST /api/login
│   ├── dieta.ts           # GET/POST /api/dieta
│   └── proveedor.ts       # GET/POST /api/proveedor
├── lib/                   # Lógica de negocio
│   ├── firebase.ts        # Configuración de Firebase
│   ├── models/            # Modelos de datos
│   └── services/          # Servicios de base de datos
└── functions/             # Código original de Firebase Functions
```

## Endpoints Disponibles

### Usuarios
- `POST /api/registro` - Registrar nuevo usuario
- `POST /api/login` - Iniciar sesión

### Dietas
- `POST /api/dieta` - Crear dieta
- `GET /api/dieta?usuarioId={id}` - Obtener dieta por usuario

### Proveedores
- `POST /api/proveedor` - Crear proveedor
- `GET /api/proveedor?id={id}` - Obtener proveedor por ID

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

## Migración desde Firebase Functions

Este proyecto fue migrado desde Firebase Functions a Vercel. Los principales cambios incluyen:

1. **Estructura de archivos**: De `functions/src/api/` a `api/`
2. **Manejo de requests**: De `onRequest()` a `handler(req, res)`
3. **Configuración**: Variables de entorno en Vercel
4. **CORS**: Configuración manual en cada endpoint
