const db = require('./config/database');

async function inspectSchema() {
    try {
        console.log('🔍 Inspeccionando esquema tareas...');
        const rows = await db('DESCRIBE tareas');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

inspectSchema();
