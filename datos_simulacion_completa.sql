-- SCRIPT DE SIMULACIÓN COMPLETA DE GESTIÓN LOGÍSTICA
-- Genera datos realistas para simular una empresa en operación durante 6 meses

-- ============================================
-- LIMPIEZA DE DATOS EXISTENTES Y RESET DE SECUENCIAS
-- ============================================
DELETE FROM alertas_sobrecostes;
DELETE FROM costes_logisticos_totales;
DELETE FROM distribuciones;
DELETE FROM costes_transporte;
DELETE FROM vehiculos;
DELETE FROM costes_almacenamiento;
DELETE FROM detalles_compra;
DELETE FROM ordenes_compra;
DELETE FROM inventarios;
DELETE FROM almacenes;
DELETE FROM productos;
DELETE FROM proveedores;

-- Resetear secuencias
ALTER SEQUENCE proveedores_id_seq RESTART WITH 1;
ALTER SEQUENCE productos_id_seq RESTART WITH 1;
ALTER SEQUENCE almacenes_id_seq RESTART WITH 1;
ALTER SEQUENCE vehiculos_id_seq RESTART WITH 1;
ALTER SEQUENCE inventarios_id_seq RESTART WITH 1;
ALTER SEQUENCE ordenes_compra_id_seq RESTART WITH 1;
ALTER SEQUENCE detalles_compra_id_seq RESTART WITH 1;
ALTER SEQUENCE costes_almacenamiento_id_seq RESTART WITH 1;
ALTER SEQUENCE costes_transporte_id_seq RESTART WITH 1;
ALTER SEQUENCE distribuciones_id_seq RESTART WITH 1;
ALTER SEQUENCE costes_logisticos_totales_id_seq RESTART WITH 1;
ALTER SEQUENCE alertas_sobrecostes_id_seq RESTART WITH 1;
ALTER SEQUENCE auditorias_id_seq RESTART WITH 1;

-- ============================================
-- PROVEEDORES (15 proveedores)
-- ============================================
INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES
('TechParts Industrial', 'Roberto Martínez', '+52 555-1001', 'ventas@techparts.com', 'Av. Tecnología 500, Cd. México'),
('Logística Norte SA', 'Ana Rodríguez', '+52 555-1002', 'contacto@logisticanorte.com', 'Calle Norte 250, Monterrey'),
('Global Supplies Corp', 'Miguel Sánchez', '+52 555-1003', 'info@globalsupplies.com', 'Blvd. Global 100, Guadalajara'),
('Materiales Premium', 'Laura González', '+52 555-1004', 'ventas@materialespremium.com', 'Av. Materiales 75, Cd. México'),
('Transporte Rápido', 'Carlos Hernández', '+52 555-1005', 'operaciones@transporterapido.com', 'Calle Transporte 300, Puebla'),
('ElectroComponentes', 'Pedro López', '+52 555-1006', 'sales@electrocomponentes.com', 'Av. Electrónica 200, Toluca'),
('Construcción Total', 'María Flores', '+52 555-1007', 'info@construcciontotal.com', 'Blvd. Construcción 450, Querétaro'),
('Suministros Express', 'Jorge Ramírez', '+52 555-1008', 'contacto@suministrosexpress.com', 'Calle Suministros 150, León'),
('Maquinaria Pro', 'Diego Torres', '+52 555-1009', 'ventas@maquinaripro.com', 'Av. Maquinaria 600, San Luis Potosí'),
('Industrial Solutions', 'Carmen Vargas', '+52 555-1010', 'info@industrialsolutions.com', 'Calle Industrial 350, Mérida'),
('Packaging Systems', 'Luis Morales', '+52 555-1011', 'sales@packagingsystems.com', 'Av. Empaque 400, Cancún'),
('Safety Equipment', 'Andrea Castillo', '+52 555-1012', 'contacto@safetyequipment.com', 'Blvd. Seguridad 250, Tijuana'),
('Chemical Products', 'Fernando Ortiz', '+52 555-1013', 'info@chemicalproducts.com', 'Calle Química 180, Hermosillo'),
('Food Logistics', 'Patricia Reyes', '+52 555-1014', 'ventas@foodlogistics.com', 'Av. Alimentos 550, Monterrey'),
('AutoParts Mexico', 'Ricardo Mendoza', '+52 555-1015', 'contacto@autopartsmexico.com', 'Blvd. Automotriz 700, Puebla');

-- ============================================
-- PRODUCTOS (50 productos)
-- ============================================
INSERT INTO productos (nombre, descripcion, precio_unitario, stock_actual, stock_minimo, proveedor_id) VALUES
-- Electrónica (Proveedor 1)
('Microcontrolador Arduino', 'Placa Arduino Uno R3', 250.00, 45, 15, 1),
('Sensor de Temperatura', 'Sensor DHT22 digital', 85.00, 120, 30, 1),
('Módulo WiFi ESP8266', 'Módulo ESP8266 ESP-01', 120.00, 80, 25, 1),
('Display LCD 16x2', 'Pantalla LCD azul 16x2', 95.00, 60, 20, 1),
('Batería Li-Ion 18650', 'Batería recargable 3000mAh', 45.00, 200, 50, 1),
('Cable USB Tipo C', 'Cable USB-C 2m', 15.00, 300, 80, 1),
('Resistencia 10kΩ', 'Resistencia 1/4W 10kΩ (x100)', 8.00, 500, 100, 1),
('LED Rojo 5mm', 'LED rojo 5mm (x50)', 12.00, 400, 80, 1),
('Protoboard 400pts', 'Protoboard de 400 puntos', 55.00, 90, 25, 1),
('Fuente 5V 2A', 'Fuente de alimentación 5V 2A', 75.00, 70, 20, 1),

