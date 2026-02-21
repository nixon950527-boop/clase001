# Master Prompt: Plataforma de Seguimiento y Rastreo de Camiones Recolectores

Actúa como un **arquitecto de software senior + tech lead full-stack + diseñador UX**.
Tu objetivo es construir una aplicación llamada **RutaLimpia** para el seguimiento en tiempo real de camiones recolectores de residuos, con un sistema robusto de alertas de desviación de recorridos.

## 1) Contexto del problema
Los municipios y empresas de recolección necesitan:
- Saber en tiempo real dónde está cada camión.
- Verificar cumplimiento de rutas planificadas.
- Detectar desviaciones no autorizadas.
- Reducir quejas ciudadanas por incumplimientos.
- Tener trazabilidad histórica para auditoría y mejora operativa.

## 2) Objetivo del producto
Desarrollar una plataforma web + móvil para:
- Monitorear flota en mapa en tiempo real.
- Definir rutas y ventanas horarias.
- Detectar y alertar desviaciones por geocercas y tolerancias.
- Gestionar incidencias y evidencias (foto/comentarios).
- Generar reportes operativos y de cumplimiento.

## 3) Alcance funcional mínimo (MVP)
Implementa al menos estos módulos:
1. **Autenticación y roles**
   - Roles: Administrador, Supervisor, Operador de flota, Chofer.
2. **Gestión de flota**
   - CRUD de camiones (placa, capacidad, estado, dispositivo GPS asociado).
3. **Gestión de rutas**
   - Crear ruta por tramos geográficos (polyline) con tolerancia en metros.
   - Asignar ruta a camión y turno.
4. **Seguimiento en tiempo real**
   - Ingesta de posiciones GPS periódicas.
   - Visualización de camiones en mapa con estado (en ruta, detenido, desviado, fuera de servicio).
5. **Alertas de desviación**
   - Regla: activar alerta si camión supera tolerancia de distancia respecto a ruta por X minutos.
   - Severidad configurable (baja/media/alta) por distancia y tiempo.
   - Notificación in-app y registro histórico.
6. **Historial y reportes**
   - Reproducción de recorrido diario.
   - Reporte de cumplimiento por ruta (% cubierto, desvíos, paradas no planificadas).

## 4) Requisitos no funcionales
- Arquitectura escalable y mantenible.
- Seguridad: JWT/OAuth2, RBAC, trazabilidad de auditoría.
- Tiempo real con latencia objetivo < 5s en panel.
- API documentada con OpenAPI/Swagger.
- Observabilidad: logs estructurados, métricas y alertas técnicas.

## 5) Reglas de negocio clave
- Un camión puede tener una sola ruta activa por turno.
- Una desviación se considera válida si:
  - Distancia a ruta > `tolerancia_metros`, y
  - Tiempo fuera de ruta > `tolerancia_tiempo_segundos`.
- Si vuelve al corredor de ruta, cerrar alerta automáticamente y registrar duración total.
- Permitir “desvío autorizado” con motivo y vigencia temporal.

## 6) Historias de usuario (formato: Como/Quiero/Para)
1. Como supervisor, quiero ver la ubicación en tiempo real de cada camión para reaccionar ante incidencias.
2. Como planificador, quiero definir rutas con tolerancias para evaluar cumplimiento operativo.
3. Como supervisor, quiero recibir alertas cuando un camión se desvíe para tomar acciones correctivas.
4. Como operador, quiero revisar el historial de recorridos para validar productividad y tiempos.
5. Como administrador, quiero gestionar usuarios y roles para controlar acceso por responsabilidad.
6. Como chofer, quiero registrar incidencias de ruta para justificar eventos no planificados.

## 7) Diseño de interfaz (UX/UI)
Define y construye estas pantallas:
1. **Login**
2. **Dashboard de operaciones**
   - KPIs: camiones activos, alertas abiertas, rutas completadas, incidentes.
3. **Mapa en tiempo real**
   - Lista lateral de camiones + filtros por estado/zona/turno.
   - Marcadores con color por estado.
4. **Centro de alertas**
   - Alertas activas e históricas, severidad, tiempo, acciones.
5. **Gestor de rutas**
   - Editor de ruta (dibujar/importar), tolerancia y horarios.
6. **Detalle de camión**
   - Telemetría, últimas posiciones, eventos y cumplimiento.
7. **Reportes**
   - Gráficas + exportación CSV/PDF.

## 8) Arquitectura técnica sugerida
- **Frontend web**: React + TypeScript + mapa (Mapbox/Leaflet).
- **Backend API**: Node.js (NestJS) o Python (FastAPI).
- **Tiempo real**: WebSocket (Socket.IO) o MQTT bridge.
- **Base de datos**: PostgreSQL + PostGIS para geoespacial.
- **Cache/colas**: Redis.
- **Infraestructura**: Docker + CI/CD.

## 9) Modelo de datos base
Define entidades y relaciones mínimas:
- `users`, `roles`
- `trucks`
- `gps_devices`
- `routes`
- `route_assignments`
- `gps_positions`
- `deviation_alerts`
- `incidents`

Incluye campos esenciales, llaves, índices y timestamps.

## 10) API mínima esperada
- `POST /auth/login`
- `GET /trucks`
- `POST /routes`
- `POST /route-assignments`
- `POST /gps/ingest`
- `GET /tracking/live`
- `GET /alerts`
- `PATCH /alerts/{id}/ack`
- `GET /reports/compliance`

## 11) Algoritmo de desviación (requerido)
Implementa lógica geoespacial para calcular distancia mínima entre posición GPS y corredor de ruta.
- Entrada: posición actual, polyline de ruta, tolerancias.
- Salida: estado `ON_ROUTE` o `OFF_ROUTE`.
- Mantener contador temporal para abrir/cerrar alerta.
- Registrar eventos de transición de estado.

## 12) Entregables
Genera:
1. Estructura del proyecto (frontend/backend/infra).
2. Código base funcional con autenticación, tracking y alertas.
3. Esquema DB + migraciones iniciales.
4. Documentación de despliegue local con Docker Compose.
5. Colección de pruebas API (Postman o similar).
6. Pruebas unitarias clave del motor de desviación.

## 13) Criterios de aceptación
- Se visualiza movimiento de al menos 10 camiones simulados en tiempo real.
- Se dispara alerta al exceder tolerancias configuradas.
- Se cierra alerta al retornar a la ruta.
- Reporte diario muestra cumplimiento por camión y ruta.
- Accesos restringidos según rol.

## 14) Forma de respuesta esperada
Devuelve en este orden:
1. Arquitectura propuesta.
2. Estructura de carpetas.
3. Modelo de datos.
4. Endpoints con contratos JSON.
5. Implementación principal (backend + frontend).
6. Configuración Docker.
7. Plan de pruebas.
8. Próximos pasos para escalar a producción.

Usa buenas prácticas de clean code, SOLID, documentación clara y decisiones justificadas.
