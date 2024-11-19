<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Complete Your Profile</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Help us personalize your experience
        </p>
      </div>
  
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" @submit.prevent="handleSubmit">
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
  
            <!-- Activity Level -->
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
                  <option value="1.375">Lightly Active (1-3 days/week)</option>
                  <option value="1.55">Moderately Active (3-5 days/week)</option>
                  <option value="1.725">Very Active (6-7 days/week)</option>
                  <option value="1.9">Extremely Active (Hard exercise/sports & physical job)</option>
                </select>
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
  
            <!-- Submit Button -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {{ loading ? 'Saving...' : 'Complete Setup' }}
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
  import { updateUserProfile, getCurrentUser } from '@/firebase'
  
  const router = useRouter()
  const error = ref('')
  const loading = ref(false)
  
  const formData = ref({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: '1.2',
    goal: 'maintain'
  })
  
  const handleSubmit = async () => {
    try {
      loading.value = true
      const currentUser = getCurrentUser()
      
      if (!currentUser) {
        throw new Error('No authenticated user')
      }
  
      await updateUserProfile(currentUser.uid, {
        weight: parseFloat(formData.value.weight),
        height: parseFloat(formData.value.height),
        age: parseInt(formData.value.age),
        gender: formData.value.gender,
        activityLevel: formData.value.activityLevel,
        goal: formData.value.goal,
        profileCompleted: true
      })
  
      router.push('/dashboard')
    } catch (err) {
      console.error('Profile setup error:', err)
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  </script>