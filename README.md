# Sistema de Gestión y Control de Costes Logísticos

Sistema completo para la gestión y control de costes logísticos, automatizando procesos de compras, almacenamiento, transporte, distribución y control financiero.

## 🚀 Características

- **Gestión de Usuarios**: Autenticación con JWT y roles (Administrador, Operador, Supervisor, Gerente)
- **Gestión de Proveedores**: CRUD completo de proveedores
- **Gestión de Productos**: Control de inventario y stock mínimo
- **Órdenes de Compra**: Registro y seguimiento de órdenes de compra
- **Inventario**: Gestión de inventarios por almacén
- **Costes de Almacenamiento**: Registro de costes operativos de almacenes
- **Costes de Transporte**: Control de costes de transporte por vehículo
- **Cálculo Automático**: Costes logísticos totales y por operación
- **Alertas de Sobrecostes**: Notificaciones automáticas cuando se exceden umbrales
- **Dashboard Ejecutivo**: KPIs y gráficos en tiempo real
- **Reportes**: Exportación a PDF y Excel
- **Auditoría**: Historial completo de cambios

## 📋 Requisitos Previos

- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- PostgreSQL 15+ (para desarrollo local)

## 🛠️ Instalación con Docker (Recomendado)

### 1. Clonar el repositorio
```bash
cd logistic-cost-system
```

### 2. Iniciar los servicios
```bash
docker-compose up --build
```

Esto iniciará:
- **PostgreSQL** en puerto 5432
- **Backend API** en puerto 5000
- **Frontend** en puerto 3000

### 3. Acceder a la aplicación
Abre tu navegador en: `http://localhost:3000`

## 👤 Usuarios de Prueba

El sistema incluye usuarios precargados para pruebas:

| Email | Contraseña | Rol |
|-------|------------|-----|
| admin@logistica.com | admin123 | Administrador |
| operador@logistica.com | oper123 | Operador Logístico |
| supervisor@logistica.com | sup123 | Supervisor |
| gerente@logistica.com | ger123 | Gerente |

## 📦 Instalación Local (Desarrollo)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurar las variables de entorno en .env
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Base de Datos

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE logistic_cost_db;"

# Ejecutar el schema
psql -U postgres -d logistic_cost_db -f backend/src/database/schema.sql
```

## 🏗️ Estructura del Proyecto

```
logistic-cost-system/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores de la API
│   │   ├── models/          # Modelos de base de datos
│   │   ├── routes/          # Rutas de la API
│   │   ├── middleware/      # Middleware (auth, validaciones)
│   │   ├── utils/           # Utilidades (cálculos, reportes)
│   │   └── database/        # Schema SQL y conexión
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas de la aplicación
│   │   ├── context/         # Contextos (Auth)
│   │   └── services/        # Servicio API
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔧 Configuración

### Variables de Entorno (Backend)

Crear archivo `.env` en el directorio `backend/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=logistic_cost_db
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=secret_key_logistica_2024
NODE_ENV=development
PORT=5000
```

## 📊 Funcionalidades Principales

### Dashboard
- Coste logístico total del mes
- Comparativa real vs presupuesto
- Top 3 productos con mayor coste de almacenaje
- Coste de transporte por kilómetro
- Alertas activas de sobrecostes

### Compras
- Registro de órdenes de compra
- Actualización automática de inventario al recibir mercancía
- Seguimiento de estados (pendiente, en almacén, en tránsito, entregado)

### Inventario
- Gestión de inventarios por almacén
- Alertas de stock bajo
- Trazabilidad de ubicación

### Costes
- Registro de costes de almacenamiento (alquiler, mantenimiento, mano de obra, servicios)
- Registro de costes de transporte (combustible, peajes, mantenimiento, conductores)
- Cálculo automático de costes totales

### Alertas
- Detección automática de sobrecostes
- Umbrales configurables por tipo de operación
- Gestión de alertas (activa, resuelta, ignorada)

### Reportes
- Exportación a PDF
- Exportación a Excel
- Reportes de costes, inventario, transporte y compras

### Auditoría
- Historial completo de cambios
- Registro de usuario, acción, tabla y fecha
- Solo accesible por Administradores y Supervisores

## 🔐 Seguridad

- Autenticación con JWT
- Contraseñas hasheadas con bcrypt
- Roles y permisos por usuario
- Middleware de autenticación en rutas protegidas
- Validación de datos en frontend y backend

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm test
```

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `GET /api/auth/profile` - Obtener perfil

### Proveedores
- `GET /api/proveedores` - Listar proveedores
- `POST /api/proveedores` - Crear proveedor
- `PUT /api/proveedores/:id` - Actualizar proveedor
- `DELETE /api/proveedores/:id` - Eliminar proveedor

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/low-stock/list` - Productos con stock bajo
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Órdenes de Compra
- `GET /api/ordenes-compra` - Listar órdenes
- `POST /api/ordenes-compra` - Crear orden
- `PATCH /api/ordenes-compra/:id/estado` - Actualizar estado
- `DELETE /api/ordenes-compra/:id` - Eliminar orden

### Costes de Almacenamiento
- `GET /api/costes-almacenamiento` - Listar costes
- `POST /api/costes-almacenamiento` - Registrar coste
- `DELETE /api/costes-almacenamiento/:id` - Eliminar coste

### Costes de Transporte
- `GET /api/costes-transporte` - Listar costes
- `POST /api/costes-transporte` - Registrar coste
- `DELETE /api/costes-transporte/:id` - Eliminar coste

### Dashboard
- `GET /api/dashboard/kpis` - Obtener KPIs
- `GET /api/dashboard/costes-por-mes/:anio` - Costes por mes
- `GET /api/dashboard/top-productos-coste` - Top productos por coste

### Alertas
- `GET /api/alertas/activas` - Alertas activas
- `PATCH /api/alertas/:id/estado` - Actualizar estado de alerta

## 🐛 Troubleshooting

### Error de conexión a base de datos
- Verificar que PostgreSQL esté corriendo
- Revisar variables de entorno en `.env`
- Asegurarse de que el schema SQL se haya ejecutado

### Error de autenticación
- Verificar que el token JWT sea válido
- Revisar que `JWT_SECRET` esté configurado correctamente
- Limpiar localStorage en el navegador

### Frontend no carga
- Verificar que el backend esté corriendo en puerto 5000
- Revisar la configuración del proxy en `vite.config.js`

## 📄 Licencia

Este proyecto es para uso educativo y demostrativo.

## 👥 Autores

Desarrollado como sistema de gestión de costes logísticos.

## 🙏 Agradecimientos

- React y Vite por el framework frontend
- Express.js por el framework backend
- PostgreSQL por la base de datos
- Tailwind CSS por el sistema de estilos
- Recharts por las gráficas
