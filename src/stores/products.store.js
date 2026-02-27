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
  ])

  const products = ref([]);

  //{id:1, name: "Sofa 2 cuerpos Homie", price: 350000, category: "Hogar", description: "Descripción...", image: "https://placehold.co/300x200.png"},
  //{id:2, name: "Cocina de 6 platos Sindelen", price: 250000, category: "Cocina", description: "Descripción...", image: "https://placehold.co/300x200.png"},
  //{id:3, name: "Planta oreja de oso pequeña", price: 5000, category: "Jardín", description: "Descripción...", image: "https://placehold.co/300x200.png"},

  //GETTERS -> PROPIEDADES COMPUTADAS
  const quantityProducts = computed(() => products.value.length)

  //MÉTODOS -> ACTIONS
  async function fetchProducts() {
    try {
      const snap = await getDocs(collection(db, 'products'))

      products.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    } catch (error) {
      console.log('Error al cargar los datos de firebase...')
    }
  }

  //EXPORTACIÓN DE LO QUE QUEREMOS DEJAR PÚBLICO
  return { categories, products, quantityProducts, fetchProducts }
})
