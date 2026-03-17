<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card p-4">
          <h2 class="mb-4 text-center">Iniciar sesión</h2>
          <form @submit.prevent="onLogin">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input id="email" v-model="email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control"
                required
              />
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Entrar</button>
              <button type="button" class="btn btn-link" @click="onReset">
                Recuperar contraseña
              </button>
            </div>
          </form>

          <!-- Credenciales de administrador para Portafolio -->
          <div class="mt-4 p-3 bg-light border rounded">
            <h6 class="mb-2 text-center text-muted">
              <i class="bi bi-info-circle me-1"></i>Credenciales de Demostración
            </h6>
            <p class="small text-muted mb-2 text-center">
              Usa este usuario para explorar el panel de administración:
            </p>
            <div class="d-flex flex-column mb-2 text-center">
              <span class="small font-monospace"><strong>Correo:</strong> admin@admin.cl</span>
              <span class="small font-monospace"><strong>Contraseña:</strong> 123456</span>
            </div>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary w-100 mt-2"
              @click="fillAdminCredentials"
            >
              <i class="bi bi-magic me-1"></i>Autocompletar credenciales
            </button>
          </div>

          <p class="mt-3 text-center">
            ¿No tienes cuenta?
            <router-link to="/register">Regístrate</router-link>
          </p>
          <div v-if="error" class="alert alert-danger mt-3 mb-0" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ error }}
          </div>
          <div v-if="success" class="alert alert-success mt-3 mb-0" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>{{ success }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login, sendPasswordReset } from '../services/auth'

const router = useRouter()
const route = useRoute()
const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')

function fillAdminCredentials() {
  email.value = 'admin@admin.cl'
  password.value = '123456'
  error.value = ''
}

async function onLogin() {
  error.value = ''
  success.value = ''
  try {
    await login(email.value, password.value)
    success.value = '¡Inicio de sesión exitoso!'
    setTimeout(() => {
      router.push('/')
    }, 1000)
  } catch (e) {
    error.value = 'Email o contraseña incorrectos. Intente nuevamente.'
  }
}

async function onReset() {
  success.value = ''
  error.value = ''
  const mail = window.prompt('Introduce tu email para recuperar la contraseña:')
  if (!mail) return
  try {
    await sendPasswordReset(mail)
    success.value = 'Correo de recuperación enviado exitosamente.'
  } catch (e) {
    error.value = e.message || 'Error al enviar correo'
  }
}

onMounted(() => {
  if (route.query.logout === 'success') {
    success.value = 'Se ha cerrado sesión exitosamente.'
    // Opcional: limpiar la URL sin recargar la página
    router.replace({ query: null })
  }
})
</script>

<style scoped>
.login-container {
  display: none;
}
</style>
