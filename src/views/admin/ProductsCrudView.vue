<template>
  <div>
    <HeaderComp> CRUD de Productos </HeaderComp>

    <main class="container py-4">
      <!-- Stats Section -->
      <div class="row justify-content-center mb-5">
        <div class="col-12 col-md-10">
          <div class="card glass-panel shadow-sm border-0 px-4 py-5 mb-5">
            <h3 class="fw-bold mb-4 text-center pb-2">
              <i class="bi bi-bar-chart-fill text-primary me-2"></i> Resumen de Inventario
            </h3>
            <div class="card-body d-flex justify-content-around text-center py-4">
              <div>
                <h2 class="text-primary mb-0 fw-bold">{{ productsStore.quantityProducts }}</h2>
                <span class="text-muted fw-semibold">SKUs Activos en Catálogo</span>
              </div>
              <div class="border-start border-2 border-secondary-subtle"></div>
              <div>
                <h2 class="text-success mb-0 fw-bold">{{ productsStore.totalStock }}</h2>
                <span class="text-muted fw-semibold">Unidades Totales en Almacén</span>
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
                  <v-btn
                    color="primary"
                    rounded="pill"
                    size="large"
                    class="px-5 shadow-sm me-3"
                    type="submit"
                    :disabled="!validForm"
                    v-if="!editState"
                    :loading="loading"
                  >
                    <v-icon start icon="mdi-plus-circle"></v-icon> Guardar Nuevo
                  </v-btn>
                  <v-btn
                    color="warning"
                    rounded="pill"
                    size="large"
                    class="px-5 shadow-sm me-3"
                    type="submit"
                    :disabled="!validForm"
                    v-if="editState"
                    :loading="loading"
                  >
                    <v-icon start icon="mdi-pencil"></v-icon> Actualizar
                  </v-btn>
                  <v-btn
                    variant="outlined"
                    color="secondary"
                    rounded="pill"
                    size="large"
                    class="px-4"
                    @click="cancelEdit"
                    v-if="editState"
                    :disabled="loading"
                  >
                    <v-icon start icon="mdi-close-circle"></v-icon> Cancelar
                  </v-btn>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Filtro y Tabla de Resultados -->
      <div
        v-if="productsStore.quantityProducts"
        class="card glass-panel shadow-sm border-0 p-4 mb-5"
      >
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <h4 class="mb-3 mb-md-0 fw-bold text-secondary">
            <i class="bi bi-list-ul me-2"></i>Listado de Productos
          </h4>
          <div style="width: 100%; max-width: 350px">
            <input
              type="text"
              v-model="filterName"
              class="form-control rounded-pill px-4"
              placeholder="🔍 Buscar por nombre..."
            />
          </div>
        </div>

        <v-alert v-if="filteredProducts.length === 0" type="info" variant="tonal" class="mb-4">
          No se encontraron productos que coincidan con la búsqueda.
        </v-alert>

        <div class="table-responsive" v-else>
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
              <tr v-for="(product, index) in filteredProducts" :key="product.id">
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
                <td class="text-nowrap">
                  <v-btn
                    color="warning"
                    variant="outlined"
                    icon="mdi-pencil"
                    size="small"
                    class="me-2"
                    @click="preEditProduct(product.id)"
                    title="Editar"
                  ></v-btn>
                  <v-btn
                    color="error"
                    variant="outlined"
                    icon="mdi-delete"
                    size="small"
                    @click="deleteProduct(product.id, product.name)"
                    title="Eliminar"
                  ></v-btn>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
      {{ snackbarText }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
document.title = 'CRUD Products'
import HeaderComp from '@/components/layouts/HeaderComp.vue'
import { onMounted, ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

import { useProductsStore } from '@/stores/products.store'

const productsStore = useProductsStore()
const route = useRoute()

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
const loading = ref(false)

//FILTRADO
const filterName = ref(route.query.search || '')
const filteredProducts = computed(() => {
  if (!filterName.value) return productsStore.products
  const search = filterName.value.toLowerCase()
  return productsStore.products.filter((p) => p.name.toLowerCase().includes(search))
})

watch(
  () => route.query.search,
  (newSearch) => {
    filterName.value = newSearch || ''
  },
)

//SNACKBAR DE VUETIFY
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const showSnackbar = (text, color = 'success') => {
  snackbarText.value = text
  snackbarColor.value = color
  snackbar.value = true
}

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
  loading.value = true

  let respuesta = await productsStore.addProduct(
    name.value,
    image.value,
    price.value,
    category.value,
    subcategory.value,
    stock.value,
    description.value,
  )

  loading.value = false

  if (respuesta.success) {
    showSnackbar(respuesta.success, 'success')
    resetForm()
  } else {
    showSnackbar(respuesta.error, 'error')
  }
}

const editProduct = async () => {
  loading.value = true
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
  loading.value = false

  if (respuesta.success) {
    showSnackbar(respuesta.success, 'success')
    resetForm()
    editState.value = false
  } else {
    showSnackbar(respuesta.error, 'error')
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
  Swal.fire({
    title: `¿Estás seguro que deseas eliminar el producto: ${name}?`,
    text: '¡La eliminación no se puede revertir!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Si, eliminar!',
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        let respuesta = await productsStore.deleteProduct(id, name)
        if (respuesta.success) showSnackbar(respuesta.success, 'success')
        else showSnackbar(respuesta.error, 'error')
      }
    })
    .catch((error) => {
      showSnackbar(error, 'error')
    })
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
