// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBFYVeHtPmSlXEREtCyPZmycCVgMbJh1NM',
  authDomain: 'm7-abp-vue-product-showcase.firebaseapp.com',
  projectId: 'm7-abp-vue-product-showcase',
  storageBucket: 'm7-abp-vue-product-showcase.firebasestorage.app',
  messagingSenderId: '410921028274',
  appId: '1:410921028274:web:20cad24f5473c6137c57ab',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }
