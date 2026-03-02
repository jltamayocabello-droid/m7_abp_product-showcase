import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { auth } from './firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useUserStore } from './stores/user.store'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const userStore = useUserStore()
let mounted = false

onAuthStateChanged(auth, async (firebaseUser) => {
  await userStore.setUserFromAuth(firebaseUser)
  if (!mounted) {
    app.mount('#app')
    mounted = true
  }
})

