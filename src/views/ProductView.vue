<template>
  <div>
    <HeaderComp>Nuestros productos</HeaderComp>

    <main class="container py-5">
      <section>
        <Carousel
          v-if="productsStore.products.length"
          :breakpoints="breakpoints"
          :wrap-around="true"
        >
          <Slide v-for="product in productsStore.products" :key="product.id">
            <div class="px-2 w-100 h-100 d-flex">
              <ProductCard :product="product" class="w-100 h-100" />
            </div>
          </Slide>

          <template #addons>
            <Navigation />
            <Pagination />
          </template>
        </Carousel>
        <div v-else class="text-center py-5">
          <p>Cargando productos...</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import HeaderComp from '@/components/layouts/HeaderComp.vue'
import { onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductsStore } from '@/stores/products.store'

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const productsStore = useProductsStore()

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
