import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', () => {


//ESTADOS

const categories = ref([
{id:1, name: "Hogar"},
{id:2, name: "Cocina"},
{id:3, name: "Jardín"}
]);


const products = ref([
{id:1, name: "Sofa 2 cuerpos Homie", price: 350000, category: "Hogar", description: "Descripción...", image: "https://placehold.co/300x200.png"},
{id:2, name: "Cocina de 6 platos Sindelen", price: 250000, category: "Cocina", description: "Descripción...", image: "https://placehold.co/300x200.png"},
{id:3, name: "Planta oreja de oso pequeña", price: 5000, category: "Jardín", description: "Descripción...", image: "https://placehold.co/300x200.png"},
]);


//GETTERS -> PROPIEDADES COMPUTADAS
const quantityProducts = computed(() => products.value.length);


//MÉTODOS -> ACTIONS
// function increment() {
// count.value++
// }


//EXPORTACIÓN DE LO QUE QUEREMOS DEJAR PÚBLICO
return { categories, products }
})
