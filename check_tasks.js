const db = require('./config/database');

async function checkTasks() {
    try {
        console.log('🔍 Buscando tareas en la BD...');
        const [rows] = await db('SELECT id, titulo, estado, fecha_creacion FROM tareas');
        console.log(`📊 Encontradas ${rows.length} tareas:`);
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

checkTasks();
