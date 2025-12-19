const db = require('./config/database');

async function updateSchemaRelations() {
    try {
        console.log('🔗 Actualizando esquema para relación Transacción-Tarea...');

        // Verificar si la columna ya existe
        const columns = await db('SHOW COLUMNS FROM transacciones LIKE "tarea_id"');

        if (columns.length === 0) {
            console.log('📝 Agregando columna tarea_id a transacciones...');
            await db(`
                ALTER TABLE transacciones 
                ADD COLUMN tarea_id INT DEFAULT NULL,
                ADD CONSTRAINT fk_transaccion_tarea 
                FOREIGN KEY (tarea_id) REFERENCES tareas(id) 
                ON DELETE SET NULL
            `);
            console.log('✅ Columna tarea_id agregada exitosamente.');
        } else {
            console.log('ℹ️ La columna tarea_id ya existe.');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

updateSchemaRelations();
