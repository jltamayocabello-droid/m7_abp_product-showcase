<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="cartOffcanvas"
    aria-labelledby="cartOffcanvasLabel"
  >
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title" id="cartOffcanvasLabel">Carrito de Compras</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body d-flex flex-column">
      <div
        v-if="cartStore.cart.length === 0"
        class="flex-grow-1 d-flex justify-content-center align-items-center"
      >
        <p class="text-muted text-center">Tu carrito está vacío.<br />¡Agrega algunos productos!</p>
      </div>

      <div v-else class="flex-grow-1 overflow-auto">
        <div
          v-for="item in cartStore.cart"
          :key="item.product.id"
          class="d-flex mb-3 align-items-center pb-3 border-bottom"
        >
          <img
            :src="item.product.image"
            alt="Producto"
            class="rounded me-3"
            style="width: 60px; height: 60px; object-fit: cover"
          />
          <div class="flex-grow-1">
            <h6 class="mb-0 text-truncate" style="max-width: 150px">{{ item.product.name }}</h6>
            <span class="text-success fw-bold">{{ formatPrice(item.product.price) }}</span>
            <div class="d-flex align-items-center mt-2">
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="decreaseQty(item)"
                :disabled="item.quantity <= 1"
              >
                -
              </button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="increaseQty(item)"
                :disabled="item.quantity >= item.product.stock"
              >
                +
              </button>
            </div>
          </div>
          <button
            class="btn btn-sm btn-outline-danger ms-2"
            @click="cartStore.removeFromCart(item.product.id)"
          >
            Quitar
          </button>
        </div>
      </div>

      <div class="border-top pt-3 mt-auto" v-if="cartStore.cart.length > 0">
        <div class="d-flex justify-content-between mb-3">
          <span class="fw-bold">Total:</span>
          <span class="fw-bold fs-5">{{ formatPrice(cartStore.cartTotal) }}</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary w-50" @click="cartStore.clearCart()">
            Vaciar Carrito
          </button>
          <button class="btn btn-success w-50">Ir a pagar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart.store'

const cartStore = useCartStore()

const formatPrice = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)
}

const decreaseQty = (item) => {
  cartStore.updateQuantity(item.product.id, item.quantity - 1)
}

const increaseQty = (item) => {
  cartStore.updateQuantity(item.product.id, item.quantity + 1)
}
</script>

<style scoped>
/* Scoped styles if needed */
</style>
