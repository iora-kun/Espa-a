const db = require('./config/database');

async function createTable() {
    try {
        console.log('🏗️ Creando tabla categorias...');

        await db(`
            CREATE TABLE IF NOT EXISTS categorias (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                tipo ENUM('entrada', 'salida') NOT NULL,
                descripcion TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insertar categorías por defecto si está vacía
        const [rows] = await db('SELECT COUNT(*) as count FROM categorias');
        if (rows && rows.count === 0) {
            console.log('🌱 Insertando categorías iniciales...');
            const iniciales = [
                ['Servicios', 'entrada'],
                ['Ventas', 'entrada'],
                ['Consultoría', 'entrada'],
                ['Tecnología', 'salida'],
                ['Suministros', 'salida'],
                ['Servicios Básicos', 'salida'],
                ['Alimentación', 'salida'],
                ['Movilización', 'salida'],
                ['Marketing', 'salida'],
                ['Nómina', 'salida']
            ];

            for (const [nombre, tipo] of iniciales) {
                await db('INSERT INTO categorias (nombre, tipo) VALUES (?, ?)', [nombre, tipo]);
            }
        }

        console.log('✅ Tabla categorias lista.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error creando tabla:', error);
        process.exit(1);
    }
}

createTable();
