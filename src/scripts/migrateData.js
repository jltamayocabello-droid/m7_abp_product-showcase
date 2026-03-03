import { db } from '@/firebaseConfig.js'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

export async function migrateProducts() {
  console.log('Starting migration of legacy products...')
  try {
    const snap = await getDocs(collection(db, 'products'))
    const updates = snap.docs.map(async (d) => {
      const data = d.data()
      let updatedData = {}
      let needsUpdate = false

      // Assign default subcategory if missing or "N/A"
      if (!data.subcategory || data.subcategory === 'N/A' || data.subcategory === 'n/a') {
        updatedData.subcategory = 'agotado'
        needsUpdate = true
      }

      // Ensure price is realistic for CLP (> 100.000)
      if (data.price < 100000) {
        // If it's something like 500, we might want to multiply it, or just set a flat minimum.
        // Let's multiply if it's very small, or add to make it > 100000.
        updatedData.price = data.price < 1000 ? data.price * 100000 : 100000 + data.price
        needsUpdate = true
      }

      // Update specific description for 'microondas' (case-insensitive check)
      if (data.name && data.name.toLowerCase().includes('microondas')) {
        updatedData.description =
          'Microondas digital con plato giratorio de cristal, múltiples niveles de potencia y función de descongelado automático. Capacidad ideal para la familia.'
        needsUpdate = true
      }

      // Defaults for missing stock
      if (data.stock === undefined) {
        updatedData.stock = 10
        needsUpdate = true
      }

      if (needsUpdate) {
        await updateDoc(doc(db, 'products', d.id), updatedData)
        console.log(`Updated product ${data.name}`)
      }
    })

    await Promise.all(updates)
    console.log('Migration completed!')
  } catch (error) {
    console.error('Error migrating products:', error)
  }
}
