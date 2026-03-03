import { db } from '@/firebaseConfig.js'
import { collection, addDoc } from 'firebase/firestore'

export const seedProductsData = [
  {
    name: 'Smartphone Galaxy S21',
    category: 'Electrónica',
    subcategory: 'oferta',
    stock: 15,
    price: 699,
    description: 'Teléfono inteligente de alta gama',
    image: 'https://placehold.co/300x200?text=Smartphone',
  },
  {
    name: 'Auriculares Inalámbricos',
    category: 'Electrónica',
    subcategory: 'precio normal',
    stock: 50,
    price: 99,
    description: 'Auriculares con cancelación de ruido',
    image: 'https://placehold.co/300x200?text=Auriculares',
  },
  {
    name: 'Camiseta de Algodón',
    category: 'Ropa',
    subcategory: 'precio normal',
    stock: 100,
    price: 20,
    description: 'Camiseta 100% algodón orgánico',
    image: 'https://placehold.co/300x200?text=Camiseta',
  },
  {
    name: 'Chaqueta de Invierno',
    category: 'Ropa',
    subcategory: 'oferta',
    stock: 10,
    price: 120,
    description: 'Chaqueta térmica ideal para el frío',
    image: 'https://placehold.co/300x200?text=Chaqueta',
  },
  {
    name: 'Set de Ollas y Sartenes',
    category: 'Cocina',
    subcategory: 'oferta',
    stock: 25,
    price: 150,
    description: 'Material antiadherente de alta resistencia',
    image: 'https://placehold.co/300x200?text=Cocina',
  },
  {
    name: 'Sofá de 3 Cuerpos',
    category: 'Hogar',
    subcategory: 'precio normal',
    stock: 5,
    price: 500,
    description: 'Sofá cómodo para toda la familia',
    image: 'https://placehold.co/300x200?text=Sofa',
  },
  {
    name: 'Lámpara de Escritorio',
    category: 'Hogar',
    subcategory: 'oferta',
    stock: 30,
    price: 45,
    description: 'Luz LED regulable para escritorio',
    image: 'https://placehold.co/300x200?text=Lampara',
  },
  {
    name: 'Manguera de Riego',
    category: 'Jardín',
    subcategory: 'precio normal',
    stock: 40,
    price: 25,
    description: 'Manguera expandible de 15 metros',
    image: 'https://placehold.co/300x200?text=Manguera',
  },
  {
    name: 'Pala de Jardinería',
    category: 'Jardín',
    subcategory: 'oferta',
    stock: 80,
    price: 15,
    description: 'Pala de metal resistente para mover tierra',
    image: 'https://placehold.co/300x200?text=Pala',
  },
  {
    name: 'Licuadora Profesional',
    category: 'Cocina',
    subcategory: 'precio normal',
    stock: 20,
    price: 90,
    description: 'Licuadora de 1000W con vaso de vidrio',
    image: 'https://placehold.co/300x200?text=Licuadora',
  },
]

export async function seedDatabase() {
  const promises = seedProductsData.map(async (prod) => {
    return await addDoc(collection(db, 'products'), prod)
  })
  await Promise.all(promises)
  console.log('10 products seeded successfully')
}
