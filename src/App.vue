<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm z-3">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <svg
          class="me-2 text-primary"
          width="32"
          height="32"
          viewBox="0 0 76 76"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fill="currentColor"
            stroke-width="0.2"
            stroke-linejoin="round"
            d="M 28.5,60L 22,55.25L 22,25L 27,25L 26.9167,22.1667C 26.9167,17.7944 30.4611,14.25 34.8333,14.25C 38.1014,14.25 40.907,16.2303 42.1156,19.0563C 46.0405,19.5251 49,22.6989 49,26.75L 49,29L 50.75,30L 54,30L 54,60L 28.5,60 Z M 25.3333,32.0625L 27.9583,30.4271L 27.9583,57.25L 28.5,57.7917L 28.5,30.0834L 33,30L 33,27L 24,27L 25.3333,32.0625 Z M 36,27L 36,30L 46,30L 46,28.75L 44,27L 36,27 Z M 43,25L 45.5,25C 45.023,23.6504 44.3496,22.977 43,22.5L 43,25 Z M 30.0833,22.1667L 30,25L 33.25,25C 33.8179,22.2022 36.0197,20.2735 38.6911,19.3948C 37.8287,18.1968 36.4221,17.4167 34.8333,17.4167C 32.21,17.4167 30.0833,19.5433 30.0833,22.1667 Z M 39.75,25L 39.75,22.5C 38.4003,22.977 37.477,23.6503 37,25L 39.75,25 Z "
          />
        </svg>
        <strong>Product</strong> <span class="text-danger ms-1">ShowCase</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <!-- Search bar -->
        <form
          class="d-flex ms-lg-4 mx-auto my-2 my-lg-0"
          role="search"
          style="max-width: 300px; width: 100%"
          @submit.prevent="onGlobalSearch"
        >
          <input
            v-model="globalSearchQuery"
            class="form-control me-2"
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar"
          />
          <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>

        <!-- Enlaces Centrados -->
        <div class="navbar-nav mx-auto align-items-center text-center mt-3 mt-lg-0">
          <RouterLink to="/" class="nav-link mx-3">Inicio</RouterLink>
          <RouterLink to="/products" class="nav-link mx-3">Catálogo</RouterLink>
          <RouterLink v-if="isAdmin" to="/admin/products" class="nav-link mx-3"
            >Crud de Productos</RouterLink
          >
        </div>

        <!-- Acciones Lado Derecho -->
        <div class="navbar-nav align-items-center mt-3 mt-lg-0">
          <template v-if="!isAuth">
            <RouterLink
              to="/login"
              class="btn btn-outline-primary rounded-pill px-4 ms-2 fw-semibold"
              >Iniciar Sesión</RouterLink
            >
          </template>

          <template v-else>
            <span class="nav-link">Hola, {{ displayName }}</span>
            <button
              class="btn btn-outline-danger rounded-pill px-4 ms-2 fw-semibold"
              @click.prevent="onLogout"
            >
              Cerrar Sesión
            </button>
          </template>

          <div class="vr mx-3 d-none d-lg-block"></div>

          <!-- Botón de Tema -->
          <button
            class="btn btn-outline-secondary border-0 ms-2"
            @click="toggleTheme"
            title="Cambiar Tema"
          >
            <i :class="isDarkMode ? 'bi bi-sun-fill text-warning' : 'bi bi-moon-stars-fill'"></i>
          </button>

          <button
            class="btn btn-outline-dark ms-3 position-relative"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#cartOffcanvas"
            aria-controls="cartOffcanvas"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-cart"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
              />
            </svg>
            <span
              v-if="cartStore.cartCount > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ cartStore.cartCount }}
              <span class="visually-hidden">productos en carrito</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>

  <RouterView />
  <CartOffcanvas />
  <FooterComp />
</template>

<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import { useUserStore } from './stores/user.store'
import { useCartStore } from './stores/cart.store'
import { logout } from './services/auth'
import CartOffcanvas from './components/CartOffcanvas.vue'
import FooterComp from './components/layouts/FooterComp.vue'

// Import seeder
import { seedDatabase } from './scripts/seedProducts'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const cartStore = useCartStore()

// Global Search Logic
const globalSearchQuery = ref(route.query.search || '')

const onGlobalSearch = () => {
  const queryObj =
    globalSearchQuery.value.trim() !== '' ? { search: globalSearchQuery.value.trim() } : {}
  // Si estamos en la vista del catálogo o en el CRUD, quedarse en esa vista y רק filtrar
  if (route.path === '/products' || route.path === '/admin/products') {
    router.push({ path: route.path, query: queryObj })
  } else {
    // Si estamos en otra vista (Home), navegar a products con el filtro
    router.push({ path: '/products', query: queryObj })
  }
}

// Mantener la barra de búsqueda sincronizada si cambia el URL externamente
watch(
  () => route.query.search,
  (newSearch) => {
    globalSearchQuery.value = newSearch || ''
  },
)

// Theme Logic
const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  const theme = isDarkMode.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-bs-theme', theme)
  localStorage.setItem('theme', theme)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDarkMode.value = true
    document.documentElement.setAttribute('data-bs-theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light')
  }
})

const isAuth = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.user?.role === 'admin')
const displayName = computed(() => {
  const u = userStore.user
  if (!u) return ''
  return `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email
})

async function onLogout() {
  try {
    await logout()
    userStore.clearUser()
    cartStore.clearCart()
    router.push({ name: 'login', query: { logout: 'success' } })
  } catch (e) {
    console.error(e)
  }
}

// Descomentar esto solo una vez para llenar o migrar la base de datos
// onMounted(async () => {
//   // console.log('Seeding products...')
//   // await seedDatabase()
//   // console.log('Running data migration...')
//   // await migrateProducts()
// })
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  font-weight: 600;
}
</style>