-- Materiales (Proveedor 2)
('Cemento Portland 50kg', 'Saco de cemento 50kg', 180.00, 150, 40, 2),
('Varilla Corrugada 1/2"', 'Varilla de acero 1/2" x 6m', 85.00, 200, 50, 2),
('Ladrillo Rojo', 'Ladrillo de barro rojo (x100)', 220.00, 800, 200, 2),
('Arena Grava 1m³', 'Mezcla arena grava 1m³', 350.00, 50, 15, 2),
('Pintura Blanca 20L', 'Pintura látex blanco 20L', 450.00, 30, 10, 2),
('Tubería PVC 4"', 'Tubería PVC 4" x 6m', 120.00, 100, 30, 2),
('Cable Eléctrico 12AWG', 'Carrete cable 12AWG 100m', 280.00, 60, 18, 2),
('Placa Yeso 1.2x2.4m', 'Placa de yeso estándar', 95.00, 150, 40, 2),
('Adhesivo Cerámico', 'Bolsa adhesivo cerámico 25kg', 165.00, 80, 25, 2),
('Impermeabilizante 20L', 'Impermeabilizante asfáltico 20L', 380.00, 40, 12, 2),

-- Herramientas (Proveedor 3)
('Taladro Percutor 18V', 'Taladro inalámbrico 18V', 550.00, 25, 8, 3),
('Sierra Circular 7-1/4"', 'Sierra circular 1200W', 680.00, 20, 6, 3),
('Herramienta Rotativa', 'Dremel 3000 con accesorios', 420.00, 30, 10, 3),
('Juego Llaves 10-32mm', 'Set llaves mixtas 10-32mm', 350.00, 40, 12, 3),
('Martillo 20oz', 'Martillo fibra de vidrio 20oz', 85.00, 60, 18, 3),
('Nivel Laser 3 líneas', 'Nivel láser automático 3 líneas', 290.00, 15, 5, 3),
('Compresor 50L', 'Compresor aire 50L 2HP', 850.00, 12, 4, 3),
('Pistola Calor 2000W', 'Pistola aire caliente 2000W', 180.00, 35, 10, 3),
('Multímetro Digital', 'Multímetro auto-rango', 150.00, 45, 15, 3),
('Caja Herramientas 19"', 'Caja herramientas 19" plástico', 220.00, 28, 8, 3),

-- Suministros (Proveedor 4)
('Papel Bond A4 500h', 'Resma papel bond A4 500h', 75.00, 200, 60, 4),
('Bolígrafos Azules (x50)', 'Bolígrafos punta fina azul x50', 45.00, 300, 80, 4),
('Archivadores A4 (x10)', 'Archivadores de plástico A4 x10', 55.00, 150, 40, 4),
('Calculadora Científica', 'Calculadora científica 240 funciones', 180.00, 40, 12, 4),
('Escritorio 1.5m', 'Escritorio melamina 1.5m', 650.00, 15, 5, 4),
('Silla Ergonómica', 'Silla oficina ergonómica', 480.00, 20, 6, 4),
('Monitor 24" LED', 'Monitor LED 24" Full HD', 320.00, 25, 8, 4),
('Teclado Mecánico', 'Teclado mecánico RGB', 280.00, 30, 10, 4),
('Mouse Inalámbrico', 'Mouse inalámbrico ergonómico', 95.00, 50, 15, 4),
('Impresora Láser', 'Impresora láser monocromática', 550.00, 10, 3, 4),

-- Repuestos (Proveedor 5)
('Rodamiento 6205', 'Rodamiento 6205-2RS', 85.00, 200, 50, 5),
('Correa V-Belt A', 'Correa V-belt tipo A', 45.00, 300, 80, 5),
('Filtro Aceite', 'Filtro aceite industrial', 65.00, 150, 40, 5),
('Bomba Hidráulica', 'Bomba hidráulica 12V', 450.00, 20, 6, 5),
('Motor 3HP', 'Motor eléctrico 3HP 220V', 1200.00, 8, 2, 5),
('Sensor Proximidad', 'Sensor inductivo PNP', 120.00, 60, 18, 5),
('Cilindro Neumático', 'Cilindro neumático 50mm', 280.00, 25, 8, 5),
('Válvula Solenoide', 'Válvula solenoide 24V DC', 150.00, 40, 12, 5),
('Engranaje 20 dientes', 'Engranaje acero 20 dientes', 95.00, 80, 25, 5),
('Cojinete Lineal', 'Cojinete lineal LM20UU', 75.00, 100, 30, 5);

-- ============================================
-- ALMACENES (6 almacenes)
-- ============================================
INSERT INTO almacenes (nombre, ubicacion, capacidad_total, coste_mensual_operacion) VALUES
('Almacén Central Norte', 'Zona Industrial Norte, Cd. México', 8000, 25000.00),
('Almacén Central Sur', 'Zona Industrial Sur, Cd. México', 6000, 20000.00),
('Almacén Monterrey', 'Parque Industrial Monterrey', 5000, 18000.00),
('Almacén Guadalajara', 'Zona Industrial Guadalajara', 4500, 16000.00),
('Almacén Puebla', 'Parque Logístico Puebla', 4000, 14000.00),
('Almacén Querétaro', 'Zona Industrial Querétaro', 3500, 12000.00);

-- ============================================
-- VEHÍCULOS (10 vehículos)
-- ============================================
INSERT INTO vehiculos (placa, modelo, capacidad_carga, coste_por_km, estado) VALUES
('ABC-123-4', 'Camión Volvo FH16', 25000.00, 3.20, 'activo'),
('DEF-456-7', 'Camión Mercedes Actros', 22000.00, 3.50, 'activo'),
('GHI-789-0', 'Camión Scania R450', 28000.00, 3.80, 'activo'),
('JKL-012-3', 'Camión MAN TGX', 20000.00, 3.00, 'activo'),
('MNO-345-6', 'Camión DAF XF', 18000.00, 2.90, 'activo'),
('PQR-678-9', 'Camión Iveco Stralis', 15000.00, 2.70, 'activo'),
('STU-901-2', 'Camión Renault T', 23000.00, 3.30, 'activo'),
('VWX-234-5', 'Camión Freightliner', 26000.00, 3.40, 'activo'),
('YZA-567-8', 'Camión International', 24000.00, 3.10, 'activo'),
('BCD-890-1', 'Camión Kenworth', 27000.00, 3.60, 'activo');

