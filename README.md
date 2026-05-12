# Nexwear Backend

API REST para una tienda de ropa (**Nexwear**) orientada a catálogo multimarca: productos con variantes (color, talla, SKU), filtros avanzados, carrito, pedidos, pagos, direcciones, reseñas y soporte.

## Stack

- **Node.js** + **Express** + **TypeScript** (modo estricto)
- **Prisma** + **PostgreSQL** (adaptador `@prisma/adapter-pg`)
- **JWT** para autenticación (mismo flujo de login para usuarios y administradores; el **rol** en base de datos define permisos)
- **Winston** para logs (consola y archivos según configuración del proyecto)
- **Docker Compose** para PostgreSQL en desarrollo

La organización del código sigue **Clean Architecture**: dominio (entidades, DTOs, repositorios abstractos), infraestructura (datasources Prisma, implementaciones de repositorios) y presentación (controladores, rutas, middlewares).

## Requisitos

- Node.js compatible con el `package.json` del repo
- Docker (opcional, recomendado para PostgreSQL)
- Variables de entorno configuradas (ver más abajo)

## Configuración

1. Copia `.env.template` a `.env` y completa los valores.

Variables relevantes (además de las del template):

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto HTTP del servidor |
| `CORS_ORIGINS` | Orígenes permitidos, separados por comas |
| `POSTGRES_URL` | Cadena de conexión Prisma/PostgreSQL |
| `JWT_SEED` | Secreto para firmar y validar JWT |
| `FIREBASE_*` | Credenciales Firebase usadas por los adapters de configuración |

2. Levanta PostgreSQL:

```bash
docker compose up -d
```

3. Instala dependencias y aplica el esquema de base de datos (según tu flujo habitual con Prisma, por ejemplo `prisma migrate deploy` o `db push`) y genera el cliente:

```bash
npm install
npx prisma generate
```

4. Población inicial de datos:

```bash
npm run seed
```

Usuarios de ejemplo del seed incluyen `admin@test.com` y `john@test.com` (contraseña `password` según `src/data/postgres/seed/data.ts`).

## Ejecución

```bash
npm run dev
```

Por defecto la API queda en `http://localhost:<PORT>` (el valor de `PORT` en `.env`).

## Autenticación

- Tras **login** o **register**, la respuesta incluye un **JWT**.
- Envía el token en cada petición protegida:

```http
Authorization: Bearer <tu_jwt>
```

- El middleware inyecta `userId` en `req.body` a partir del payload del token (campo `id` del usuario).

### Roles

- **`USER`**: compras, carrito, direcciones propias, pedidos propios, pagos asociados, reseñas, tickets de soporte.
- **`ADMIN`**: gestión de catálogo (marcas, categorías, productos, variantes, imágenes, descuentos, etc.), listados globales de usuarios/pedidos/pagos/soporte y borrados administrativos donde aplique.

Los endpoints marcados como “JWT + rol” requieren cabecera `Authorization` válida y el rol indicado.

---

## Base URL de la API

Todos los recursos REST viven bajo el prefijo **`/api`**.

Ejemplo: `GET http://localhost:3000/api/products`

---

## Endpoints por recurso

### Autenticación — `/api/auth`

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/register` | Registro. Body JSON: `name`, `email`, `password` (mín. 6 caracteres). |
| POST | `/login` | Login. Body JSON: `email`, `password`. Devuelve token y datos del usuario. |
| GET | `/check-auth` | Valida el JWT enviado en `Authorization: Bearer ...`. |

---

### Productos — `/api/products`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/` | No | Listado paginado + filtros (query string). |
| GET | `/random` | No | Productos aleatorios activos. Query opcional: `limit` (1–20, por defecto 5). Respuesta: `{ products }`. |
| GET | `/:id` | No | Detalle del producto (incluye variantes, imágenes, etiquetas, materiales, etc.). |
| POST | `/` | JWT + ADMIN | Crear producto. |
| PUT | `/:id` | JWT + ADMIN | Actualizar producto. |
| DELETE | `/:id` | JWT + ADMIN | Eliminar producto. |

**Query útiles en `GET /api/products`** (junto con `page` y `limit`):  
`search`, `categoryId`, `brandId`, `colorId`, `sizeId`, `materialId`, `tagId`, `discountId`, `gender` (`MEN` \| `WOMEN` \| `UNISEX` \| `KIDS`), `minPrice`, `maxPrice`, `inStock` (`true`/`false`), `sortBy` (`newest`, `price-asc`, `price-desc`, `rating`, `best-selling`), `isActive`, `isDeleted`.

> Importante: registra **`GET /random` antes que `GET /:id`** en el router (ya está así); si no, `random` se interpretaría como `id`.

---

### Variantes de producto — `/api/product-variants`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/product/:productId` | No | Variantes de un producto. |
| GET | `/:id` | No | Variante por ID. |
| POST | `/` | JWT + ADMIN | Crear variante. |
| PUT | `/:id` | JWT + ADMIN | Actualizar variante. |
| DELETE | `/:id` | JWT + ADMIN | Eliminar variante. |

---

### Imágenes de producto — `/api/product-images`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/product/:productId` | No | Imágenes del producto. |
| GET | `/:id` | No | Imagen por ID. |
| POST | `/` | JWT + ADMIN | Crear. |
| PUT | `/:id` | JWT + ADMIN | Actualizar. |
| DELETE | `/:id` | JWT + ADMIN | Eliminar. |

---

### Imágenes de variante — `/api/product-variant-images`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/` | No* | Crear (según implementación actual del router). |
| GET | `/:id` | No | Por ID. |
| GET | `/variant/:productVariantId` | No | Por variante. |
| PUT | `/:id` | No* | Actualizar. |
| DELETE | `/:id` | No* | Eliminar. |

