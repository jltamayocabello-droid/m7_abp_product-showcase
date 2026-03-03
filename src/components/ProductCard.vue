<template>
  <div class="h-100">
    <div class="card h-100 mx-auto w-100 position-relative shadow-sm">
      <div v-if="product.subcategory === 'oferta'" class="position-absolute top-0 start-0 m-2">
        <span class="badge bg-danger rounded-pill px-3 py-2 fw-bold" style="font-size: 0.8rem"
          >¡Oferta!</span
        >
      </div>
      <img
        :src="product.image"
        class="card-img-top"
        :alt="product.name"
        style="object-fit: cover"
      />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title text-truncate" :title="product.name">{{ product.name }}</h5>
        <p class="card-text text-muted mb-2 flex-grow-1" style="font-size: 0.9rem">
          {{ product.description }}
        </p>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="fw-bold fs-5">${{ product.price }}</span>
          <small :class="['fw-semibold', stockAvailable > 0 ? 'text-success' : 'text-danger']">
            {{ stockAvailable > 0 ? `Stock: ${stockAvailable}` : 'Agotado' }}
          </small>
        </div>
        <button
          class="btn btn-outline-success w-100 mt-auto"
          @click="addToCart"
          :disabled="stockAvailable <= 0"
        >
          {{ stockAvailable > 0 ? 'Agregar al Carrito' : 'Sin Stock' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart.store'

const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

// Calcula el stock disponible restando lo que ya está en el carrito
const stockAvailable = computed(() => {
  const itemInCart = cartStore.cart.find((item) => item.product.id === props.product.id)
  if (itemInCart) {
    return props.product.stock - itemInCart.quantity
  }
  return props.product.stock !== undefined ? props.product.stock : 0
})

const addToCart = () => {
  if (stockAvailable.value > 0) {
    cartStore.addToCart(props.product, 1)
  }
}
</script>

<style lang="css" scoped>
.card-img-top {
  aspect-ratio: 3/2;
}
</style>
