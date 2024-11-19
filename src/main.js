import './index.css'
import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import App from './App.vue'
import router from './router'
import './firebase' // This will initialize Firebase

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAPK_2q1fWziv8p9zM0LUERYOw9VG9_Hfc",
  authDomain: "mystorage-8afa5.firebaseapp.com",
  databaseURL: "https://mystorage-8afa5.firebaseio.com",
  projectId: "mystorage-8afa5",
  storageBucket: "mystorage-8afa5.firebasestorage.app",
  messagingSenderId: "138162225219",
  appId: "1:138162225219:web:71b347c042a4a0139dd4f6",
  measurementId: "G-XH05QZWNVT"
}

// Initialize Firebase
initializeApp(firebaseConfig)

// Create Vue app
const app = createApp(App)

// Use router
app.use(router)

// Mount app
app.mount('#app')