-- ============================================
-- INVENTARIOS (distribución de productos en almacenes)
-- ============================================
INSERT INTO inventarios (producto_id, almacen_id, cantidad, ubicacion_estanteria) VALUES
-- Almacén Central Norte (productos 1-20)
(1, 1, 25, 'A-01'), (2, 1, 60, 'A-02'), (3, 1, 40, 'A-03'), (4, 1, 30, 'A-04'), (5, 1, 100, 'A-05'),
(6, 1, 150, 'B-01'), (7, 1, 250, 'B-02'), (8, 1, 200, 'B-03'), (9, 1, 45, 'B-04'), (10, 1, 35, 'B-05'),
(11, 1, 75, 'C-01'), (12, 1, 100, 'C-02'), (13, 1, 400, 'C-03'), (14, 1, 25, 'C-04'), (15, 1, 20, 'C-05'),
(16, 1, 50, 'D-01'), (17, 1, 80, 'D-02'), (18, 1, 30, 'D-03'), (19, 1, 15, 'D-04'), (20, 1, 14, 'D-05'),

-- Almacén Central Sur (productos 21-40)
(21, 2, 12, 'A-01'), (22, 2, 10, 'A-02'), (23, 2, 15, 'A-03'), (24, 2, 20, 'A-04'), (25, 2, 15, 'A-05'),
(26, 2, 50, 'B-01'), (27, 2, 75, 'B-02'), (28, 2, 30, 'B-03'), (29, 2, 20, 'B-04'), (30, 2, 14, 'B-05'),
(31, 2, 18, 'C-01'), (32, 2, 20, 'C-02'), (33, 2, 12, 'C-03'), (34, 2, 10, 'C-04'), (35, 2, 8, 'C-05'),
(36, 2, 15, 'D-01'), (37, 2, 15, 'D-02'), (38, 2, 18, 'D-03'), (39, 2, 20, 'D-04'), (40, 2, 5, 'D-05'),

-- Almacén Monterrey (productos 41-50)
(41, 3, 100, 'A-01'), (42, 3, 150, 'A-02'), (43, 3, 80, 'A-03'), (44, 3, 30, 'A-04'), (45, 3, 25, 'A-05'),
(46, 3, 50, 'B-01'), (47, 3, 40, 'B-02'), (48, 3, 20, 'B-03'), (49, 3, 40, 'B-04'), (50, 3, 30, 'B-05'),

-- Distribución adicional en otros almacenes
(1, 3, 20, 'C-01'), (2, 3, 60, 'C-02'), (11, 3, 75, 'C-03'), (12, 3, 100, 'C-04'),
(1, 4, 15, 'A-01'), (2, 4, 40, 'A-02'), (21, 4, 38, 'A-03'), (22, 4, 30, 'A-04'),
(31, 5, 12, 'A-01'), (32, 5, 20, 'A-02'), (41, 5, 50, 'A-03'), (42, 5, 75, 'A-04'),
(1, 6, 10, 'A-01'), (2, 6, 30, 'A-02'), (41, 6, 40, 'A-03'), (42, 6, 60, 'A-04');

-- ============================================
-- ÓRDENES DE COMPRA (15 órdenes en los últimos 6 meses)
-- ============================================
INSERT INTO ordenes_compra (proveedor_id, fecha_emision, fecha_entrega_esperada, total, estado, usuario_registra_id) VALUES
(1, '2024-01-15 10:00:00', '2024-01-25', 12500.00, 'entregado', 2),
(2, '2024-02-01 09:30:00', '2024-02-15', 18500.00, 'entregado', 2),
(3, '2024-02-20 14:00:00', '2024-03-05', 22000.00, 'entregado', 2),
(4, '2024-03-10 11:00:00', '2024-03-25', 15000.00, 'entregado', 2),
(5, '2024-04-05 08:00:00', '2024-04-20', 28000.00, 'entregado', 2),
(6, '2024-04-25 13:00:00', '2024-05-10', 19500.00, 'entregado', 2),
(7, '2024-05-12 10:30:00', '2024-05-27', 24500.00, 'entregado', 2),
(8, '2024-06-01 09:00:00', '2024-06-15', 32000.00, 'en_transito', 2),
(9, '2024-06-10 14:30:00', '2024-06-25', 17500.00, 'en_almacen', 2),
(10, '2024-06-15 11:00:00', '2024-06-30', 21000.00, 'pendiente', 2),
(11, '2024-01-28 15:00:00', '2024-02-12', 16200.00, 'entregado', 3),
(12, '2024-03-05 10:00:00', '2024-03-20', 19800.00, 'entregado', 3),
(13, '2024-04-18 13:30:00', '2024-05-02', 23500.00, 'entregado', 3),
(14, '2024-05-22 09:00:00', '2024-06-05', 26800.00, 'entregado', 3),
(15, '2024-06-08 14:00:00', '2024-06-22', 19200.00, 'en_transito', 3);

