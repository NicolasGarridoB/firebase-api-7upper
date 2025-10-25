# Cambios Realizados - Rama proveedores-dev

## Resumen
Se han actualizado todos los endpoints de usuarios a endpoints de proveedores en la rama `proveedores-dev`.

## Archivos Eliminados

### En `/api`:
- ❌ `login.ts` → ✅ `clientes.ts`
- ❌ `registro.ts` → ✅ `pedidos.ts`
- ❌ `dieta.ts` → ✅ `servicios.ts`

### En `/functions/src/api`:
- ❌ `usuario.ts`
- ❌ `dieta.ts`

### En `/functions/src/models`:
- ❌ `usuario.model.ts`
- ❌ `dieta.model.ts`

### En `/functions/src/services`:
- ❌ `usuario.service.ts`
- ❌ `dieta.service.ts`

## Archivos Creados

### En `/api`:
- ✅ `clientes.ts` - CRUD de clientes
- ✅ `pedidos.ts` - CRUD de pedidos
- ✅ `servicios.ts` - CRUD de servicios
- ✅ `pendientes.ts` - Consulta de pedidos pendientes

### En `/lib/models`:
- ✅ `cliente.model.ts`
- ✅ `pedido.model.ts`
- ✅ `servicio.model.ts`

### En `/lib/services`:
- ✅ `cliente.service.ts`
- ✅ `pedido.service.ts`
- ✅ `servicio.service.ts`

### En `/functions/src/api`:
- ✅ `cliente.ts`
- ✅ `pedido.ts`
- ✅ `servicio.ts`

### En `/functions/src/models`:
- ✅ `cliente.model.ts`
- ✅ `pedido.model.ts`
- ✅ `servicio.model.ts`

### En `/functions/src/services`:
- ✅ `cliente.service.ts`
- ✅ `pedido.service.ts`
- ✅ `servicio.service.ts`

## Archivos Modificados

### `/api/index.ts`
- Actualizado para reflejar los nuevos endpoints de proveedores

### `/functions/src/index.ts`
- Actualizado para exportar los nuevos módulos de API

### `README.md`
- Actualizado con la documentación de los nuevos endpoints

### Documentación adicional:
- ✅ `ENDPOINTS_PROVEEDORES.md` - Documentación detallada de todos los endpoints

## Nuevos Endpoints

### Clientes (`/api/clientes`)
- `GET` - Obtener clientes por proveedor o cliente específico
- `POST` - Crear nuevo cliente
- `PUT` - Actualizar cliente
- `DELETE` - Eliminar cliente

### Pedidos (`/api/pedidos`)
- `GET` - Obtener pedidos por proveedor o pedido específico
- `POST` - Crear nuevo pedido
- `PUT` - Actualizar pedido
- `DELETE` - Eliminar pedido

### Servicios (`/api/servicios`)
- `GET` - Obtener servicios por proveedor o servicio específico
- `POST` - Crear nuevo servicio
- `PUT` - Actualizar servicio
- `DELETE` - Eliminar servicio

### Pendientes (`/api/pendientes`)
- `GET` - Obtener pedidos pendientes y en proceso por proveedor

### Proveedor (`/api/proveedor`)
- `GET` - Obtener proveedor por ID (mantiene funcionalidad original)
- `POST` - Crear proveedor (mantiene funcionalidad original)

## Colecciones de Firebase

Las nuevas colecciones en Firestore son:
- `clientes` - Información de clientes
- `pedidos` - Pedidos realizados
- `servicios` - Servicios ofrecidos por proveedores
- `proveedores` - Información de proveedores (existente)

## Modelos de Datos

### Cliente
```typescript
{
  id?: string;
  proveedorId: string;
  nombre: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  fechaRegistro: string;
  totalPedidos: number;
  ultimoPedido?: string;
}
```

### Pedido
```typescript
{
  id?: string;
  proveedorId: string;
  clienteId: string;
  clienteNombre?: string;
  servicioId: string;
  servicioNombre?: string;
  fecha: string;
  estado: 'pendiente' | 'en-proceso' | 'completado' | 'cancelado';
  total: number;
  descripcion?: string;
  direccionEntrega?: string;
}
```

### Servicio
```typescript
{
  id?: string;
  proveedorId: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  disponible: boolean;
  imagenUrl?: string;
  duracionEstimada?: string;
  fechaCreacion: string;
}
```

## Próximos Pasos

1. Instalar dependencias: `npm install`
2. Probar los endpoints localmente
3. Desplegar a Vercel: `vercel --prod`
4. Configurar las variables de entorno en Vercel (si no están configuradas)

## Notas

- Todos los endpoints tienen CORS habilitado
- La configuración de Firebase se mantiene igual
- Los endpoints siguen el mismo patrón de la rama `main` pero adaptados para proveedores
