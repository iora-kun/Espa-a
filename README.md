# Backend - Sistema Kanban Contable

Sistema de gestión contable basado en metodología Kanban desarrollado con Node.js, Express y MySQL.

## Estructura del Proyecto

```
Backend/
├── src/
│   ├── app.js              # Configuración principal de Express
│   └── config/
│       └── database.js     # Configuración de conexión a MySQL
├── routes/                 # Definición de rutas API
│   ├── transaccionRoutes.js
│   ├── entidadRoutes.js
│   ├── proyectoRoutes.js
│   ├── tareaRoutes.js
│   └── informeRoutes.js
├── controller/             # Lógica de negocio
│   ├── transaccionController.js
│   ├── entidadController.js
│   ├── proyectoController.js
│   ├── tareaController.js
│   └── informeController.js
├── model/                  # Modelos de datos (acceso a BD)
│   ├── transaccion.js
│   ├── entidad.js
│   ├── proyecto.js
│   ├── tarea.js
│   └── pago.js
└── package.json
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Configurar los datos de conexión a MySQL

3. Crear la base de datos:
   - Ejecutar el script `schema.sql` ubicado en `/database/schema.sql`

4. Iniciar el servidor:
```bash
node src/app.js
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints API

### Transacciones
- `GET /api/transacciones` - Obtener todas las transacciones
- `GET /api/transacciones/:id` - Obtener una transacción por ID
- `POST /api/transacciones` - Crear una nueva transacción
- `GET /api/transacciones/resumen/general` - Obtener resumen de transacciones

### Entidades
- `GET /api/entidades` - Obtener todas las entidades
- `GET /api/entidades/:id` - Obtener una entidad por ID
- `POST /api/entidades` - Crear una nueva entidad
- `PUT /api/entidades/:id` - Actualizar una entidad
- `DELETE /api/entidades/:id` - Eliminar una entidad

### Proyectos
- `GET /api/proyectos` - Obtener todos los proyectos
- `GET /api/proyectos/:id` - Obtener un proyecto por ID
- `POST /api/proyectos` - Crear un nuevo proyecto
- `PUT /api/proyectos/:id` - Actualizar un proyecto
- `DELETE /api/proyectos/:id` - Eliminar un proyecto

### Tareas
- `GET /api/tareas` - Obtener todas las tareas
- `GET /api/tareas/:id` - Obtener una tarea por ID
- `GET /api/tareas/estado/:estado` - Obtener tareas por estado (Kanban)
- `POST /api/tareas` - Crear una nueva tarea
- `PUT /api/tareas/:id` - Actualizar una tarea
- `DELETE /api/tareas/:id` - Eliminar una tarea

### Informes
- `GET /api/informes/resumen` - Obtener resumen general de finanzas
- `GET /api/informes/resumen/entidades` - Resumen por entidad
- `GET /api/informes/resumen/categorias` - Resumen por categoría
- `GET /api/informes/factura` - Generar pseudo-factura (con filtros opcionales: fecha_inicio, fecha_fin, entidad_id)

## Base de Datos

El sistema utiliza MySQL con las siguientes tablas principales:

- **entidades**: Personas, empresas u organismos
- **proyectos**: Proyectos activos
- **tareas**: Tareas del sistema Kanban
- **transacciones**: Entradas y salidas de dinero
- **pagos**: Historial de pagos asociados a transacciones

## Características

- ✅ Registro de proyectos y tareas (metodología Kanban)
- ✅ Gestión de entradas y salidas financieras
- ✅ Historial de pagos
- ✅ Gestión de entidades (personas, empresas, organismos)
- ✅ Generación de informes y pseudo-facturas
- ✅ Resumen contable de finanzas

