import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { db } from '@/firebaseConfig.js'

import { collection, getDoc, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore'

export const useProductsStore = defineStore('products', () => {
  //ESTADOS

  const categories = ref([
    { id: 1, name: 'Hogar' },
    { id: 2, name: 'Cocina' },
    { id: 3, name: 'Jardín' },
    { id: 4, name: 'Electrónica' },
    { id: 5, name: 'Ropa' },
  ])

  const subcategories = ref([
    { id: 1, name: 'precio normal' },
    { id: 2, name: 'oferta' },
    { id: 3, name: 'agotado' },
  ])

  const products = ref([])

  //GETTERS -> PROPIEDADES COMPUTADAS
  const quantityProducts = computed(() => products.value.length)

  const totalStock = computed(() => {
    return products.value.reduce((acc, product) => acc + (product.stock || 0), 0)
  })

  //MÉTODOS -> ACTIONS

  function findProduct(id) {
    return products.value.find((p) => p.id == id)
  }

  //MÉTODOS CRUD FIRESTORE
  async function fetchProducts() {
    try {
      const snap = await getDocs(collection(db, 'products'))

      products.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    } catch (error) {
      console.log(error)
      console.log('Error al cargar los datos de firebase...')
    }
  }

  async function addProduct(name, image, price, category, subcategory, stock, description) {
    try {
      let data = { name, image, price, category, subcategory, stock, description }
      const docRef = await addDoc(collection(db, 'products'), data)

      products.value.push({ id: docRef.id, ...data })

      return { success: 'Producto creado con éxito.' }
    } catch (error) {
      console.log(error)

      return { error: 'Error al intentar agregar el producto.' }
    }
  }

  async function deleteProduct(id, name) {
    try {
      await deleteDoc(doc(db, 'products', id))

      let indexProduct = products.value.findIndex((p) => p.id == id)
      products.value.splice(indexProduct, 1)

      return { success: `Producto '${name}', eliminado correctamente.` }
    } catch (error) {
      console.log(error)

      return { error: `Error al intentar eliminar el producto ${name}.` }
    }
  }

  async function editProduct(name, image, price, category, subcategory, stock, description, id) {
    try {
      let data = { name, image, price, category, subcategory, stock, description }

      await updateDoc(doc(db, 'products', id), data)

      let indexProduct = products.value.findIndex((p) => p.id == id)

      products.value[indexProduct] = { ...data, id }

      return { success: 'Producto editado con éxito.' }
    } catch (error) {
      console.log(error)

      return { error: 'Error al intentar editar el producto.' }
    }
  }

  function filterProductsByCategory(category) {
    return products.value.filter(
      (product) => product.category.toLowerCase() == category.toLowerCase(),
    )
  }

  //EXPORTACIÓN DE LO QUE QUEREMOS DEJAR PÚBLICO
  return {
    categories,
    subcategories,
    products,
    quantityProducts,
    filterProductsByCategory,
    totalStock,
    fetchProducts,
    addProduct,
    deleteProduct,
    findProduct,
    editProduct,
  }
})
