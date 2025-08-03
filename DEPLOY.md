# Instrucciones para desplegar en Vercel

## Pasos para el despliegue:

### 1. Instalar Vercel CLI
```bash
npm install -g vercel
```

### 2. Configurar Variables de Entorno
En tu proyecto de Firebase, ve a:
- Firebase Console > Configuración del proyecto > Cuentas de servicio
- Genera una nueva clave privada
- Descarga el archivo JSON

Extrae las siguientes variables:
- `project_id` → FIREBASE_PROJECT_ID
- `private_key` → FIREBASE_PRIVATE_KEY
- `client_email` → FIREBASE_CLIENT_EMAIL

### 3. Configurar en Vercel
```bash
# Inicializar proyecto en Vercel
vercel

# Configurar variables de entorno
vercel env add FIREBASE_PROJECT_ID
vercel env add FIREBASE_PRIVATE_KEY
vercel env add FIREBASE_CLIENT_EMAIL
```

### 4. Desplegar
```bash
# Despliegue de producción
vercel --prod
```

## URLs de ejemplo después del despliegue:

Si tu proyecto se despliega como `7upper-api.vercel.app`, los endpoints serán:

- POST https://7upper-api.vercel.app/api/registro
- POST https://7upper-api.vercel.app/api/login
- GET/POST https://7upper-api.vercel.app/api/dieta
- GET/POST https://7upper-api.vercel.app/api/proveedor

## Testing
Puedes usar la página de prueba en:
https://7upper-api.vercel.app/test.html
