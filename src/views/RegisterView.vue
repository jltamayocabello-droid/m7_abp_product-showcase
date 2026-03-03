<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4">
          <h2 class="mb-4 text-center">Registrar cuenta</h2>
          <form @submit.prevent="onRegister">
            <div class="mb-3">
              <label for="firstname" class="form-label">Nombre</label>
              <input id="firstname" v-model="firstname" class="form-control" required />
            </div>
            <div class="mb-3">
              <label for="lastname" class="form-label">Apellido</label>
              <input id="lastname" v-model="lastname" class="form-control" required />
            </div>
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
            <div class="mb-3">
              <label for="confirm" class="form-label">Confirmar contraseña</label>
              <input id="confirm" v-model="confirm" type="password" class="form-control" required />
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-primary">Crear cuenta</button>
            </div>
          </form>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/auth'

const router = useRouter()
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
const success = ref('')

async function onRegister() {
  error.value = ''
  success.value = ''
  if (password.value !== confirm.value) {
    error.value = 'Las contraseñas no coinciden'
    return
  }
  try {
    await register(email.value, password.value, {
      firstname: firstname.value,
      lastname: lastname.value,
    })
    success.value = '¡Cuenta creada con éxito! Redirigiendo...'
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (e) {
    error.value = 'No se pudo crear la cuenta. Verifica que el correo no esté en uso.'
  }
}
</script>

<style scoped>
.register-container {
  display: none;
}
</style>
