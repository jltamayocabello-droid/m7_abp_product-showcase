<template>
  <div>
    <HeaderComp> CRUD de productos </HeaderComp>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-7 col-md-6 col-lg-5">
          <form @submit.prevent="addProduct">
            <div class="mb-3">
              <label class="form-label">Nombre: </label>
              <input type="text" class="form-control" required v-model="name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Descripción: </label>
              <input type="text" class="form-control" required v-model="description" />
            </div>
            <div class="mb-3">
              <label class="form-label">Imagen: </label>
              <input type="url" class="form-control" required v-model="image" />
            </div>
            <div class="mb-3">
              <label class="form-label">Precio: </label>
              <input type="number" class="form-control" min="1" required v-model="price" />
            </div>
            <div class="mb-3">
              <label class="form-label">Categoría: </label>
              <select class="form-control" required v-model="category">
                <option value="">Debe elegir una categoría</option>
                <option
                  :value="category.name"
                  v-for="category in productsStore.categories"
                  :key="category.di"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <button class="btn btn-primary" type="submit" :disabled="!validForm">Crear</button>
            </div>
          </form>
        </div>
      </div>

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
  </div>
</template>

<script setup>
document.title = 'CRUD Products'
import HeaderComp from '@/components/layouts/HeaderComp.vue'
import { onMounted, ref, computed } from 'vue'

import { useProductsStore } from '@/stores/products.store'

const productsStore = useProductsStore()

const name = ref('')
const image = ref('https://placehold.co/300x200.png')
const price = ref(1)
const category = ref('')
const description = ref('')

//COMPUTED
const validForm = computed(() => {
  let rulesForm =
    name.value &&
    image.value &&
    price.value &&
    category.value &&
    price.value > 0 &&
    description.value
  return rulesForm
})

//ACTIONS

const resetForm = () => {
  name.value = ''
  image.value = 'https://placehold.co/300x200.png'
  price.value = 1
  category.value = ''
  description.value = ''
}

const addProduct = async () => {
  let respuesta = await productsStore.addProduct(
    name.value,
    image.value,
    price.value,
    category.value,
    description.value,
  )

  if (respuesta.success) {
    alert(respuesta.success)
    resetForm()
  } else {
    alert(respuesta.error)
  }
}

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script>

<style lang="css" scoped>
tr,
th,
td {
  align-content: center;
}
</style>