-- ============================================
-- DETALLES DE COMPRA (productos en cada orden)
-- ============================================
INSERT INTO detalles_compra (orden_compra_id, producto_id, cantidad, precio_unitario, subtotal) VALUES
-- Orden 1 (Proveedor 1)
(1, 1, 20, 250.00, 5000.00), (1, 2, 30, 85.00, 2550.00), (1, 3, 25, 120.00, 3000.00), (1, 4, 20, 95.00, 1900.00),
-- Orden 2 (Proveedor 2)
(2, 11, 40, 180.00, 7200.00), (2, 12, 50, 85.00, 4250.00), (2, 13, 30, 220.00, 6600.00), (2, 14, 5, 350.00, 1750.00),
-- Orden 3 (Proveedor 3)
(3, 21, 15, 550.00, 8250.00), (3, 22, 10, 680.00, 6800.00), (3, 23, 20, 420.00, 8400.00),
-- Orden 4 (Proveedor 4)
(4, 31, 50, 75.00, 3750.00), (4, 32, 100, 45.00, 4500.00), (4, 33, 30, 55.00, 1650.00), (4, 34, 15, 180.00, 2700.00), (4, 35, 5, 650.00, 3250.00),
-- Orden 5 (Proveedor 5)
(5, 41, 50, 85.00, 4250.00), (5, 42, 100, 45.00, 4500.00), (5, 43, 30, 65.00, 1950.00), (5, 44, 5, 450.00, 2250.00), (5, 45, 10, 1200.00, 12000.00), (5, 46, 5, 280.00, 1400.00),
-- Orden 6 (Proveedor 1)
(6, 1, 30, 250.00, 7500.00), (6, 2, 40, 85.00, 3400.00), (6, 5, 50, 45.00, 2250.00), (6, 6, 60, 15.00, 900.00), (6, 7, 100, 8.00, 800.00),
-- Orden 7 (Proveedor 2)
(7, 11, 25, 180.00, 4500.00), (7, 12, 35, 85.00, 2975.00), (7, 13, 20, 220.00, 4400.00), (7, 15, 30, 450.00, 13500.00),
-- Orden 8 (Proveedor 3)
(8, 21, 20, 550.00, 11000.00), (8, 22, 15, 680.00, 10200.00), (8, 23, 25, 420.00, 10500.00),
-- Orden 9 (Proveedor 4)
(9, 31, 40, 75.00, 3000.00), (9, 32, 80, 45.00, 3600.00), (9, 33, 25, 55.00, 1375.00), (9, 36, 15, 650.00, 9750.00),
-- Orden 10 (Proveedor 5)
(10, 41, 40, 85.00, 3400.00), (10, 42, 80, 45.00, 3600.00), (10, 43, 25, 65.00, 1625.00), (10, 44, 8, 450.00, 3600.00), (10, 45, 12, 1200.00, 14400.00),
-- Orden 11 (Proveedor 1)
(11, 1, 25, 250.00, 6250.00), (11, 3, 30, 120.00, 3600.00), (11, 4, 25, 95.00, 2375.00), (11, 8, 50, 12.00, 600.00), (11, 9, 15, 55.00, 825.00),
-- Orden 12 (Proveedor 2)
(12, 11, 35, 180.00, 6300.00), (12, 12, 45, 85.00, 3825.00), (12, 14, 20, 350.00, 7000.00), (12, 16, 25, 120.00, 3000.00),
-- Orden 13 (Proveedor 3)
(13, 21, 18, 550.00, 9900.00), (13, 22, 12, 680.00, 8160.00), (13, 24, 20, 350.00, 7000.00),
-- Orden 14 (Proveedor 4)
(14, 31, 45, 75.00, 3375.00), (14, 32, 90, 45.00, 4050.00), (14, 35, 10, 650.00, 6500.00), (14, 36, 18, 480.00, 8640.00), (14, 37, 20, 280.00, 5600.00),
-- Orden 15 (Proveedor 5)
(15, 41, 35, 85.00, 2975.00), (15, 42, 70, 45.00, 3150.00), (15, 43, 22, 65.00, 1430.00), (15, 44, 6, 450.00, 2700.00), (15, 45, 15, 1200.00, 18000.00);

-- ============================================
-- COSTES DE ALMACENAMIENTO (6 meses de datos)
-- ============================================
INSERT INTO costes_almacenamiento (almacen_id, fecha, concepto, monto, tipo_gasto, usuario_registra_id) VALUES
-- Enero 2024
(1, '2024-01-05', 'Alquiler mensual', 25000.00, 'alquiler', 2),
(1, '2024-01-10', 'Mantenimiento equipo', 3500.00, 'mantenimiento', 2),
(1, '2024-01-15', 'Mano de obra extra', 4500.00, 'mano_obra', 2),
(1, '2024-01-20', 'Servicios (luz/agua)', 2800.00, 'servicios', 2),
(2, '2024-01-05', 'Alquiler mensual', 20000.00, 'alquiler', 2),
(2, '2024-01-12', 'Mantenimiento equipo', 2800.00, 'mantenimiento', 2),
(2, '2024-01-18', 'Mano de obra extra', 3200.00, 'mano_obra', 2),
(3, '2024-01-05', 'Alquiler mensual', 18000.00, 'alquiler', 2),
(3, '2024-01-15', 'Servicios (luz/agua)', 2200.00, 'servicios', 2),

-- Febrero 2024
(1, '2024-02-05', 'Alquiler mensual', 25000.00, 'alquiler', 2),
(1, '2024-02-12', 'Mantenimiento equipo', 4200.00, 'mantenimiento', 2),
(2, '2024-02-05', 'Alquiler mensual', 20000.00, 'alquiler', 2),
(2, '2024-02-18', 'Mano de obra extra', 3800.00, 'mano_obra', 2),
(3, '2024-02-05', 'Alquiler mensual', 18000.00, 'alquiler', 2),
(4, '2024-02-05', 'Alquiler mensual', 16000.00, 'alquiler', 2),
(4, '2024-02-15', 'Servicios (luz/agua)', 1900.00, 'servicios', 2),

