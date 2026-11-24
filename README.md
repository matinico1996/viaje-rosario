# ROSARIO REGIONAL 2026 – ORGANIZADOR DE VIAJE 🏆🎒

Aplicación web interactiva para organizar el equipaje y la documentación de los 14 integrantes del viaje al Regional Pokémon VGC 2026 en Rosario.

## 🚀 Características Principales

- **Menú Principal de Perfiles**: Cuadrícula interactiva con las 14 tarjetas de los viajeros con sus fotografías oficiales (proporción cuadrada, sin deformación, recorte centrado y avatares provisionales en caso de fallo).
- **Checklists 100% Independientes**: Cada integrante cuenta con su propia lista y progreso guardado en tiempo real en `localStorage`, sin interferir con las listas de los demás integrantes.
- **Elementos Exclusivos para Conductores**:
  - Lisandro y Jon cuentan con el elemento exclusivo: `Licencia de conducir (SOLO CONDUCTORES)`.
  - Los otros 12 integrantes no lo visualizan ni se contabiliza en su porcentaje de progreso.
- **Lista de Elementos Oficial**: Basada en `lista items`:
  - DOCUMENTACIÓN Y OBJETOS PERSONALES
  - ROPA
  - HIGIENE PERSONAL
  - TECNOLOGÍA Y ACCESORIOS
  - SALUD Y COMODIDAD
- **Gestión Completa de la Checklist**:
  - Marcar y desmarcar elementos con un solo clic.
  - Efecto de texto tachado y confirmación visual.
  - Barra de progreso dinámica (%) y contadores de Total, Completados y Pendientes.
  - Búsqueda en tiempo real y filtros por estado (Todos / Pendientes / Completados).
  - Agregar elementos personalizados.
  - Modificar nombres de elementos.
  - Eliminar elementos.
  - Reordenar elementos dentro de cada categoría (arriba / abajo).
  - Crear, renombrar, eliminar y reordenar categorías.
  - Reiniciar individualmente la checklist de un integrante a los valores por defecto.
- **Panel de Administración**:
  - Gestión de Integrantes: Agregar, modificar nombres, actualizar fotos y roles.
  - Gestión de Categorías Maestras: Crear, renombrar, eliminar y reordenar.
  - Gestión de Elementos Maestros: Crear, editar, reordenar y configurar la **exclusividad/visibilidad** (general o solo para integrantes específicos).
  - Botón de restablecimiento de datos a valores de fábrica.

---

## 👥 Integrantes Oficiales (14)

1. **Lisandro** (🚗 Conductor)
2. **Juanma**
3. **Mati Ahumada**
4. **Nico**
5. **Kina**
6. **Jon** (🚗 Conductor)
7. **Romi**
8. **Ariel**
9. **Faculito**
10. **Pau**
11. **Pepo**
12. **Joaco**
13. **Fran**
14. **Valen**

---

## 🛠️ Tecnologías

- **HTML5 & CSS3 Moderno**: Diseño responsive con estética inspirada en el torneo Pokémon VGC, microinteracciones y variables CSS.
- **Vanilla JavaScript**: Enrutamiento dinámico SPA (`#/lisandro`, etc.), lógica reactiva, persistencia modular en `localStorage`.
- **Compatibilidad Total**: Despliegue estático directo en Vercel, Netlify o GitHub Pages con `vercel.json` y fallback `404.html`.

---

## 🌐 Despliegue en GitHub y Vercel

### Opción 1: Enlazar con GitHub
1. Crear un nuevo repositorio en tu cuenta de GitHub (ej. `rosario-regional-2026`).
2. En la terminal de tu proyecto:
   ```bash
   git add .
   git commit -m "feat: Rosario Regional 2026 web organizer"
   git branch -M main
   git remote add origin https://github.com/matinico1996/rosario-regional-2026.git
   git push -u origin main
   ```

### Opción 2: Despliegue en Vercel
El proyecto ya se encuentra desplegado y activo en producción bajo tu cuenta de Vercel (`matiasnicos-projects`):
- 🌐 **Dominio Principal**: [https://viaje-rosario-2026.vercel.app](https://viaje-rosario-2026.vercel.app)
- 🌐 **Dominio Alternativo**: [https://rosario-regional-2026.vercel.app](https://rosario-regional-2026.vercel.app)
- 🌐 **Dominio de Cuenta**: [https://viaje-rosario-matiasnicos-projects.vercel.app](https://viaje-rosario-matiasnicos-projects.vercel.app)
