const db = require('./config/database');

async function fixNullDates() {
    try {
        console.log('🔧 Corrigiendo fechas nulas...');
        await db('UPDATE tareas SET fecha_creacion = NOW() WHERE fecha_creacion IS NULL');
        console.log('✅ Fechas corregidas.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

fixNullDates();