-- Marzo 2024
(1, '2024-03-05', 'Alquiler mensual', 25000.00, 'alquiler', 2),
(1, '2024-03-10', 'Servicios (luz/agua)', 3100.00, 'servicios', 2),
(2, '2024-03-05', 'Alquiler mensual', 20000.00, 'alquiler', 2),
(2, '2024-03-15', 'Mantenimiento equipo', 3500.00, 'mantenimiento', 2),
(3, '2024-03-05', 'Alquiler mensual', 18000.00, 'alquiler', 2),
(4, '2024-03-05', 'Alquiler mensual', 16000.00, 'alquiler', 2),
(5, '2024-03-05', 'Alquiler mensual', 14000.00, 'alquiler', 2),

-- Abril 2024
(1, '2024-04-05', 'Alquiler mensual', 25000.00, 'alquiler', 2),
(1, '2024-04-12', 'Mantenimiento equipo', 4800.00, 'mantenimiento', 2),
(1, '2024-04-20', 'Mano de obra extra', 5200.00, 'mano_obra', 2),
(2, '2024-04-05', 'Alquiler mensual', 20000.00, 'alquiler', 2),
(3, '2024-04-05', 'Alquiler mensual', 18000.00, 'alquiler', 2),
(4, '2024-04-05', 'Alquiler mensual', 16000.00, 'alquiler', 2),
(5, '2024-04-05', 'Alquiler mensual', 14000.00, 'alquiler', 2),
(6, '2024-04-05', 'Alquiler mensual', 12000.00, 'alquiler', 2),

-- Mayo 2024
(1, '2024-05-05', 'Alquiler mensual', 25000.00, 'alquiler', 2),
(1, '2024-05-15', 'Servicios (luz/agua)', 3400.00, 'servicios', 2),
(2, '2024-05-05', 'Alquiler mensual', 20000.00, 'alquiler', 2),
(2, '2024-05-18', 'Mantenimiento equipo', 3900.00, 'mantenimiento', 2),
(3, '2024-05-05', 'Alquiler mensual', 18000.00, 'alquiler', 2),
(4, '2024-05-05', 'Alquiler mensual', 16000.00, 'alquiler', 2),
(5, '2024-05-05', 'Alquiler mensual', 14000.00, 'alquiler', 2),
(6, '2024-05-05', 'Alquiler mensual', 12000.00, 'alquiler', 2),

-- Junio 2024
(1, '2024-06-05', 'Alquiler mensual', 25000.00, 'alquiler', 2),
(1, '2024-06-12', 'Mantenimiento equipo', 5100.00, 'mantenimiento', 2),
(2, '2024-06-05', 'Alquiler mensual', 20000.00, 'alquiler', 2),
(3, '2024-06-05', 'Alquiler mensual', 18000.00, 'alquiler', 2),
(4, '2024-06-05', 'Alquiler mensual', 16000.00, 'alquiler', 2),
(5, '2024-06-05', 'Alquiler mensual', 14000.00, 'alquiler', 2),
(6, '2024-06-05', 'Alquiler mensual', 12000.00, 'alquiler', 2);

-- ============================================
-- COSTES DE TRANSPORTE (6 meses de datos)
-- ============================================
INSERT INTO costes_transporte (vehiculo_id, fecha, ruta_origen, ruta_destino, kilometros_recorridos, coste_combustible, coste_peajes, coste_mantenimiento, coste_conductor, usuario_registra_id) VALUES
-- Enero 2024
(1, '2024-01-18', 'Cd. México', 'Monterrey', 900.00, 2880.00, 450.00, 200.00, 1200.00, 2),
(2, '2024-01-22', 'Cd. México', 'Guadalajara', 550.00, 1925.00, 350.00, 180.00, 1100.00, 2),
(3, '2024-01-25', 'Monterrey', 'Cd. México', 900.00, 3060.00, 450.00, 220.00, 1300.00, 2),
(4, '2024-01-28', 'Guadalajara', 'Cd. México', 550.00, 1650.00, 350.00, 150.00, 1000.00, 2),

-- Febrero 2024
(1, '2024-02-05', 'Cd. México', 'Puebla', 130.00, 416.00, 100.00, 80.00, 500.00, 2),
(2, '2024-02-10', 'Puebla', 'Cd. México', 130.00, 455.00, 100.00, 90.00, 520.00, 2),
(3, '2024-02-15', 'Cd. México', 'Querétaro', 220.00, 748.00, 180.00, 110.00, 660.00, 2),
(5, '2024-02-20', 'Querétaro', 'Cd. México', 220.00, 638.00, 180.00, 100.00, 580.00, 2),

-- Marzo 2024
(1, '2024-03-08', 'Cd. México', 'Monterrey', 900.00, 2880.00, 450.00, 210.00, 1200.00, 2),
(2, '2024-03-12', 'Monterrey', 'Cd. México', 900.00, 3150.00, 450.00, 230.00, 1250.00, 2),
(3, '2024-03-18', 'Cd. México', 'Guadalajara', 550.00, 1925.00, 350.00, 185.00, 1100.00, 2),
(4, '2024-03-22', 'Guadalajara', 'Cd. México', 550.00, 1815.00, 350.00, 175.00, 1050.00, 2),
(6, '2024-03-25', 'Cd. México', 'Puebla', 130.00, 351.00, 100.00, 85.00, 480.00, 2),

-- Abril 2024
(1, '2024-04-05', 'Cd. México', 'Querétaro', 220.00, 704.00, 180.00, 105.00, 600.00, 2),
(2, '2024-04-10', 'Querétaro', 'Cd. México', 220.00, 770.00, 180.00, 115.00, 620.00, 2),
(3, '2024-04-15', 'Cd. México', 'Monterrey', 900.00, 2970.00, 450.00, 215.00, 1220.00, 2),
(5, '2024-04-20', 'Monterrey', 'Cd. México', 900.00, 2610.00, 450.00, 195.00, 1150.00, 2),
(7, '2024-04-25', 'Cd. México', 'Guadalajara', 550.00, 1815.00, 350.00, 175.00, 1050.00, 2),

