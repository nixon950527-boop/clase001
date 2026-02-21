# Especificación de la Aplicación: RutaLimpia

## 1. Objetivo
RutaLimpia es una aplicación para el seguimiento y rastreo de camiones recolectores de residuos, enfocada en controlar el cumplimiento de rutas y generar alertas automáticas ante desviaciones.

## 2. Funcionalidades principales

### 2.1 Monitoreo en tiempo real
- Visualización de camiones en mapa con actualización continua.
- Estado por unidad: en ruta, detenido, desviado, fuera de servicio.
- Filtros por zona, turno, estado y supervisor.

### 2.2 Planificación y asignación de rutas
- Creación de rutas geográficas con tramos y paradas.
- Configuración de tolerancia de desvío (metros) y tiempo permitido fuera de ruta.
- Asignación de ruta por camión y turno.

### 2.3 Sistema de alertas de desviación
- Detección automática de desvío según distancia y tiempo.
- Niveles de alerta: baja, media y alta.
- Acciones sobre alertas: reconocer, escalar, cerrar con comentario.
- Historial completo de alertas y tiempos de resolución.

### 2.4 Gestión de incidencias
- Registro de incidencias por chofer/supervisor (accidente, bloqueo, mantenimiento, etc.).
- Adjuntos opcionales (foto/evidencia).
- Trazabilidad de estado de la incidencia.

### 2.5 Reportes y analítica
- Cumplimiento de ruta por camión y por período.
- Alertas por zona, tiempo promedio de resolución y recurrencia.
- Exportación de reportes a CSV/PDF.

### 2.6 Administración y seguridad
- Gestión de usuarios, roles y permisos.
- Registro de auditoría (quién hizo qué y cuándo).
- Acceso seguro con autenticación JWT.

## 3. Historias de usuario
1. Como supervisor de operaciones, quiero ver en un mapa todos los camiones activos para monitorear el servicio en tiempo real.
2. Como planificador de rutas, quiero configurar tolerancias de desvío por ruta para adaptarlas a cada zona de operación.
3. Como supervisor, quiero recibir alertas de desvío para actuar rápidamente ante posibles incumplimientos.
4. Como operador, quiero revisar el historial de un camión para entender patrones de retrasos y desvíos.
5. Como administrador, quiero gestionar roles y permisos para asegurar que cada perfil vea solo lo que le corresponde.
6. Como chofer, quiero reportar incidencias desde móvil para dejar constancia de eventos no planificados.

## 4. Alcance

### 4.1 Alcance MVP (incluido)
- Gestión de usuarios y roles básicos.
- Alta y gestión de camiones.
- Alta y gestión de rutas.
- Asignación de rutas a camiones.
- Tracking en tiempo real con posiciones GPS.
- Alertas automáticas de desviación con flujo de atención.
- Reportes operativos básicos.

### 4.2 Fuera de alcance inicial (fases futuras)
- Optimización automática de rutas con IA.
- Integración nativa con ERPs municipales.
- Mantenimiento predictivo basado en telemetría avanzada.
- App ciudadana de seguimiento público.

## 5. Interfaz propuesta

### 5.1 Principios de diseño
- Prioridad en legibilidad operativa (alto contraste, estados por color e iconografía).
- Navegación rápida para contextos de sala de control.
- Información crítica visible en menos de 2 clics.

### 5.2 Pantallas clave
1. **Login**
   - Usuario, contraseña y recuperación de acceso.
2. **Dashboard Operativo**
   - KPIs principales: unidades activas, alertas activas, rutas completadas, incidencias abiertas.
3. **Mapa de seguimiento en vivo**
   - Mapa central + panel lateral de camiones y filtros.
   - Pop-up por camión con velocidad, última actualización y estado de ruta.
4. **Centro de alertas**
   - Tabla de alertas por severidad y tiempo.
   - Acciones de reconocimiento y escalamiento.
5. **Gestor de rutas**
   - Editor de recorrido (dibujar/importar), configuración de tolerancias y horarios.
6. **Detalle de camión**
   - Línea de tiempo de eventos, recorrido histórico y nivel de cumplimiento.
7. **Reportes**
   - Gráficas por período y exportación.

### 5.3 Componentes UI recomendados
- Mapa interactivo con capas.
- Tarjetas KPI.
- Tabla de alertas con semáforo de severidad.
- Línea de tiempo de eventos.
- Formularios con validación contextual.

## 6. Requisitos técnicos sugeridos
- Frontend: React + TypeScript.
- Backend: NestJS o FastAPI.
- Datos geoespaciales: PostgreSQL + PostGIS.
- Tiempo real: WebSocket.
- Despliegue: Docker Compose para entorno inicial.

## 7. Criterios de éxito
- Detección de desvíos en menos de 10 segundos desde que ocurre el evento.
- Reducción de incidentes de incumplimiento de ruta medido mes a mes.
- Trazabilidad completa de alertas y acciones de respuesta.
- Panel estable con al menos 10 camiones simultáneos en operación.
