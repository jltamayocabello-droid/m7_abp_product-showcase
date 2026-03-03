<template>
  <div>
    <HeaderComp>Nuestros productos</HeaderComp>

    <main class="container py-5">
      <section class="mb-5">
        <h2 class="text-center fw-bold mb-5">Ofertas Especiales</h2>
        <Carousel v-if="ofertas.length > 0" :breakpoints="breakpoints" :wrap-around="true">
          <Slide v-for="product in ofertas" :key="product.id">
            <div class="px-2 w-100 h-100 d-flex">
              <ProductCard :product="product" class="w-100 h-100" />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <div v-else class="text-center py-4 bg-light rounded-4">
          <p class="text-muted mb-0">No hay ofertas destacadas en este momento.</p>
        </div>
      </section>

      <!-- Shop by Category Carousel -->
      <section class="mb-5">
        <h2 class="text-center fw-bold mb-5">Categorías</h2>
        <Carousel
          v-if="mappedCategories.length > 0"
          :breakpoints="categoryBreakpoints"
          :wrap-around="false"
        >
          <Slide v-for="category in mappedCategories" :key="category.id">
            <div class="px-2 w-100">
              <div
                class="card category-card h-100 border-0 shadow-sm text-center py-4 rounded-4 bg-light"
                @click="scrollToCategory(category.name)"
                style="cursor: pointer"
              >
                <div class="card-body">
                  <i :class="['bi', category.icon, 'text-success']" style="font-size: 3rem"></i>
                  <h5 class="card-title mt-3 text-dark fw-semibold">{{ category.name }}</h5>
                </div>
              </div>
            </div>
          </Slide>
          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </section>

      <!-- Promotional Banners -->
      <section class="mb-5">
        <div class="row g-4">
          <div class="col-md-6">
            <div
              class="p-4 rounded-4 text-white d-flex align-items-center h-100 promo-banner promo-blue"
            >
              <div>
                <h3 class="fw-bold mb-2">Las mejores ofertas online</h3>
                <p class="mb-3">
                  Consigue precios preferenciales en nuestro catálogo web. Descuentos exclusivos.
                </p>
                <button
                  class="btn btn-light fw-semibold text-primary rounded-pill px-4"
                  @click="scrollToCategory('oferta')"
                >
                  Ver Ofertas
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div
              class="p-4 rounded-4 text-white d-flex align-items-center h-100 promo-banner promo-green"
            >
              <div>
                <h3 class="fw-bold mb-2">Envío Gratis</h3>
                <p class="mb-3">
                  Despacho gratuito en productos seleccionados y compras sobre $50.000.
                </p>
                <button
                  class="btn btn-light fw-semibold text-success rounded-pill px-4"
                  @click="scrollToCategory('categoryTop')"
                >
                  Comprar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Shop by Category Section (Grillas) -->
      <div id="categoryTop"></div>
      <section
        v-for="catGroup in categoriesWithProducts"
        :key="catGroup.categoryName"
        :id="'category-' + catGroup.categoryName"
        class="mb-5 pt-4"
      >
        <h2 class="text-center fw-bold mb-5">{{ catGroup.categoryName }}</h2>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          <div class="col" v-for="product in catGroup.products" :key="product.id">
            <ProductCard :product="product" class="h-100" />
          </div>
        </div>
      </section>

      <div v-if="productsStore.products.length === 0" class="text-center py-5">
        <p>Cargando productos...</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import HeaderComp from '@/components/layouts/HeaderComp.vue'
import { onMounted, computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products.store'
import { useCartStore } from '@/stores/cart.store'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const route = useRoute()

const formatPrice = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)
}

const scrollToCategory = (categoryName) => {
  if (categoryName === 'oferta') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (categoryName === 'categoryTop') {
    const el = document.getElementById('categoryTop')
    if (el) {
      window.scrollTo({ top: el.offsetTop - 50, behavior: 'smooth' })
    }
    return
  }

  const el = document.getElementById(`category-${categoryName}`)
  if (el) {
    const yOffset = -20 // Slight offset above the title
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

// Computed for Offers Carousel
const ofertas = computed(() => {
  return productsStore.products.filter((p) => p.subcategory === 'oferta')
})

// Computed for Category Grids
const categoriesWithProducts = computed(() => {
  const result = []
  productsStore.categories.forEach((category) => {
    // get products for this category
    const catProducts = productsStore.products.filter((p) => p.category === category.name)
    // Only push if there are products
    if (catProducts.length > 0) {
      result.push({
        categoryName: category.name,
        products: catProducts,
      })
    }
  })
  return result
})

const mappedCategories = computed(() => {
  const iconMap = {
    Hogar: 'bi-house-door',
    Cocina: 'bi-cup-hot',
    Jardín: 'bi-tree',
    Electrónica: 'bi-laptop',
    Ropa: 'bi-bag',
  }
  return productsStore.categories.map((cat) => ({
    ...cat,
    icon: iconMap[cat.name] || 'bi-tag',
  }))
})

const categoryBreakpoints = {
  0: { itemsToShow: 2, snapAlign: 'start' },
  576: { itemsToShow: 3, snapAlign: 'start' },
  768: { itemsToShow: 4, snapAlign: 'start' },
  992: { itemsToShow: 5, snapAlign: 'start' },
}

const breakpoints = {
  0: { itemsToShow: 1, snapAlign: 'center' },
  576: { itemsToShow: 2, snapAlign: 'start' },
  768: { itemsToShow: 3, snapAlign: 'start' },
  992: { itemsToShow: 4, snapAlign: 'start' },
}

onMounted(async () => {
  await productsStore.fetchProducts()

  // Si llegamos con un hash desde otra vista (como Home o Footer)
  if (route.hash) {
    nextTick(() => {
      // route.hash trae el formato '#category-X', extraemos 'X'
      const categoryName = route.hash.replace('#category-', '')
      setTimeout(() => {
        scrollToCategory(categoryName)
      }, 100)
    })
  }
})

// Por si cambia de hash estando ya dentro de ProductView (ej. usando el Footer)
watch(
  () => route.hash,
  (newHash) => {
    if (newHash && newHash.startsWith('#category-')) {
      const categoryName = newHash.replace('#category-', '')
      // Decodificamos la URI por si hay espacios (ej. '#category-Teclados%20Gamer')
      scrollToCategory(decodeURIComponent(categoryName))
    }
  },
)
</script>

<style lang="css" scoped>
.promo-banner {
  min-height: 200px;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.promo-banner:hover {
  transform: translateY(-3px);
}

.promo-blue {
  background-color: #0d6efd;
  background-image: linear-gradient(135deg, #0d6efd 0%, #0dcaf0 100%);
}

.promo-green {
  background-color: #198754;
  background-image: linear-gradient(135deg, #198754 0%, #20c997 100%);
}

.category-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
  border: 1px solid #198754 !important;
}

/* Adding subtle styles for a more premium look */
:deep(.carousel__prev),
:deep(.carousel__next) {
  background-color: white;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

:deep(.carousel__prev:hover),
:deep(.carousel__next:hover) {
  background-color: #f8f9fa;
  color: #000;
}

:deep(.carousel__pagination-button::after) {
  background-color: #ccc;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

:deep(.carousel__pagination-button--active::after) {
  background-color: #198754; /* Bootstrap success / FreshCart green */
  transform: scale(1.2);
}
</style>