-- Mayo 2024
(1, '2024-05-08', 'Guadalajara', 'Cd. México', 550.00, 1870.00, 350.00, 180.00, 1080.00, 2),
(2, '2024-05-12', 'Cd. México', 'Puebla', 130.00, 455.00, 100.00, 90.00, 520.00, 2),
(3, '2024-05-18', 'Puebla', 'Cd. México', 130.00, 416.00, 100.00, 80.00, 500.00, 2),
(4, '2024-05-22', 'Cd. México', 'Querétaro', 220.00, 748.00, 180.00, 110.00, 660.00, 2),
(6, '2024-05-28', 'Querétaro', 'Cd. México', 220.00, 704.00, 180.00, 105.00, 600.00, 2),

-- Junio 2024
(1, '2024-06-05', 'Cd. México', 'Monterrey', 900.00, 3060.00, 450.00, 220.00, 1300.00, 2),
(2, '2024-06-10', 'Monterrey', 'Cd. México', 900.00, 3150.00, 450.00, 230.00, 1250.00, 2),
(3, '2024-06-15', 'Cd. México', 'Guadalajara', 550.00, 1980.00, 350.00, 190.00, 1120.00, 2),
(5, '2024-06-18', 'Guadalajara', 'Cd. México', 550.00, 1815.00, 350.00, 175.00, 1050.00, 2),
(8, '2024-06-22', 'Cd. México', 'Puebla', 130.00, 442.00, 100.00, 88.00, 510.00, 2),
(9, '2024-06-25', 'Puebla', 'Cd. México', 130.00, 390.00, 100.00, 78.00, 480.00, 2);

-- ============================================
-- DISTRIBUCIONES (asociadas a órdenes de compra)
-- ============================================
INSERT INTO distribuciones (orden_compra_id, vehiculo_id, fecha_salida, fecha_entrega, estado, coste_total_transporte, usuario_registra_id) VALUES
(1, 1, '2024-01-20 08:00:00', '2024-01-22 16:00:00', 'entregado', 4730.00, 2),
(2, 2, '2024-02-08 09:00:00', '2024-02-10 14:00:00', 'entregado', 3925.00, 2),
(3, 3, '2024-02-25 07:30:00', '2024-02-27 18:00:00', 'entregado', 5030.00, 2),
(4, 4, '2024-03-15 10:00:00', '2024-03-17 15:00:00', 'entregado', 3275.00, 2),
(5, 1, '2024-04-12 08:30:00', '2024-04-14 17:00:00', 'entregado', 4839.00, 2),
(6, 2, '2024-05-02 09:00:00', '2024-05-04 16:00:00', 'entregado', 4085.00, 2),
(7, 3, '2024-05-20 07:00:00', '2024-05-22 18:30:00', 'entregado', 5165.00, 2),
(8, 1, '2024-06-08 08:00:00', NULL, 'en_transito', 5030.00, 2),
(9, 2, '2024-06-15 09:00:00', NULL, 'pendiente', 4730.00, 2),
(11, 4, '2024-02-05 10:00:00', '2024-02-07 15:00:00', 'entregado', 3275.00, 2),
(12, 5, '2024-03-10 08:30:00', '2024-03-12 17:00:00', 'entregado', 4428.00, 2),
(13, 6, '2024-04-20 09:00:00', '2024-04-22 16:00:00', 'entregado', 3390.00, 2),
(14, 7, '2024-05-25 07:30:00', '2024-05-27 18:00:00', 'entregado', 3390.00, 2),
(15, 1, '2024-06-12 08:00:00', NULL, 'en_transito', 5030.00, 2);

-- ============================================
-- COSTES LOGÍSTICOS TOTALES (resumen mensual)
-- ============================================
INSERT INTO costes_logisticos_totales (operacion_referencia, tipo_operacion, fecha, monto_total, desglose_json) VALUES
('OC-001-2024-01', 'compra', '2024-01-15', 12500.00, '{"productos": 12500.00, "transporte": 0.00, "almacenamiento": 0.00}'::jsonb),
('OC-002-2024-02', 'compra', '2024-02-01', 18500.00, '{"productos": 18500.00, "transporte": 0.00, "almacenamiento": 0.00}'::jsonb),
('OC-003-2024-02', 'compra', '2024-02-20', 22000.00, '{"productos": 22000.00, "transporte": 0.00, "almacenamiento": 0.00}'::jsonb),
('ALM-CENTRAL-2024-01', 'almacenamiento', '2024-01-31', 35800.00, '{"alquiler": 25000.00, "mantenimiento": 3500.00, "mano_obra": 4500.00, "servicios": 2800.00}'::jsonb),
('ALM-SUR-2024-01', 'almacenamiento', '2024-01-31', 26000.00, '{"alquiler": 20000.00, "mantenimiento": 2800.00, "mano_obra": 3200.00}'::jsonb),
('TRANS-MTY-2024-01', 'transporte', '2024-01-18', 4730.00, '{"combustible": 2880.00, "peajes": 450.00, "mantenimiento": 200.00, "conductor": 1200.00}'::jsonb),
('OC-004-2024-03', 'compra', '2024-03-10', 15000.00, '{"productos": 15000.00, "transporte": 0.00, "almacenamiento": 0.00}'::jsonb),
('OC-005-2024-04', 'compra', '2024-04-05', 28000.00, '{"productos": 28000.00, "transporte": 0.00, "almacenamiento": 0.00}'::jsonb),
('ALM-TOTAL-2024-04', 'almacenamiento', '2024-04-30', 121000.00, '{"almacen_central": 35000.00, "almacen_sur": 20000.00, "monterrey": 18000.00, "guadalajara": 16000.00, "puebla": 14000.00, "queretaro": 12000.00, "mano_obra_extra": 5200.00, "mantenimiento": 4800.00}'::jsonb),
('TRANS-TOTAL-2024-04', 'transporte', '2024-04-30', 11884.00, '{"combustible": 7299.00, "peajes": 1510.00, "mantenimiento": 700.00, "conductor": 4375.00}'::jsonb),
('OC-006-2024-05', 'compra', '2024-05-12', 24500.00, '{"productos": 24500.00, "transporte": 0.00, "almacenamiento": 0.00}'::jsonb),
('OC-007-2024-06', 'compra', '2024-06-01', 32000.00, '{"productos": 32000.00, "transporte": 0.00, "almacenamiento": 0.00}'::jsonb),
('ALM-TOTAL-2024-06', 'almacenamiento', '2024-06-30', 117100.00, '{"almacen_central": 30100.00, "almacen_sur": 20000.00, "monterrey": 18000.00, "guadalajara": 16000.00, "puebla": 14000.00, "queretaro": 12000.00, "mantenimiento": 5100.00}'::jsonb),
('TRANS-TOTAL-2024-06', 'transporte', '2024-06-30', 12887.00, '{"combustible": 7837.00, "peajes": 1530.00, "mantenimiento": 781.00, "conductor": 4739.00}'::jsonb);