\*En el código actual estas rutas **no** montan `AuthMiddleware`; conviene protegerlas en producción si solo debe gestionarlas el admin.

---

### Marcas — `/api/brands`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/`, `/:id` | No |
| POST, PUT, DELETE | `/`, `/:id` | JWT + ADMIN |

### Categorías — `/api/categories`

Igual patrón que marcas.

### Colores — `/api/colors`

Igual patrón que marcas.

### Tallas — `/api/sizes`

Igual patrón que marcas.

### Materiales — `/api/materials`

Igual patrón que marcas.

### Etiquetas — `/api/tags`

Igual patrón que marcas.

### Descuentos — `/api/discounts`

Igual patrón que marcas.

---

### Usuarios — `/api/users`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | `/` | JWT + ADMIN | Listado de usuarios. |
| GET | `/email/:email` | JWT + ADMIN | Usuario por email. |
| GET | `/:id` | JWT + USER o ADMIN | Perfil; ownership aplicado. |
| POST | `/` | No | Creación de usuario (registro vía este recurso, si aplica). |
| PUT | `/:id` | JWT + USER o ADMIN | Actualizar; ownership. |
| DELETE | `/:id` | JWT + ADMIN | Eliminar usuario. |

---

### Direcciones — `/api/user-addresses`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/user/:userId` | JWT + USER o ADMIN (ownership) |
| GET | `/:id` | JWT + USER o ADMIN (ownership) |
| POST | `/` | JWT + USER |
| PATCH | `/:id/default` | JWT + USER o ADMIN (ownership) |
| PUT | `/:id` | JWT + USER o ADMIN (ownership) |
| DELETE | `/:id` | JWT + USER o ADMIN (ownership) |

---

### Carritos — `/api/carts`

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | `/` | JWT + USER | Crear carrito. |
| GET | `/:id` | JWT + USER o ADMIN (ownership) | Carrito por ID. |
| GET | `/user/:userId` | JWT + USER o ADMIN (ownership) | Carrito por usuario. |
| GET | `/:id/items` | JWT + USER o ADMIN (ownership) | Ítems del carrito. |
| DELETE | `/:id/clear` | JWT + USER o ADMIN (ownership) | Vaciar carrito. |
| DELETE | `/:id` | JWT + USER o ADMIN (ownership) | Eliminar carrito. |

---

### Ítems de carrito — `/api/cart-items`

| Método | Ruta | Auth |
|--------|------|------|
| POST | `/` | JWT + USER |
| GET | `/cart/:cartId` | JWT + USER o ADMIN |
| GET | `/:id` | JWT + USER o ADMIN (ownership) |
| PUT | `/:id` | JWT + USER o ADMIN (ownership) |
| DELETE | `/:id` | JWT + USER o ADMIN (ownership) |

---

### Pedidos — `/api/orders`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/` | JWT + ADMIN |
| GET | `/user/:userId` | JWT + USER o ADMIN (ownership) |
| GET | `/:id` | JWT + USER o ADMIN (ownership) |
| GET | `/:id/items` | JWT + USER o ADMIN (ownership) |
| POST | `/` | JWT + USER |
| PATCH | `/:id/status` | JWT + ADMIN |
| DELETE | `/:id` | JWT + ADMIN |

---

### Líneas de pedido — `/api/order-items`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/order/:orderId` | JWT + USER o ADMIN |
| GET | `/:id` | JWT + USER o ADMIN |

---

### Pagos — `/api/payments`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/` | JWT + ADMIN |
| GET | `/order/:orderId` | JWT + USER o ADMIN (ownership) |
| GET | `/:id` | JWT + USER o ADMIN (ownership) |
| POST | `/` | JWT + USER |
| PATCH | `/:id` | JWT + USER o ADMIN |
| DELETE | `/:id` | JWT + ADMIN |

---

### Soporte — `/api/support-requests`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/` | JWT + ADMIN |
| GET | `/user/:userId` | JWT + USER o ADMIN (ownership) |
| GET | `/:id` | JWT + USER o ADMIN (ownership) |
| POST | `/` | JWT + USER |
| PATCH | `/:id/status` | JWT + ADMIN |
| DELETE | `/:id` | JWT + ADMIN |

---

### Reseñas — `/api/reviews`

| Método | Ruta | Auth |
|--------|------|------|
| GET | `/` | No |
| GET | `/:id` | No |
| GET | `/product/:productId` | No |
| GET | `/user/:userId` | No |
| POST | `/` | JWT + USER |
| PUT | `/:id` | JWT + USER o ADMIN (ownership) |
| DELETE | `/:id` | JWT + USER o ADMIN (ownership) |

---

## Flujo típico (cliente)

1. **Sin token**: navegar catálogo (`GET /api/products`, filtros, `GET /api/products/random`, detalle `GET /api/products/:id`, reseñas públicas).
2. **Registro / login** (`POST /api/auth/register` o `/login`).
3. Crear u obtener **carrito** (`POST /api/carts`, `GET /api/carts/user/:userId`).
4. Añadir líneas con **`POST /api/cart-items`** (variante + cantidad).
5. **Checkout**: crear **pedido** (`POST /api/orders`) y registrar **pago** (`POST /api/payments`) según las reglas de negocio implementadas en los controladores/DTOs.

Los cuerpos JSON exactos y validaciones están definidos en los **DTOs** bajo `src/domain/dtos/` (por ejemplo `create-order`, `create-cart-item`, etc.).

## Build de producción

```bash
npm run build
npm run start
```

