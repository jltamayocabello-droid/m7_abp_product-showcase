import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
  })

  const cartCount = computed(() => {
    return cart.value.reduce((count, item) => count + item.quantity, 0)
  })

  function addToCart(product, quantity = 1) {
    const existingItem = cart.value.find((item) => item.product.id === product.id)
    if (existingItem) {
      if (existingItem.quantity + quantity <= product.stock) {
        existingItem.quantity += quantity
      } else {
        existingItem.quantity = product.stock // Max it out to stock
      }
    } else {
      if (quantity <= product.stock && quantity > 0) {
        cart.value.push({ product, quantity })
      }
    }
  }

  function removeFromCart(productId) {
    const index = cart.value.findIndex((item) => item.product.id === productId)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  function updateQuantity(productId, quantity) {
    const item = cart.value.find((item) => item.product.id === productId)
    if (item) {
      if (quantity > 0 && quantity <= item.product.stock) {
        item.quantity = quantity
      } else if (quantity === 0) {
        removeFromCart(productId)
      } else if (quantity > item.product.stock) {
        item.quantity = item.product.stock
      }
    }
  }

  function clearCart() {
    cart.value = []
  }

  return {
    cart,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
})
