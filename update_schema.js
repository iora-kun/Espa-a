const db = require('./config/database');

async function updateSchema() {
    try {
        console.log('🏗️ Actualizando esquema de base de datos...');

        // Verificar si la columna ya existe
        const columns = await db('SHOW COLUMNS FROM tareas LIKE "categoria_id"');



        if (columns.length === 0) {
            console.log('📝 Agregando columna categoria_id a la tabla tareas...');
            await db(`
                ALTER TABLE tareas 
                ADD COLUMN categoria_id INT DEFAULT NULL,
                ADD CONSTRAINT fk_tarea_categoria 
                FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
                ON DELETE SET NULL
            `);
            console.log('✅ Columna agregada exitosamente.');
        } else {
            console.log('ℹ️ La columna categoria_id ya existe en tareas.');
        }

        // Verificar si la columna existe en transacciones
        const columnsTransacciones = await db('SHOW COLUMNS FROM transacciones LIKE "categoria_id"');

        if (columnsTransacciones.length === 0) {
            console.log('📝 Agregando columna categoria_id a la tabla transacciones...');
            await db(`
                ALTER TABLE transacciones 
                ADD COLUMN categoria_id INT DEFAULT NULL,
                ADD CONSTRAINT fk_transaccion_categoria 
                FOREIGN KEY (categoria_id) REFERENCES categorias(id) 
                ON DELETE SET NULL
            `);
            console.log('✅ Columna agregada exitosamente a transacciones.');
        } else {
            console.log('ℹ️ La columna categoria_id ya existe en transacciones.');
        }

        console.log('✅ Actualización de esquema completada.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error actualizando esquema:', error);
        process.exit(1);
    }
}

updateSchema();
