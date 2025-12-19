const db = require('../config/database');

const entidades = [
    ['Juan Pérez', 'persona', 'juan.perez@email.com', '0991234567', '1711223344', 'Av. Amazonas y Naciones Unidas'],
    ['Empresa XYZ S.A.', 'empresa', 'contacto@xyz.com', '022233445', '1799887766001', 'Parque Empresarial Colón'],
    ['María González', 'persona', 'maria.gonzalez@email.com', '0987654321', '1755667788', 'Calle Larga 123'],
    ['Servicios Tech Ltda.', 'empresa', 'ventas@stech.com', '022998877', '1790011223001', 'Edificio Torre 1, Oficina 302'],
    ['Ministerio de Finanzas', 'organismo', 'info@finanzas.gob', '023999999', '1760001000001', 'Plataforma Gubernamental'],
    ['Carlos Ruiz', 'persona', 'carlos.ruiz@email.com', '0998877665', '1712345678', 'Av. 6 de Diciembre'],
    ['Inmobiliaria El Sol', 'empresa', 'admin@elsol.com', '022556677', '1792233445001', 'Cumbayá, Paseo San Francisco'],
    ['Ana López', 'persona', 'ana.lopez@email.com', '0981122334', '1722334455', 'La Mariscal, Calle Roca'],
    ['Constructora V&V', 'empresa', 'proyectos@vv.com', '022445566', '1791122334001', 'Av. Eloy Alfaro y Rep. El Salvador'],
    ['Roberto Díaz', 'persona', 'roberto.diaz@email.com', '0995544332', '1719876543', 'Quito Tenis'],
];

const proyectos = [
    ['Implementación ERP', 'Implementación de sistema contable para cliente XYZ', '2024-01-15', '2024-06-30', 'en_progreso', 15000.00],
    ['Campaña Marketing Q1', 'Campaña digital para redes sociales', '2024-01-01', '2024-03-31', 'completado', 5000.00],
    ['Auditoría Interna 2023', 'Revisión de procesos contables del año anterior', '2024-02-01', '2024-02-28', 'completado', 2500.00],
    ['Desarrollo Web E-commerce', 'Tienda en línea para venta de productos', '2024-03-01', '2024-08-31', 'en_progreso', 8000.00],
    ['Consultoría Fiscal', 'Asesoría tributaria mensual', '2024-01-01', '2024-12-31', 'en_progreso', 1200.00],
    ['Remodelación Oficina', 'Adecuaciones físicas en oficina central', '2024-04-01', '2024-05-15', 'pendiente', 10000.00],
    ['Capacitación Personal', 'Taller de liderazgo y trabajo en equipo', '2024-05-20', '2024-05-22', 'pendiente', 1500.00],
    ['Mantenimiento Equipos', 'Mantenimiento preventivo de computadoras', '2024-02-15', '2024-02-20', 'completado', 800.00],
];

const tareas = [
    ['Reunión inicial', 'Definición de alcance y objetivos', '2024-01-15', 'alta', 'completado'],
    ['Diseño de base de datos', 'Modelado entidad-relación', '2024-01-20', 'alta', 'completado'],
    ['Desarrollo módulo ventas', 'API y Frontend de ventas', '2024-03-15', 'alta', 'en_progreso'],
    ['Pruebas unitarias', 'Testing de componentes críticos', '2024-04-10', 'media', 'pendiente'],
    ['Diseño creatividades', 'Banners y posts para RRSS', '2024-01-05', 'media', 'completado'],
    ['Configuración pauta', 'Setup de Facebook Ads', '2024-01-10', 'alta', 'completado'],
    ['Revisión facturas enero', 'Validación de comprobantes', '2024-02-05', 'media', 'completado'],
    ['Informe auditoría', 'Redacción de hallazgos', '2024-02-25', 'alta', 'completado'],
    ['Wireframes web', 'Diseño UX/UI de la tienda', '2024-03-05', 'media', 'completado'],
    ['Integración pasarela', 'Setup de pagos con tarjeta', '2024-04-20', 'alta', 'pendiente'],
    ['Declaración IVA', 'Presentación formulario 104', '2024-02-15', 'alta', 'completado'],
    ['Cotización proveedores', 'Búsqueda de materiales construcción', '2024-04-05', 'media', 'pendiente'],
];