-- ============================================
-- ALERTAS DE SOBRECOSTES (simuladas)
-- ============================================
INSERT INTO alertas_sobrecostes (fecha, tipo, monto_esperado, monto_real, diferencia, estado, operacion_referencia, usuario_notificado_id) VALUES
('2024-02-20 10:00:00', 'almacenamiento', 25000.00, 32800.00, 7800.00, 'resuelta', 'ALM-CENTRAL-2024-02', 3),
('2024-03-15 14:30:00', 'transporte', 3000.00, 5030.00, 2030.00, 'resuelta', 'TRANS-MTY-2024-03', 3),
('2024-04-25 09:00:00', 'compra', 20000.00, 28000.00, 8000.00, 'activa', 'OC-005-2024-04', 3),
('2024-05-18 11:00:00', 'almacenamiento', 20000.00, 27800.00, 7800.00, 'resuelta', 'ALM-SUR-2024-05', 3),
('2024-06-10 16:00:00', 'transporte', 4000.00, 5030.00, 1030.00, 'activa', 'TRANS-CDMX-2024-06', 3),
('2024-06-15 10:30:00', 'compra', 28000.00, 32000.00, 4000.00, 'activa', 'OC-007-2024-06', 3);

-- ============================================
-- AUDITORÍAS (registro de cambios)
-- ============================================
DELETE FROM auditorias;
INSERT INTO auditorias (usuario_id, accion, tabla_afectada, registro_id, fecha_cambio, datos_anteriores_json) VALUES
(2, 'INSERT', 'proveedores', 1, '2024-01-10 09:00:00', NULL::jsonb),
(2, 'INSERT', 'productos', 1, '2024-01-10 10:00:00', NULL::jsonb),
(2, 'INSERT', 'ordenes_compra', 1, '2024-01-15 10:00:00', NULL::jsonb),
(2, 'UPDATE', 'ordenes_compra', 1, '2024-01-22 16:00:00', '{"estado": "pendiente"}'::jsonb),
(2, 'INSERT', 'costes_almacenamiento', 1, '2024-01-05 08:00:00', NULL::jsonb),
(2, 'INSERT', 'costes_transporte', 1, '2024-01-18 18:00:00', NULL::jsonb),
(3, 'INSERT', 'ordenes_compra', 11, '2024-01-28 15:00:00', NULL::jsonb),
(3, 'UPDATE', 'ordenes_compra', 11, '2024-02-07 15:00:00', '{"estado": "en_transito"}'::jsonb),
(2, 'INSERT', 'alertas_sobrecostes', 1, '2024-02-20 10:00:00', NULL::jsonb),
(3, 'UPDATE', 'alertas_sobrecostes', 1, '2024-02-25 14:00:00', '{"estado": "activa"}'::jsonb),
(2, 'INSERT', 'distribuciones', 1, '2024-01-20 08:00:00', NULL::jsonb),
(2, 'UPDATE', 'distribuciones', 1, '2024-01-22 16:00:00', '{"estado": "en_transito"}'::jsonb),
(2, 'INSERT', 'inventarios', 1, '2024-01-10 11:00:00', NULL::jsonb),
(2, 'UPDATE', 'inventarios', 1, '2024-01-25 12:00:00', '{"cantidad": 0}'::jsonb),
(3, 'INSERT', 'costes_logisticos_totales', 1, '2024-01-31 17:00:00', NULL::jsonb),
(2, 'INSERT', 'vehiculos', 1, '2024-01-05 09:00:00', NULL::jsonb),
(2, 'UPDATE', 'vehiculos', 1, '2024-03-01 10:00:00', '{"estado": "activo"}'::jsonb),
(3, 'INSERT', 'almacenes', 1, '2024-01-05 08:00:00', NULL::jsonb);

-- ============================================
-- CONFIGURACIÓN ACTUALIZADA
-- ============================================
DELETE FROM configuracion;
INSERT INTO configuracion (clave, valor, descripcion) VALUES
('umbral_sobrecoste_almacenamiento', '20', 'Porcentaje de sobrecoste para alertas de almacenamiento'),
('umbral_sobrecoste_transporte', '25', 'Porcentaje de sobrecoste para alertas de transporte'),
('umbral_sobrecoste_compra', '15', 'Porcentaje de sobrecoste para alertas de compra'),
('coste_estandar_km', '3.00', 'Coste estándar por kilómetro de transporte'),
('coste_estandar_almacenamiento_hora', '55.00', 'Coste estándar por hora de almacenamiento'),
('presupuesto_mensual_almacenamiento', '100000.00', 'Presupuesto mensual para almacenamiento'),
('presupuesto_mensual_transporte', '15000.00', 'Presupuesto mensual para transporte'),
('presupuesto_mensual_compras', '50000.00', 'Presupuesto mensual para compras'),
('alerta_stock_bajo_porcentaje', '30', 'Porcentaje de stock mínimo para alertas'),
('tiempo_entrega_esperado_dias', '10', 'Días esperados para entrega de órdenes');

