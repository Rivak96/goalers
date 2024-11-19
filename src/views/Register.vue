<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-bold text-gray-900">Create your account</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">
          sign in to your existing account
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div class="mt-1">
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formData.email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="formData.password"
                type="password"
                autocomplete="new-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Physical Information -->
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <!-- Weight Input -->
              <div>
                <label for="weight" class="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <div class="mt-1">
                  <input
                    id="weight"
                    v-model="formData.weight"
                    type="number"
                    step="0.1"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <!-- Height Input -->
              <div>
                <label for="height" class="block text-sm font-medium text-gray-700">
                  Height (cm)
                </label>
                <div class="mt-1">
                  <input
                    id="height"
                    v-model="formData.height"
                    type="number"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <!-- Age Input -->
              <div>
                <label for="age" class="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <div class="mt-1">
                  <input
                    id="age"
                    v-model="formData.age"
                    type="number"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <!-- Gender Select -->
              <div>
                <label for="gender" class="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div class="mt-1">
                  <select
                    id="gender"
                    v-model="formData.gender"
                    required
                    class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Goal Select -->
            <div>
              <label for="goal" class="block text-sm font-medium text-gray-700">
                Primary Goal
              </label>
              <div class="mt-1">
                <select
                  id="goal"
                  v-model="formData.goal"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="lose">Weight Loss</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>
            </div>

            <!-- Activity Level Select -->
            <div>
              <label for="activityLevel" class="block text-sm font-medium text-gray-700">
                Activity Level
              </label>
              <div class="mt-1">
                <select
                  id="activityLevel"
                  v-model="formData.activityLevel"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="1.2">Sedentary (Little or no exercise)</option>
                  <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
                  <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
                  <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
                  <option value="1.9">Extremely Active (Very hard exercise & physical job)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Error Display -->
          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  {{ error }}
                </h3>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="loading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser  } from '@/firebase'

const router = useRouter()
const error = ref('')
const loading = ref(false)

const formData = ref({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  weight: '',
  height: '',
  age: '',
  gender: 'male',
  goal: 'maintain',
  activityLevel: '1.2'
})

const validateForm = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    throw new Error('Passwords do not match')
  }

  if (formData.value.password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  if (parseFloat(formData.value.weight) <= 0) {
    throw new Error('Please enter a valid weight')
  }

  if (parseFloat(formData.value.height) <= 0) {
    throw new Error('Please enter a valid height')
  }

  if (parseInt(formData.value.age) <= 0) {
    throw new Error('Please enter a valid age')
  }
}

const handleRegister = async () => {
  try {
    loading.value = true
    error.value = ''

    // Validate form
    validateForm()

    // Register user
    await registerUser (
      formData.value.email,
      formData.value.password,
      {
        name: formData.value.name,
        weight: parseFloat(formData.value.weight),
        height: parseFloat(formData.value.height),
        age: parseInt(formData.value.age),
        gender: formData.value.gender,
        goal: formData.value.goal,
        activityLevel: parseFloat(formData.value.activityLevel),
        progress: []
      }
    )

    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
    console.error('Registration error:', err)
  } finally {
    loading.value = false
  }
}
</script>