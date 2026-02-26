<template>
  <div>
    <HeaderComp>Administrar productos</HeaderComp>
  </div>

  <main class="container">
    <div v-if="productsStore.quantityProducts">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Imagen</th>
            <th scope="col">Precio</th>
            <th scope="col">Categoría</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in productsStore.products" :key="product.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ product.name }}</td>
            <td>
              <img :src="product.image" :alt="product.description" width="80" />
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.category }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/layouts/HeaderComp.vue'
import { onMounted } from 'vue'

import { useProductsStore } from '@/stores/products.store'

const productsStore = useProductsStore()

onMounted(() => {
  productsStore.fetchProducts()
})
</script>