-- ============================================
-- ACTUALIZACIÓN DE STOCK EN PRODUCTOS (basado en órdenes entregadas)
-- ============================================
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 1; -- Orden 1
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 2;
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 3;
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 4;
UPDATE productos SET stock_actual = stock_actual + 40 WHERE id = 11; -- Orden 2
UPDATE productos SET stock_actual = stock_actual + 50 WHERE id = 12;
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 13;
UPDATE productos SET stock_actual = stock_actual + 5 WHERE id = 14;
UPDATE productos SET stock_actual = stock_actual + 15 WHERE id = 21; -- Orden 3
UPDATE productos SET stock_actual = stock_actual + 10 WHERE id = 22;
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 23;
UPDATE productos SET stock_actual = stock_actual + 50 WHERE id = 31; -- Orden 4
UPDATE productos SET stock_actual = stock_actual + 100 WHERE id = 32;
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 33;
UPDATE productos SET stock_actual = stock_actual + 15 WHERE id = 34;
UPDATE productos SET stock_actual = stock_actual + 5 WHERE id = 35;
UPDATE productos SET stock_actual = stock_actual + 50 WHERE id = 41; -- Orden 5
UPDATE productos SET stock_actual = stock_actual + 100 WHERE id = 42;
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 43;
UPDATE productos SET stock_actual = stock_actual + 5 WHERE id = 44;
UPDATE productos SET stock_actual = stock_actual + 10 WHERE id = 45;
UPDATE productos SET stock_actual = stock_actual + 5 WHERE id = 46;
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 1; -- Orden 6
UPDATE productos SET stock_actual = stock_actual + 40 WHERE id = 2;
UPDATE productos SET stock_actual = stock_actual + 50 WHERE id = 5;
UPDATE productos SET stock_actual = stock_actual + 60 WHERE id = 6;
UPDATE productos SET stock_actual = stock_actual + 100 WHERE id = 7;
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 11; -- Orden 7
UPDATE productos SET stock_actual = stock_actual + 35 WHERE id = 12;
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 13;
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 15;
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 1; -- Orden 11
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 3;
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 4;
UPDATE productos SET stock_actual = stock_actual + 50 WHERE id = 8;
UPDATE productos SET stock_actual = stock_actual + 15 WHERE id = 9;
UPDATE productos SET stock_actual = stock_actual + 35 WHERE id = 11; -- Orden 12
UPDATE productos SET stock_actual = stock_actual + 45 WHERE id = 12;
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 14;
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 16;
UPDATE productos SET stock_actual = stock_actual + 18 WHERE id = 21; -- Orden 13
UPDATE productos SET stock_actual = stock_actual + 12 WHERE id = 22;
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 24;
UPDATE productos SET stock_actual = stock_actual + 45 WHERE id = 31; -- Orden 14
UPDATE productos SET stock_actual = stock_actual + 90 WHERE id = 32;
UPDATE productos SET stock_actual = stock_actual + 10 WHERE id = 35;
UPDATE productos SET stock_actual = stock_actual + 18 WHERE id = 36;
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 37;
UPDATE productos SET stock_actual = stock_actual + 35 WHERE id = 41; -- Orden 15
UPDATE productos SET stock_actual = stock_actual + 70 WHERE id = 42;
UPDATE productos SET stock_actual = stock_actual + 22 WHERE id = 43;
UPDATE productos SET stock_actual = stock_actual + 6 WHERE id = 44;
UPDATE productos SET stock_actual = stock_actual + 15 WHERE id = 45;
UPDATE productos SET stock_actual = stock_actual + 15 WHERE id = 1; -- Orden 16
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 2;
UPDATE productos SET stock_actual = stock_actual + 40 WHERE id = 5;
UPDATE productos SET stock_actual = stock_actual + 50 WHERE id = 6;
UPDATE productos SET stock_actual = stock_actual + 30 WHERE id = 11; -- Orden 17
UPDATE productos SET stock_actual = stock_actual + 40 WHERE id = 12;
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 13;
UPDATE productos SET stock_actual = stock_actual + 25 WHERE id = 15;
UPDATE productos SET stock_actual = stock_actual + 22 WHERE id = 21; -- Orden 18
UPDATE productos SET stock_actual = stock_actual + 18 WHERE id = 22;
UPDATE productos SET stock_actual = stock_actual + 15 WHERE id = 23;
UPDATE productos SET stock_actual = stock_actual + 35 WHERE id = 31; -- Orden 19
UPDATE productos SET stock_actual = stock_actual + 70 WHERE id = 32;
UPDATE productos SET stock_actual = stock_actual + 20 WHERE id = 33;
UPDATE productos SET stock_actual = stock_actual + 12 WHERE id = 34;
UPDATE productos SET stock_actual = stock_actual + 8 WHERE id = 35;
UPDATE productos SET stock_actual = stock_actual + 45 WHERE id = 41; -- Orden 20
UPDATE productos SET stock_actual = stock_actual + 85 WHERE id = 42;
UPDATE productos SET stock_actual = stock_actual + 28 WHERE id = 43;
UPDATE productos SET stock_actual = stock_actual + 7 WHERE id = 44;
UPDATE productos SET stock_actual = stock_actual + 14 WHERE id = 45;

-- ============================================
-- FIN DEL SCRIPT DE SIMULACIÓN
-- ============================================
