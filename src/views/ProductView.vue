<template>
  <div>
    <HeaderComp>Nuestros productos</HeaderComp>

    <main class="container">
      <section>
        <div class="row justify-content-evenly g-3">
          <div class="col-12 col-sm6 col-md-4 col-lg-3" v-for="product in productsStore.products" :key="product.id">
            <ProductCard :product />
          </div>
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

const productsStore = useProductsStore()

onMounted(async() => {
  await productsStore.fetchProducts();
})
</script>

<style lang="css" scoped></style>
