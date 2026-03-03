<template>
  <div>
    <HeaderComp>Inicio</HeaderComp>

    <main class="container py-5">
      <!-- Section: Total Products Stat (Original) -->
      <section class="mb-5 d-flex justify-content-center">
        <div class="card card-quantity-products shadow-sm border-0 bg-light rounded-4">
          <div class="card-body text-center p-5">
            <h1 class="card-quantity-products__value text-success mb-0">
              {{ productsStore.quantityProducts }}
            </h1>
            <p class="card-quantity-products__text text-muted fw-bold">Productos Disponibles</p>
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
.card-quantity-products {
  max-width: 350px;
  transition: transform 0.3s ease;
}

.card-quantity-products:hover {
  transform: translateY(-5px);
}

.card-quantity-products__value {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
}

.card-quantity-products__text {
  font-size: 1.5rem;
  letter-spacing: 1px;
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
