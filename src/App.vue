<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="#"
        ><strong>Product</strong> <span class="text-danger">ShowCase</span></a
      >
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
          class="d-flex ms-lg-4 my-2 my-lg-0"
          role="search"
          style="max-width: 300px; width: 100%"
        >
          <input
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
          <RouterLink to="/products" class="nav-link mx-3">Productos disponibles</RouterLink>
          <RouterLink v-if="isAdmin" to="/admin/products" class="nav-link mx-3"
            >Crud Productos</RouterLink
          >
        </div>

        <!-- Acciones Lado Derecho -->
        <div class="navbar-nav align-items-center mt-3 mt-lg-0">
          <template v-if="!isAuth">
            <RouterLink
              to="/login"
              class="btn btn-light border ms-2 fw-semibold"
              style="color: #333"
              >Iniciar Sesión</RouterLink
            >
          </template>

          <template v-else>
            <span class="nav-link">Hola, {{ displayName }}</span>
            <button
              class="btn ms-2 text-white fw-semibold"
              style="background-color: darkred; border-color: darkred"
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
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from './stores/user.store'
import { useCartStore } from './stores/cart.store'
import { logout } from './services/auth'
import CartOffcanvas from './components/CartOffcanvas.vue'

// Import seeder
import { seedDatabase } from './scripts/seedProducts'

const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

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
    router.push({ name: 'login' })
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
