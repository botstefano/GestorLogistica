-- SISTEMA DE GESTIÓN Y CONTROL DE COSTES LOGÍSTICOS
-- Esquema de base de datos PostgreSQL

-- Eliminar tablas si existen (en orden de dependencia)
DROP TABLE IF EXISTS auditorias;
DROP TABLE IF EXISTS alertas_sobrecostes;
DROP TABLE IF EXISTS costes_logisticos_totales;
DROP TABLE IF EXISTS distribuciones;
DROP TABLE IF EXISTS costes_transporte;
DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS costes_almacenamiento;
DROP TABLE IF EXISTS detalles_compra;
DROP TABLE IF EXISTS ordenes_compra;
DROP TABLE IF EXISTS inventarios;
DROP TABLE IF EXISTS almacenes;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS proveedores;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;

-- Crear tabla de roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(200)
);

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de proveedores
CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    stock_actual INTEGER DEFAULT 0,
    stock_minimo INTEGER DEFAULT 10,
    proveedor_id INTEGER REFERENCES proveedores(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de almacenes
CREATE TABLE almacenes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(200),
    capacidad_total INTEGER,
    coste_mensual_operacion DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de inventarios
CREATE TABLE inventarios (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER REFERENCES productos(id),
    almacen_id INTEGER REFERENCES almacenes(id),
    cantidad INTEGER DEFAULT 0,
    ubicacion_estanteria VARCHAR(50),
    ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(producto_id, almacen_id)
);

-- Crear tabla de órdenes de compra
CREATE TABLE ordenes_compra (
    id SERIAL PRIMARY KEY,
    proveedor_id INTEGER REFERENCES proveedores(id),
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega_esperada DATE,
    total DECIMAL(10, 2) DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'pendiente', -- pendiente, en_almacen, en_transito, entregado, cancelado
    usuario_registra_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de detalles de compra
CREATE TABLE detalles_compra (
    id SERIAL PRIMARY KEY,
    orden_compra_id INTEGER REFERENCES ordenes_compra(id),
    producto_id INTEGER REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- Crear tabla de costes de almacenamiento
CREATE TABLE costes_almacenamiento (
    id SERIAL PRIMARY KEY,
    almacen_id INTEGER REFERENCES almacenes(id),
    fecha DATE NOT NULL,
    concepto VARCHAR(100) NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    tipo_gasto VARCHAR(50), -- alquiler, mantenimiento, mano_obra, servicios
    usuario_registra_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de vehículos
CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(20) NOT NULL UNIQUE,
    modelo VARCHAR(100),
    capacidad_carga DECIMAL(10, 2),
    coste_por_km DECIMAL(10, 2) DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'activo', -- activo, mantenimiento, inactivo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de costes de transporte
CREATE TABLE costes_transporte (
    id SERIAL PRIMARY KEY,
    vehiculo_id INTEGER REFERENCES vehiculos(id),
    fecha DATE NOT NULL,
    ruta_origen VARCHAR(200),
    ruta_destino VARCHAR(200),
    kilometros_recorridos DECIMAL(10, 2),
    coste_combustible DECIMAL(10, 2) DEFAULT 0,
    coste_peajes DECIMAL(10, 2) DEFAULT 0,
    coste_mantenimiento DECIMAL(10, 2) DEFAULT 0,
    coste_conductor DECIMAL(10, 2) DEFAULT 0,
    usuario_registra_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de distribuciones
CREATE TABLE distribuciones (
    id SERIAL PRIMARY KEY,
    orden_compra_id INTEGER REFERENCES ordenes_compra(id),
    vehiculo_id INTEGER REFERENCES vehiculos(id),
    fecha_salida TIMESTAMP,
    fecha_entrega TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente', -- pendiente, en_transito, entregado
    coste_total_transporte DECIMAL(10, 2) DEFAULT 0,
    usuario_registra_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de costes logísticos totales
CREATE TABLE costes_logisticos_totales (
    id SERIAL PRIMARY KEY,
    operacion_referencia VARCHAR(50) NOT NULL,
    tipo_operacion VARCHAR(50) NOT NULL, -- compra, almacenamiento, transporte, distribucion
    fecha DATE NOT NULL,
    monto_total DECIMAL(10, 2) NOT NULL,
    desglose_json JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de alertas de sobrecostes
CREATE TABLE alertas_sobrecostes (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(50) NOT NULL, -- almacenamiento, transporte, compra
    monto_esperado DECIMAL(10, 2) NOT NULL,
    monto_real DECIMAL(10, 2) NOT NULL,
    diferencia DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'activa', -- activa, resuelta, ignorada
    operacion_referencia VARCHAR(50),
    usuario_notificado_id INTEGER REFERENCES usuarios(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de auditorías
CREATE TABLE auditorias (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    accion VARCHAR(50) NOT NULL, -- INSERT, UPDATE, DELETE
    tabla_afectada VARCHAR(50) NOT NULL,
    registro_id INTEGER,
    fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datos_anteriores_json JSONB
);

-- Configuración de umbrales para alertas (tabla de configuración)
CREATE TABLE configuracion (
    id SERIAL PRIMARY KEY,
    clave VARCHAR(50) NOT NULL UNIQUE,
    valor VARCHAR(200) NOT NULL,
    descripcion TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar rendimiento
CREATE INDEX idx_ordenes_compra_estado ON ordenes_compra(estado);
CREATE INDEX idx_ordenes_compra_fecha ON ordenes_compra(fecha_emision);
CREATE INDEX idx_inventarios_producto ON inventarios(producto_id);
CREATE INDEX idx_inventarios_almacen ON inventarios(almacen_id);
CREATE INDEX idx_costes_almacenamiento_fecha ON costes_almacenamiento(fecha);
CREATE INDEX idx_costes_transporte_fecha ON costes_transporte(fecha);
CREATE INDEX idx_alertas_sobrecostes_estado ON alertas_sobrecostes(estado);
CREATE INDEX idx_auditorias_usuario ON auditorias(usuario_id);
CREATE INDEX idx_auditorias_tabla ON auditorias(tabla_afectada);

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Insertar roles
INSERT INTO roles (nombre, descripcion) VALUES
('Administrador', 'Acceso total al sistema'),
('Operador Logístico', 'Gestión de operaciones diarias'),
('Supervisor', 'Supervisión de operaciones y reportes'),
('Gerente', 'Acceso a dashboards y reportes ejecutivos');

-- Insertar usuarios (contraseñas hasheadas con bcrypt)
-- admin123, oper123, sup123, ger123
INSERT INTO usuarios (nombre, email, password_hash, rol_id) VALUES
('Administrador', 'admin@logistica.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1),
('Operador Logístico', 'operador@logistica.com', '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', 2),
('Supervisor', 'supervisor@logistica.com', '$2a$10$Z9YhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYhYh', 3),
('Gerente', 'gerente@logistica.com', '$2a$10$A0ZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZiZi', 4);

-- Insertar proveedores
INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES
('Proveedor A S.A.', 'Juan Pérez', '+52 555-0101', 'contacto@proveedora.com', 'Av. Industrial 123, Ciudad de México'),
('Proveedor B Ltda.', 'María García', '+52 555-0202', 'ventas@proveedorb.com', 'Calle Comercio 456, Monterrey'),
('Proveedor C Corp.', 'Carlos López', '+52 555-0303', 'info@proveedorc.com', 'Blvd. Logística 789, Guadalajara');

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio_unitario, stock_actual, stock_minimo, proveedor_id) VALUES
('Producto 1 - Electrónica', 'Componentes electrónicos básicos', 150.00, 50, 20, 1),
('Producto 2 - Materiales', 'Materiales de construcción', 75.50, 100, 30, 2),
('Producto 3 - Herramientas', 'Herramientas industriales', 200.00, 30, 10, 3),
('Producto 4 - Suministros', 'Suministros de oficina', 25.00, 200, 50, 1),
('Producto 5 - Repuestos', 'Repuestos de maquinaria', 350.00, 15, 5, 2);

-- Insertar almacenes
INSERT INTO almacenes (nombre, ubicacion, capacidad_total, coste_mensual_operacion) VALUES
('Almacén Central', 'Zona Industrial Norte, Cd. México', 5000, 15000.00),
('Almacén Sur', 'Zona Industrial Sur, Cd. México', 3000, 10000.00);

-- Insertar inventario inicial
INSERT INTO inventarios (producto_id, almacen_id, cantidad, ubicacion_estanteria) VALUES
(1, 1, 30, 'A-01'),
(2, 1, 60, 'A-02'),
(3, 1, 20, 'B-01'),
(4, 2, 100, 'C-01'),
(5, 2, 10, 'C-02');

-- Insertar vehículos
INSERT INTO vehiculos (placa, modelo, capacidad_carga, coste_por_km, estado) VALUES
('ABC-123-4', 'Camión Volvo FH', 15000.00, 2.50, 'activo'),
('DEF-456-7', 'Camión Mercedes Actros', 12000.00, 2.80, 'activo');

-- Insertar configuración inicial
INSERT INTO configuracion (clave, valor, descripcion) VALUES
('umbral_sobrecoste_almacenamiento', '20', 'Porcentaje de sobrecoste para alertas de almacenamiento'),
('umbral_sobrecoste_transporte', '25', 'Porcentaje de sobrecoste para alertas de transporte'),
('umbral_sobrecoste_compra', '15', 'Porcentaje de sobrecoste para alertas de compra'),
('coste_estandar_km', '2.50', 'Coste estándar por kilómetro de transporte'),
('coste_estandar_almacenamiento_hora', '50.00', 'Coste estándar por hora de almacenamiento');
