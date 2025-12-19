const { db } = require('./config/database');

const seed = async () => {
    try {
        console.log('Iniciando carga de datos de prueba...');

        // Desactivar FK checks
        await db('SET FOREIGN_KEY_CHECKS = 0');

        // Limpiar tablas
        console.log('Limpiando tablas...');
        await db('TRUNCATE TABLE transacciones');
        await db('TRUNCATE TABLE tareas');
        await db('TRUNCATE TABLE proyectos');
        await db('TRUNCATE TABLE entidades');
        await db('TRUNCATE TABLE categorias');

        // Reactivar FK checks
        await db('SET FOREIGN_KEY_CHECKS = 1');

        // 1. Categorías
        console.log('Insertando Categorías...');
        const categorias = [
            { nombre: 'Desarrollo', tipo: 'salida' },
            { nombre: 'Marketing', tipo: 'salida' },
            { nombre: 'Infraestructura', tipo: 'salida' },
            { nombre: 'Ventas', tipo: 'entrada' },
            { nombre: 'Inversión', tipo: 'entrada' },
            { nombre: 'Consultoría', tipo: 'entrada' },
            { nombre: 'Oficina', tipo: 'salida' },
            { nombre: 'Nómina', tipo: 'salida' }
        ];

        const catIds = [];
        for (const cat of categorias) {
            const [res] = await db('INSERT INTO categorias (nombre, tipo) VALUES (?, ?)', [cat.nombre, cat.tipo]);
            catIds.push({ id: res.insertId, type: cat.tipo });
        }

        // 2. Proyectos
        console.log('Insertando Proyectos...');
        const proyectos = [
            'Website Corporativo', 'App Móvil iOS', 'Plataforma E-commerce',
            'Campaña Verano', 'Migración Cloud', 'Auditoría Interna'
        ];
        const proyIds = [];
        for (const p of proyectos) {
            // Asumiendo tabla proyectos tiene nombre, descripcion, estado, fecha_inicio - ajusta según esquema real
            // Si no tienes el esquema exacto de proyectos, usaré lo básico o verificaré si falla.
            // Basado en interacciones previas, proyectos tiene: nombre, descripcion, estado
            const [res] = await db("INSERT INTO proyectos (nombre, descripcion, estado, fecha_inicio) VALUES (?, 'Proyecto de prueba', 'activo', NOW())", [p]);
            proyIds.push(res.insertId);
        }

        // 3. Entidades
        console.log('Insertando Entidades...');
        const entidades = [
            { nombre: 'TechSolutions Inc', tipo: 'proveedor' },
            { nombre: 'Global Corp', tipo: 'cliente' },
            { nombre: 'Amazon AWS', tipo: 'proveedor' },
            { nombre: 'Cliente Final A', tipo: 'cliente' },
            { nombre: 'Consultora XYZ', tipo: 'proveedor' },
            { nombre: 'Freelancer Juan', tipo: 'empleado' }
        ];
        const entIds = [];
        for (const e of entidades) {
            // Ajusta columnas según tu esquema real de entidades
            const [res] = await db("INSERT INTO entidades (nombre, tipo, email, telefono) VALUES (?, ?, 'test@test.com', '123456789')", [e.nombre, e.tipo]);
            entIds.push(res.insertId);
        }

        // 4. Tareas (30 tareas)
        console.log('Insertando Tareas...');
        const estadosTarea = ['pendiente', 'en_progreso', 'revision', 'completado'];
        const prioridades = ['alta', 'media', 'baja'];
        const tareaIds = [];

        for (let i = 1; i <= 30; i++) {
            const estado = estadosTarea[Math.floor(Math.random() * estadosTarea.length)];
            const prioridad = prioridades[Math.floor(Math.random() * prioridades.length)];
            const proyId = proyIds[Math.floor(Math.random() * proyIds.length)];
            // Categoria aleatoria (cualquiera)
            const cat = catIds[Math.floor(Math.random() * catIds.length)];

            // Generar fecha aleatoria en los últimos 30 días
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 30));
            const dateStr = date.toISOString().slice(0, 19).replace('T', ' ');

            const [res] = await db(
                `INSERT INTO tareas (titulo, descripcion, proyecto_id, estado, prioridad, categoria_id, fecha_creacion, fecha_vencimiento) 
             VALUES (?, ?, ?, ?, ?, ?, ?, DATE_ADD(?, INTERVAL 7 DAY))`,
                [
                    `Tarea Prueba ${i}`,
                    `Descripción detallada para la tarea de prueba número ${i}. Verificar funcionamiento.`,
                    proyId,
                    estado,
                    prioridad,
                    cat.id,
                    dateStr,
                    dateStr
                ]
            );
            tareaIds.push(res.insertId);
        }

        // 5. Transacciones (70 transacciones)
        console.log('Insertando Transacciones...');
        for (let i = 1; i <= 70; i++) {
            const isEntrada = Math.random() > 0.6; // 40% entradas, 60% salidas
            const tipo = isEntrada ? 'entrada' : 'salida';

            // Filtrar categorias por tipo
            const catsDelTipo = catIds.filter(c => c.type === tipo);
            const cat = catsDelTipo[Math.floor(Math.random() * catsDelTipo.length)];

            const entidad = entIds[Math.floor(Math.random() * entIds.length)];
            const monto = (Math.random() * 1000 + 50).toFixed(2);

            // Asignar tarea aleatoria solo al 50% de las transacciones para probar mixed state
            const tareaId = Math.random() > 0.5 ? tareaIds[Math.floor(Math.random() * tareaIds.length)] : null;

            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 60)); // Ultimos 60 dias
            const dateStr = date.toISOString().slice(0, 10);

            await db(
                `INSERT INTO transacciones (tipo, monto, descripcion, categoria_id, entidad_id, tarea_id, fecha_transaccion) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    tipo,
                    monto,
                    `Movimiento contable #${i} - ${tipo}`,
                    cat.id,
                    entidad,
                    tareaId,
                    dateStr
                ]
            );
        }

        console.log('¡Datos de prueba cargados exitosamente!');
        console.log(`- ${categorias.length} Categorías`);
        console.log(`- ${proyectos.length} Proyectos`);
        console.log(`- ${entidades.length} Entidades`);
        console.log(`- 30 Tareas`);
        console.log(`- 70 Transacciones`);

        process.exit(0);

    } catch (error) {
        console.error('Error al cargar datos:', error);
        process.exit(1);
    }
};

seed();
