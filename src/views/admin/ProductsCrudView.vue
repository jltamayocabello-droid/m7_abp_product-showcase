<template>
  <div>
    <HeaderComp> CRUD de productos </HeaderComp>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-7 col-md-6 col-lg-5">
          <form @submit.prevent="createOrEdit">
            <div>
              <input type="hidden" class="form-control" v-model="idProduct" />
            </div>
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
                  :key="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Subcategoría: </label>
              <select class="form-control" required v-model="subcategory">
                <option value="">Debe elegir una subcategoría</option>
                <option :value="sub.name" v-for="sub in productsStore.subcategories" :key="sub.id">
                  {{ sub.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Stock: </label>
              <input type="number" class="form-control" min="0" required v-model="stock" />
            </div>
            <div>
              <button
                class="btn btn-primary"
                type="submit"
                :disabled="!validForm"
                v-if="!editState"
              >
                Crear
              </button>
              <button
                class="btn btn-warning me-2"
                type="submit"
                :disabled="!validForm"
                v-if="editState"
              >
                Editar
              </button>
              <button
                class="btn btn-secondary"
                type="submit"
                :disabled="!validForm"
                v-if="editState"
                @click="cancelEdit"
              >
                Cancelar edición
              </button>
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
              <th scope="col">Subcategoría</th>
              <th scope="col">Stock</th>
              <th scope="col">Acciones</th>
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
              <td>{{ product.subcategory || 'N/A' }}</td>
              <td>{{ product.stock !== undefined ? product.stock : 'N/A' }}</td>
              <td>
                <button class="btn btn-warning me-2" @click="preEditProduct(product.id)">
                  Editar
                </button>
                <button class="btn btn-danger" @click="deleteProduct(product.id, product.name)">
                  Eliminar
                </button>
              </td>
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
const subcategory = ref('')
const stock = ref(0)
const description = ref('')
const idProduct = ref('')

//ESTADO DE EDICIÓN
const editState = ref(false)

//COMPUTED
const validForm = computed(() => {
  let rulesForm =
    name.value &&
    image.value &&
    price.value &&
    category.value &&
    subcategory.value &&
    stock.value !== '' &&
    stock.value >= 0 &&
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
  subcategory.value = ''
  stock.value = 0
  description.value = ''
  idProduct.value = ''
}

const addProduct = async () => {
  let respuesta = await productsStore.addProduct(
    name.value,
    image.value,
    price.value,
    category.value,
    subcategory.value,
    stock.value,
    description.value,
  )

  if (respuesta.success) {
    alert(respuesta.success)
    resetForm()
  } else {
    alert(respuesta.error)
  }
}

const editProduct = async () => {
  let respuesta = await productsStore.editProduct(
    name.value,
    image.value,
    price.value,
    category.value,
    subcategory.value,
    stock.value,
    description.value,
    idProduct.value,
  )

  if (respuesta.success) {
    alert(respuesta.success)
    resetForm()
  } else {
    alert(respuesta.error)
  }
}

const createOrEdit = () => {
  if (editState.value) {
    editProduct()
  } else {
    addProduct()
  }
}

const deleteProduct = async (id, name) => {
  if (!confirm('Está seguro que desea elminar el producto: ' + name)) {
    return
  }

  let respuesta = await productsStore.deleteProduct(id, name)

  if (respuesta.success) {
    alert(respuesta.success)
  } else {
    alert(respuesta.error)
  }
}

const preEditProduct = async (id) => {
  const product = productsStore.findProduct(id)

  name.value = product.name
  image.value = product.image
  price.value = product.price
  category.value = product.category
  subcategory.value = product.subcategory || ''
  stock.value = product.stock !== undefined ? product.stock : 0
  description.value = product.description
  idProduct.value = product.id

  console.log(idProduct.value)
  editState.value = true
}

const cancelEdit = () => {
  editState.value = false
  resetForm()
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
