<template>
  <div>
    <HeaderComp> CRUD de Productos </HeaderComp>

    <main class="container py-4">
      <!-- Stats Section -->
      <div class="row justify-content-center mb-5">
        <div class="col-12 col-md-10">
          <div class="card glass-panel shadow-sm border-0">
            <div class="card-body d-flex justify-content-around text-center py-4">
              <div>
                <h2 class="text-primary mb-0 fw-bold">{{ productsStore.quantityProducts }}</h2>
                <span class="text-muted fw-semibold">Productos Disponibles</span>
              </div>
              <div class="border-start border-2 border-secondary-subtle"></div>
              <div>
                <h2 class="text-success mb-0 fw-bold">{{ productsStore.totalStock }}</h2>
                <span class="text-muted fw-semibold">Stock Total Disponible (Unidades)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulario CRUD -->
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <div class="card glass-panel shadow-lg border-0 px-4 py-5 mb-5">
            <h3 class="fw-bold mb-4 text-center pb-2">
              <i class="bi bi-box-seam text-primary me-2"></i> Gestión de Productos
            </h3>

            <form @submit.prevent="createOrEdit">
              <div>
                <input type="hidden" class="form-control" v-model="idProduct" />
              </div>

              <div class="row g-4">
                <!-- Fila 1: Nombre y Precio -->
                <div class="col-md-8">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="formName"
                      required
                      v-model="name"
                      placeholder="Nombre del producto"
                    />
                    <label for="formName" class="fw-semibold text-muted">Nombre del Producto</label>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control"
                      id="formPrice"
                      min="1"
                      required
                      v-model="price"
                      placeholder="Precio"
                    />
                    <label for="formPrice" class="fw-semibold text-muted">Precio (CLP)</label>
                  </div>
                </div>

                <!-- Fila 2: Categoría y Subcategoría -->
                <div class="col-md-6">
                  <div class="form-floating">
                    <select class="form-select" id="formCat" required v-model="category">
                      <option value="" disabled>Seleccione...</option>
                      <option
                        :value="cat.name"
                        v-for="cat in productsStore.categories"
                        :key="cat.id"
                      >
                        {{ cat.name }}
                      </option>
                    </select>
                    <label for="formCat" class="fw-semibold text-muted">Categoría</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <select class="form-select" id="formSubcat" required v-model="subcategory">
                      <option value="" disabled>Seleccione...</option>
                      <option
                        :value="sub.name"
                        v-for="sub in productsStore.subcategories"
                        :key="sub.id"
                      >
                        {{ sub.name }}
                      </option>
                    </select>
                    <label for="formSubcat" class="fw-semibold text-muted">Subcategoría</label>
                  </div>
                </div>

                <!-- Fila 3: Stock e Imagen -->
                <div class="col-md-4">
                  <div class="form-floating">
                    <input
                      type="number"
                      class="form-control"
                      id="formStock"
                      min="0"
                      required
                      v-model="stock"
                      placeholder="0"
                    />
                    <label for="formStock" class="fw-semibold text-muted">Stock Final</label>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="form-floating">
                    <input
                      type="url"
                      class="form-control"
                      id="formImg"
                      required
                      v-model="image"
                      placeholder="https://"
                    />
                    <label for="formImg" class="fw-semibold text-muted">URL Imagen</label>
                  </div>
                </div>

                <!-- Fila 4: Descripción -->
                <div class="col-12">
                  <div class="form-floating">
                    <textarea
                      class="form-control"
                      id="formDesc"
                      required
                      v-model="description"
                      style="height: 100px"
                      placeholder="Detalle..."
                    ></textarea>
                    <label for="formDesc" class="fw-semibold text-muted"
                      >Descripción detallada</label
                    >
                  </div>
                </div>

                <!-- Fila 5: Acciones (Centradas) -->
                <div class="col-12 text-center mt-5">
                  <button
                    class="btn btn-primary btn-lg rounded-pill px-5 shadow-sm me-3"
                    type="submit"
                    :disabled="!validForm"
                    v-if="!editState"
                  >
                    <i class="bi bi-plus-circle me-1"></i> Guardar Nuevo
                  </button>
                  <button
                    class="btn btn-warning btn-lg rounded-pill px-5 shadow-sm me-3"
                    type="submit"
                    :disabled="!validForm"
                    v-if="editState"
                  >
                    <i class="bi bi-pencil-square me-1"></i> Actualizar
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-lg rounded-pill px-4"
                    type="button"
                    v-if="editState"
                    @click="cancelEdit"
                  >
                    <i class="bi bi-x-circle me-1"></i> Cancelar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Tabla de Resultados -->
      <div
        v-if="productsStore.quantityProducts"
        class="card glass-panel shadow-sm border-0 p-4 mb-5"
      >
        <div class="table-responsive">
          <table class="table table-striped table-hover align-middle">
            <thead class="table-dark">
              <tr>
                <th scope="col">N°</th>
                <th scope="col">Nombre</th>
                <th scope="col">Descripción</th>
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
                <td
                  style="max-width: 200px; cursor: pointer; transition: all 0.3s ease"
                  :class="{ 'text-truncate': expandedDescriptionId !== product.id }"
                  @click="toggleDescription(product.id)"
                  :title="
                    expandedDescriptionId === product.id
                      ? 'Clic para contraer'
                      : 'Clic para expandir'
                  "
                >
                  {{ product.description }}
                </td>
                <td>
                  <img :src="product.image" :alt="product.description" width="80" />
                </td>
                <td>{{ formatPrice(product.price) }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.subcategory || 'N/A' }}</td>
                <td>{{ product.stock !== undefined ? product.stock : 'N/A' }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-warning rounded-circle me-2"
                    @click="preEditProduct(product.id)"
                    title="Editar"
                  >
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger rounded-circle"
                    @click="deleteProduct(product.id, product.name)"
                    title="Eliminar"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

//ESTADO EXPANSIÓN DE DESCRIPCIÓN
const expandedDescriptionId = ref(null)

const toggleDescription = (id) => {
  if (expandedDescriptionId.value === id) {
    expandedDescriptionId.value = null
  } else {
    expandedDescriptionId.value = id
  }
}

// UTILS
const formatPrice = (value) => {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)
}

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

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
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
