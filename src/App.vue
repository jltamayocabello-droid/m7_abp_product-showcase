<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="#">Product ShowCase</a>
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
          class="d-flex mx-auto my-2 my-lg-0"
          role="search"
          style="max-width: 400px; width: 100%"
        >
          <input
            class="form-control me-2"
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar"
          />
          <button class="btn btn-outline-success" type="submit">Buscar</button>
        </form>

        <div class="navbar-nav ms-auto align-items-center mt-3 mt-lg-0">
          <RouterLink to="/" class="nav-link">Inicio</RouterLink>
          <RouterLink to="/products" class="nav-link">Productos</RouterLink>

          <RouterLink v-if="isAdmin" to="/admin/products" class="nav-link"
            >Crud Productos</RouterLink
          >

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
        </div>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from './stores/user.store'
import { logout } from './services/auth'

const router = useRouter()
const userStore = useUserStore()

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
    router.push({ name: 'login' })
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  font-weight: 600;
}
</style>
