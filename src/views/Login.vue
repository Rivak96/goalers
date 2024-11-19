<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div>
        <h1 class="text-center text-3xl font-bold text-blue-600">Goalers</h1>
        <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Start tracking your fitness journey
        </p>
      </div>

      <div class="mt-8 space-y-6">
        <!-- Google Sign In Button -->
        <div>
          <button
            @click="handleGoogleSignIn"
            :disabled="loading"
            class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 border-gray-300"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              class="w-5 h-5 mr-2"
            />
            {{ loading ? 'Signing in...' : 'Continue with Google' }}
          </button>
        </div>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-gray-50 text-gray-500">or</span>
          </div>
        </div>

        <!-- Email/Password Form -->
        <form class="mt-8 space-y-6" @submit.prevent="handleEmailSignIn">
          <div class="rounded-md shadow-sm space-y-4">
            <div>
              <label for="email" class="sr-only">Email address</label>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a 
                href="#" 
                @click.prevent="handleForgotPassword"
                class="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>

        <!-- Error Display -->
        <div v-if="error" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">{{ error }}</h3>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">{{ successMessage }}</h3>
            </div>
          </div>
        </div>

        <!-- Registration Link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <router-link
              to="/register"
              class="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up for free
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth'
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore'

const router = useRouter()
const auth = getAuth()
const db = getFirestore()

// Form data
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const error = ref('')
const successMessage = ref('')
const loading = ref(false)

const handleGoogleSignIn = async () => {
  try {
    loading.value = true
    error.value = ''
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    
    if (!userDoc.exists()) {
      // First time Google sign-in - create user document
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      })
      // Redirect to profile setup
      router.push('/profile-setup')
    } else {
      // Update last login
      await setDoc(doc(db, 'users', result.user.uid), {
        lastLogin: new Date().toISOString()
      }, { merge: true })
      // Redirect to dashboard
      router.push('/dashboard')
    }
  } catch (err) {
    console.error('Google sign-in error:', err)
    error.value = 'Failed to sign in with Google. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleEmailSignIn = async () => {
  try {
    loading.value = true
    error.value = ''
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/dashboard')
  } catch (err) {
    console.error('Email sign-in error:', err)
    error.value = 'Invalid email or password'
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = async () => {
  if (!email.value) {
    error.value = 'Please enter your email address'
    return
  }

  try {
    loading.value = true
    error.value = ''
    await sendPasswordResetEmail(auth, email.value)
    successMessage.value = 'Password reset email sent. Please check your inbox.'
  } catch (err) {
    console.error('Password reset error:', err)
    error.value = 'Failed to send password reset email'
  } finally {
    loading.value = false
  }
}
</script>