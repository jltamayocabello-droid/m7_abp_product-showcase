<template>
  <footer class="footer mt-auto py-5 glass-panel">
    <div class="container">
      <div class="row g-4">
        <!-- Columna 1: Branding -->
        <div class="col-12 col-md-5 mb-3">
          <a class="navbar-brand d-flex align-items-center mb-3" href="#">
            <svg
              class="me-2 text-primary"
              width="32"
              height="32"
              viewBox="0 0 76 76"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path
                stroke-width="0.2"
                stroke-linejoin="round"
                d="M 28.5,60L 22,55.25L 22,25L 27,25L 26.9167,22.1667C 26.9167,17.7944 30.4611,14.25 34.8333,14.25C 38.1014,14.25 40.907,16.2303 42.1156,19.0563C 46.0405,19.5251 49,22.6989 49,26.75L 49,29L 50.75,30L 54,30L 54,60L 28.5,60 Z M 25.3333,32.0625L 27.9583,30.4271L 27.9583,57.25L 28.5,57.7917L 28.5,30.0834L 33,30L 33,27L 24,27L 25.3333,32.0625 Z M 36,27L 36,30L 46,30L 46,28.75L 44,27L 36,27 Z M 43,25L 45.5,25C 45.023,23.6504 44.3496,22.977 43,22.5L 43,25 Z M 30.0833,22.1667L 30,25L 33.25,25C 33.8179,22.2022 36.0197,20.2735 38.6911,19.3948C 37.8287,18.1968 36.4221,17.4167 34.8333,17.4167C 32.21,17.4167 30.0833,19.5433 30.0833,22.1667 Z M 39.75,25L 39.75,22.5C 38.4003,22.977 37.477,23.6503 37,25L 39.75,25 Z "
              />
            </svg>
            <strong class="fs-4">Product</strong>
            <span class="text-danger ms-1 fs-4">ShowCase</span>
          </a>
          <p class="text-muted pe-4">
            Explora nuestro catálogo en línea y encuentra los mejores productos a los mejores
            precios. Tu tienda de confianza para un estilo de vida moderno.
          </p>
          <p class="text-muted fw-semibold">&copy; 1926-2026 Product ShowCase.</p>
        </div>

        <!-- Columna 2: Categorías -->
        <div class="col-6 col-md-3 mb-3">
          <h5 class="fw-bold mb-3">Categorías de Productos</h5>
          <ul class="list-unstyled">
            <li class="mb-2" v-for="cat in categories" :key="cat.id">
              <RouterLink
                :to="{ name: 'products', hash: '#category-' + cat.name }"
                class="footer-link text-decoration-none text-muted"
              >
                {{ cat.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Columna 3: Enlaces Útiles -->
        <div class="col-6 col-md-4 mb-3 ps-md-5">
          <h5 class="fw-bold mb-3">Enlaces Útiles</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <RouterLink
                to="/"
                @click="scrollToTop"
                class="footer-link text-decoration-none text-muted"
              >
                <i class="bi bi-house-door me-2"></i>Inicio
              </RouterLink>
            </li>
            <li class="mb-2">
              <RouterLink
                to="/products"
                @click="scrollToTop"
                class="footer-link text-decoration-none text-muted"
              >
                <i class="bi bi-shop me-2"></i>Catálogo
              </RouterLink>
            </li>
            <li class="mb-2">
              <!-- Enlace de contacto como se pidió -->
              <a
                href="mailto:contacto@productshowcase.com"
                class="footer-link text-decoration-none text-muted"
              >
                <i class="bi bi-envelope me-2"></i>Contacto: soporte@productshowcase.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="row mt-4 pt-4 border-top border-secondary-subtle">
        <div class="col-12 text-center text-muted small">
          Diseñado con estilos modernos interactivos y Glassmorphism.
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProductsStore } from '@/stores/products.store'
import { RouterLink } from 'vue-router'

const productsStore = useProductsStore()

const categories = computed(() => productsStore.categories)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(async () => {
  if (productsStore.categories.length === 0) {
    await productsStore.fetchProducts()
  }
})
</script>

<style scoped>
.footer {
  border-top: 1px solid rgba(0, 0, 0, 0.05); /* Separador suave superior */
  border-radius: 0 !important; /* El footer no necesita bordes redondeados globales para que ocupe todo el ancho */
  background: rgba(255, 255, 255, 0.6) !important;
  margin-top: 5rem !important; /* Separarlo del contenido principal */
}

[data-bs-theme='dark'] .footer {
  background: rgba(17, 24, 39, 0.6) !important;
  border-top: 1px solid rgba(0, 240, 255, 0.1);
}

.footer-link {
  transition:
    color 0.3s ease,
    margin-left 0.3s ease;
  display: inline-block;
}

.footer-link:hover {
  color: #ff0099 !important;
  margin-left: 5px; /* Pequeño desplazamiento interactivo */
}

[data-bs-theme='dark'] .text-muted {
  color: #a0aec0 !important;
}

.navbar-brand {
  color: inherit;
  text-decoration: none;
}
</style>
