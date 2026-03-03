<template>
  <header class="page-header py-4 mb-5 text-center">
    <div class="container d-flex align-items-center justify-content-center">
      <h1 class="display-6 fw-bold mb-0 header-title">
        <slot></slot>
      </h1>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.page-header {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(255, 0, 153, 0.05) 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.header-title {
  color: #2d3748;
  letter-spacing: 1px;
}

[data-bs-theme='dark'] .page-header {
  background: linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(255, 0, 153, 0.05) 100%);
  border-bottom: 1px solid rgba(0, 240, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

[data-bs-theme='dark'] .header-title {
  color: #e0e6ed;
  text-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
}
</style>
