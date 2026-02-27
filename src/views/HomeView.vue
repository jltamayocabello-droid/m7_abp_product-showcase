<template>
<div>

<HeaderComp>Página Home</HeaderComp>

<div class="card-quantity-products">
      <p class="card-quantity-products__value">{{ productsStore.quantityProducts }}</p>
      <p class="card-quantity-products__text">Cantidad productos</p>
    </div>

</div>
</template>

<script setup>
import HeaderComp from '@/components/layouts/HeaderComp.vue';import { useProductsStore } from '../stores/products.store';
import { onMounted } from 'vue';

const productsStore = useProductsStore()

onMounted(async () => {
  await productsStore.fetchProducts();
});



</script>

<style lang="css" scoped>
.card-quantity-products {
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid black;
  padding:1rem;
  text-align: center;
}

.card-quantity-products__value {
  font-size: 5rem;
  font-weight: 700;
}

.card-quantity-products__text {
  font-size: 3rem;
  font-weight: 300;
}

</style>
