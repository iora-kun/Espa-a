const db = require('./config/database');

async function fixSchema() {
    try {
        console.log('🔧 Verificando esquema de tabla tareas...');

        // 1. Verificar columna fecha_creacion
        const columns = await db('SHOW COLUMNS FROM tareas LIKE "fecha_creacion"');

        if (columns.length === 0) {
            console.log('📝 Agregando columna fecha_creacion...');
            await db(`
                ALTER TABLE tareas 
                ADD COLUMN fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            `);
            console.log('✅ Columna fecha_creacion agregada.');
        } else {
            console.log('info: La columna fecha_creacion ya existe.');
        }

        console.log('✅ Verificación completada.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

fixSchema();
