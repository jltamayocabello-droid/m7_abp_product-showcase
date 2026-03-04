# 📝 PROYECTO ABP M7: Vue Product Showcase

![Estado del Proyecto](https://img.shields.io/badge/Estado-Finalizado-yellow)
![Stack](https://img.shields.io/badge/Stack-Vue.js_3_%7C_Vite_%7C_Pinia-brightgreen)
![Router](https://img.shields.io/badge/Vue_Router-4.x-blue)
![UI](https://img.shields.io/badge/UI-Bootstrap_5.3-7952b3)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)

---

## � Descripción del Proyecto

**Unidad solicitante:** Departamento de E-commerce de una empresa de tecnología.

El equipo de desarrollo del área de e-commerce necesitaba una aplicación SPA (Single Page Application) que sirviera como catálogo interactivo de productos. Se buscaba un sistema moderno, dinámico y responsive que permitiera a los usuarios visualizar información de productos, filtrar por categorías y ver detalles individuales. Además, se requería una interfaz robusta para gestionar el estado de forma centralizada.

El equipo desarrolló una solución completa aplicando de forma progresiva los conceptos del módulo: componentes reutilizables, integración con servicios en la nube (Firebase Firestore y Authentication), rutas dinámicas, estado global con Pinia y un diseño moderno estilo Glassmorphism.

---

## 🎯 Objetivo

Desarrollar una aplicación Vue moderna, optimizada y mantenible llamada **Product ShowCase**, que permita gestionar un catálogo de productos interactivo. Se espera que la finalización de este proyecto demuestre:

- Comprensión y aplicación de los fundamentos de Vue.js con Composition API (`<script setup>`).
- Utilización de templates, eventos y formularios reactivos.
- Implementación de una estructura de rutas y navegación con Vue Router.
- Gestión de estado global centralizado con Pinia.
- Integración fluida de diseño profesional (Bootstrap + CSS Custom).

---

## 🛠️ Requerimientos Técnicos

Este proyecto cumple con los estándares exigidos para el módulo 7:

- ✅ **Componentes Vue**: Arquitectura modular y escalable.
- ✅ **Composición API**: Uso moderno de Vue 3.
- ✅ **Binding reactivo**: Formularios completos para el CRUD y Carrito de Compras.
- ✅ **Manejo de Eventos**: Respuestas interactivas de la UI.
- ✅ **Rutas dinámicas**: Vista individual por producto y protección de rutas CRUD.
- ✅ **Al menos 3 vistas**: Inicio, Catálogo (Productos Disponibles) y Administración (CRUD).
- ✅ **Diseño Profesional**: Implementación profunda de Bootstrap 5 con estilos extra (Glassmorphism, Dark/Light mode).
- ✅ **Estado global**: Gestión efectiva del estado de productos, carrito de compras y usuarios utilizando **Pinia**.
- ✅ **Backend Integrado**: Implementación de **Firebase Firestore** como base de datos NoSQL en tiempo real y **Firebase Authentication** para la gestión de sesiones y protección de rutas.

---

## 📂 Documentación Técnica

### 1. Stack Tecnológico

- **Vue.js 3**: Framework principal usando Composition API.
- **Vite**: Bundler y entorno de desarrollo ultra rápido.
- **Vue Router 4**: Gestión de navegación SPA.
- **Pinia**: Manejo moderno del estado global (Products, Cart, User).
- **Firebase**: Backend-as-a-Service (BaaS) utilizado para autenticación (Auth), base de datos en la nube (Firestore) y despliegue del proyecto (Hosting).
- **Bootstrap 5.3 + Custom CSS**: Responsividad, componentes UI y estética _Glassmorphism_.
- **Vuetify**: Componentes interactivos como alertas contextuales (Snackbars) y botones.
- **Vue3-Carousel**: Implementación de sliders para productos destacados.

### 2. Estructura del Proyecto

```
m7_abp_vue-product-showcase/
│
├── index.html
├── vite.config.js
├── README.md
│
├── src/
│   ├── main.js                    # Punto de entrada, Pinia y Router
│   ├── App.vue                    # Layout raíz, Navbar y Footer
│   │
│   ├── assets/
│   │   └── main.css               # Variables Neon, Dark Mode, Glassmorphism
│   │
│   ├── components/
│   │   ├── CartOffcanvas.vue      # Carrito lateral interactivo
│   │   ├── ProductCard.vue        # Tarjeta reutilizable de producto
│   │   └── layouts/
│   │       ├── HeaderComp.vue     # Banner dinámico para vistas
│   │       └── FooterComp.vue     # Pie de página global
│   │
│   ├── views/
│   │   ├── HomeView.vue           # Inicio con carrusel de ofertas
│   │   ├── ProductView.vue        # Catálogo filtrable por departamentos
│   │   ├── LoginView.vue          # Sistema de sesión (Admin/User)
│   │   ├── RegisterView.vue       # Registro de nuevos usuarios
│   │   └── admin/
│   │       └── ProductsCrudView.vue # Formulario completo para gestión (Admin)
│   │
│   ├── stores/
│   │   ├── products.store.js      # Catálogo, categorías y CRUD de productos
│   │   ├── cart.store.js          # Lógica de compras y cálculos matemáticos
│   │   └── user.store.js          # Guardado de credenciales y roles
│   │
│   ├── testing/
│   │   └── test_search.js         # Script E2E auxiliar para probar flujo de búsqueda
│   │
│   └── router/
│       └── index.js               # Rutas con lazy loading
```

### 3. Arquitectura de Stores (Pinia)

#### Store `products` (`products.store.js`)

Maneja toda la lista de productos disponibles, stock en tiempo real y listas de subcategorías derivadas del inventario actual.

- Funciones CRUD completas: Agregar, Editar, Eliminar y Leer.

#### Store `cart` (`cart.store.js`)

Administra los productos que el usuario ha seleccionado para su compra.

- Verifica continuamente la propiedad `stockAvailable` para evitar agregar cantidades que superen el inventario.
- Calcula los montos totales de forma dinámica.

#### Store `user` (`user.store.js`)

Gestiona la sesión del usuario. Determina qué elementos de la interfaz se renderizan (por ejemplo, la vista CRUD es exclusiva para cuentas con rol de administrador).

---

## 🚀 Cómo ejecutar este proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/jltamayocabello-droid/m7_abp_product-showcase.git
cd m7_abp_product-showcase
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar en modo desarrollo

```bash
npm run dev
```

### 4. Uso de la aplicación

- **Público**: Acceso a la página de Inicio, visor de Productos Disponibles y Carrito de compras funcional según el stock.
- **Administrador**: Al iniciar sesión como Admin (si configuraste roles en `user.store`), la navbar habilitará la ruta protegida _"Crud Productos"_, la cual permite alterar el inventario en tiempo real.

---

## 🌐 Despliegue (Demo)

**Repositorio GitHub:** 🔗 **[https://github.com/jltamayocabello-droid/m7_abp_product-showcase](https://github.com/jltamayocabello-droid/m7_abp_product-showcase)**

**Deploy del proyecto:** 🔗 **[https://m7-abp-vue-product-showcase.web.app/](https://m7-abp-vue-product-showcase.web.app/)**

---

## 💡 Justificación de Decisiones Técnicas

### Composition API y Pinia

**Decisión**: Optar por la sintaxis Setup de Vue 3 junto a Pinia (descartando Options API y Vuex).

**Justificación**: Permite un código mucho más modular, legible y fácil de depurar. Pinia elimina las mutaciones estáticas de Vuex, permitiendo alterar y leer estados con reactividad nativa de alto rendimiento.

### Glassmorphism y Paleta Neón

**Decisión**: Personalizar Bootstrap de manera agresiva utilizando `backdrop-filter: blur`, gradientes semitransparentes y una paleta de colores oscuro-neón.

**Justificación**: Demostrar la capacidad de fusionar librerías UI de manera personalizada para crear plataformas que se sientan _Premium_, dinámicas y de alto impacto visual.

---

## 📱 Funcionalidades Destacadas

| Funcionalidad               | Descripción                                                                                                                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 🛍️ **E-Commerce Real**      | Lógica de Carrito de Compras enlazada al stock global.                                                                                                                                                                               |
| 🎨 **Modo Noche**           | Switch interactivo de variables globales y colores Neón.                                                                                                                                                                             |
| 🧱 **Arquitectura SPA**     | Transiciones fluidas sin recarga de página (Vue Router).                                                                                                                                                                             |
| 🛡️ **Control de Roles**     | Ocultamiento reactivo de Vistas Administrativas.                                                                                                                                                                                     |
| 🚀 **Gestión CRUD**         | Tabla inteligente con inserción de productos en tiempo real, con notificaciones interactivas de Vuetify.                                                                                                                             |
| 🎯 **Buscador Inteligente** | Barra de navegación `sticky` que mantiene al usuario en el panel de control durante las búsquedas como administrador, y realiza un desplazamiento automático a las cuadrículas al utilizarse desde otras secciones de la aplicación. |

---

## ✒️ Autor

**Jorge Tamayo Cabello**

_Estudiante de Desarrollo Front-End Trainee – SENCE_

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para SENCE y está disponible con fines educativos.

---

## 🙏 Agradecimientos

- **SENCE** por la formación en el área de desarrollo web moderno.
- **Comunidad Vue.js** por proporcionar herramientas escalables increíbles.
- **Templarian (WindowsIcons)** por diseñar y proporcionar bajo Dominio Público el icono SVG del logotipo.
