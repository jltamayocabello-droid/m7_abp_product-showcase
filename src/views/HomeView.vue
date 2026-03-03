<template>
  <div>
    <HeaderComp><em>Bienvenid@, disfrute de nuestras ofertas</em></HeaderComp>

    <main class="container py-5">
      <!-- Hero Banner -->
      <section class="mb-5">
        <div
          class="p-5 text-center bg-image rounded-4 shadow-sm"
          style="
            background-image: url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop');
            height: 350px;
            background-size: cover;
            background-position: center;
            position: relative;
          "
        >
          <div
            class="mask rounded-4 d-flex justify-content-center align-items-center h-100"
            style="
              background-color: rgba(0, 0, 0, 0.5);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            "
          >
            <div class="text-white px-3">
              <h1 class="mb-3 fw-bold display-4">Explora Nuestro Catálogo Premium</h1>
              <h4 class="mb-3">Las mejores marcas y ofertas en un solo lugar</h4>
              <RouterLink
                class="btn btn-success btn-lg mt-2 fw-semibold"
                to="/products"
                role="button"
                >Ver Catálogo</RouterLink
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Ofertas Destacadas -->
      <section>
        <div class="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 class="mb-1 fw-bold">Ofertas Destacadas</h2>
            <p class="text-muted mb-0">
              Revisa nuestros productos en oferta ({{ ofertas.length }} productos)
            </p>
          </div>
          <RouterLink to="/products" class="text-decoration-none text-success fw-semibold"
            >Ver todos los productos <i class="bi bi-arrow-right"></i
          ></RouterLink>
        </div>

        <div v-if="ofertas.length > 0">
          <Carousel :breakpoints="breakpoints" :wrap-around="true">
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
        </div>
        <div v-else class="text-center py-5 bg-light rounded-4">
          <p class="text-muted mb-0">Aún no hay ofertas disponibles. ¡Revisa más tarde!</p>
        </div>
      </section>

      <!-- Section: Shop by Categories -->
      <section class="mt-5 pt-4">
        <h2 class="mb-1 fw-bold">Comprar por Categorías</h2>
        <p class="text-muted mb-0">
          Explora la gran variedad de nuestro catálogo por departamentos.
        </p>

        <div class="mb-4"></div>
        <div class="row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
          <div class="col" v-for="category in mappedCategories" :key="category.id">
            <RouterLink
              :to="{ path: '/products', hash: '#category-' + category.name }"
              class="text-decoration-none"
            >
              <div
                class="card category-card h-100 border-0 shadow-sm text-center py-4 rounded-4 bg-light"
              >
                <div class="card-body">
                  <i :class="['bi', category.icon, 'text-success']" style="font-size: 3rem"></i>
                  <h5 class="card-title mt-3 text-dark fw-semibold">{{ category.name }}</h5>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import HeaderComp from '@/components/layouts/HeaderComp.vue'
import { useProductsStore } from '@/stores/products.store'
import { onMounted, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const productsStore = useProductsStore()

const ofertas = computed(() => {
  return productsStore.products.filter((p) => p.subcategory === 'oferta')
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

const breakpoints = {
  0: { itemsToShow: 1, snapAlign: 'center' },
  576: { itemsToShow: 2, snapAlign: 'start' },
  768: { itemsToShow: 3, snapAlign: 'start' },
  992: { itemsToShow: 4, snapAlign: 'start' },
}

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script>

<style lang="css" scoped>
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

/* Carousel Custom Styles */
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
  background-color: #198754;
  transform: scale(1.2);
}
</style>