const transacciones = [
    // [tipo, monto, descripcion, categoria, fecha, entidad_index check]
    ['entrada', 5000.00, 'Anticipo Proyecto ERP', 'Servicios', '2024-01-16', 1],
    ['salida', 1200.00, 'Pago Licencias Software', 'Tecnología', '2024-01-20', 3],
    ['entrada', 2500.00, 'Pago Campaña Marketing', 'Servicios', '2024-02-01', 1],
    ['salida', 500.00, 'Compra suministros oficina', 'Suministros', '2024-02-05', 6],
    ['entrada', 1200.00, 'Pago mensualidad consultoría', 'Consultoría', '2024-02-10', 0],
    ['salida', 300.00, 'Pago servicio internet', 'Servicios Básicos', '2024-02-15', 3],
    ['entrada', 4000.00, 'Pago hito 1 Web E-commerce', 'Desarrollo', '2024-03-15', 8],
    ['salida', 150.00, 'Almuerzo equipo proyecto', 'Alimentación', '2024-03-20', 6],
    ['salida', 2000.00, 'Pago honorarios externos', 'Honorarios', '2024-03-25', 5],
    ['entrada', 1200.00, 'Pago mensualidad consultoría mar', 'Consultoría', '2024-03-10', 0],
    ['salida', 80.00, 'Transporte reuniones', 'Movilización', '2024-01-18', 6],
    ['entrada', 800.00, 'Pago mantenimiento equipos', 'Soporte', '2024-02-22', 7],
    ['salida', 100.00, 'Publicidad Facebook', 'Marketing', '2024-01-15', 1],
    ['salida', 4500.00, 'Compra servidores', 'Activos Fijos', '2024-02-28', 3],
    ['entrada', 10000.00, 'Inyección capital socios', 'Capital', '2024-01-02', 0],
];

async function seed() {
    console.log('🌱 Iniciando seeding...');

    try {
        console.log('Limpiando tablas...');
        // Desactivar FK checks para limpiar
        await db('SET FOREIGN_KEY_CHECKS = 0');
        await db('TRUNCATE TABLE transacciones');
        await db('TRUNCATE TABLE tareas');
        await db('TRUNCATE TABLE proyectos');
        await db('TRUNCATE TABLE entidades');
        await db('SET FOREIGN_KEY_CHECKS = 1');

        console.log('Insertando Entidades...');
        const entidadIds = [];
        for (const ent of entidades) {
            const result = await db('INSERT INTO entidades (nombre, tipo, email, telefono, ruc_ci, direccion) VALUES (?, ?, ?, ?, ?, ?)', ent);
            // Cuando db devuelve [result], accedemos a result.insertId
            // Si db es `execute`, devuelve result directamente. Ajustamos según `database.js`
            // `execute` devuelve `results` que es un objeto con insertId
            const insertId = result.insertId || result[0]?.insertId;
            entidadIds.push(insertId);
        }

        console.log('Insertando Proyectos...');
        const proyectoIds = [];
        for (const pro of proyectos) {
            const result = await db('INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, estado, presupuesto) VALUES (?, ?, ?, ?, ?, ?)', pro);
            const insertId = result.insertId || result[0]?.insertId;
            proyectoIds.push(insertId);
        }

        console.log('Insertando Tareas...');
        let i = 0;
        for (const tar of tareas) {
            const proyectoId = proyectoIds[i % proyectoIds.length]; // Asignar cíclicamente
            const result = await db('INSERT INTO tareas (titulo, descripcion, fecha_vencimiento, prioridad, estado, proyecto_id) VALUES (?, ?, ?, ?, ?, ?)', [...tar, proyectoId]);
            i++;
        }

        console.log('Insertando Transacciones...');
        let j = 0;
        for (const tra of transacciones) {
            const [tipo, monto, descripcion, categoria, fecha, entidadIdx] = tra;
            // Verificar si tenemos un ID de entidad válido
            const entidadId = entidadIds[entidadIdx] ? entidadIds[entidadIdx] : null;

            // Asignar proyecto aleatorio o null
            const proyectoId = Math.random() > 0.5 ? proyectoIds[Math.floor(Math.random() * proyectoIds.length)] : null;

            await db('INSERT INTO transacciones (tipo, monto, descripcion, categoria, fecha_transaccion, entidad_id, proyecto_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [tipo, monto, descripcion, categoria, fecha, entidadId, proyectoId]);
            j++;
        }

        console.log('✅ Seeding completado exitosamente.');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error en seeding:', error);
        process.exit(1);
    }
}

seed();
