<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <a class="navbar-brand" href="#">Product ShowCase</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <RouterLink to="/" class="nav-link">Inicio</RouterLink>
          <RouterLink to="/products" class="nav-link">Productos</RouterLink>
        </div>
      </div>
    </div>
  </nav>

  <RouterView />

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'


</script>


<style scoped>
.router-link-active,
.router-link-exact-active {
  font-weight: 600;
}
</style>
