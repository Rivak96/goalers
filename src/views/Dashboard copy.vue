<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">Goalers</h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-gray-700">Welcome, {{ userData?.name || 'User' }}</span>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <!-- BMR Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Base BMR</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ calculatedBMR.toFixed(0) }} kcal</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- TDEE Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Daily Calories (TDEE)</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ calculatedTDEE.toFixed(0) }} kcal</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Target Calories Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Target Daily Calories</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ targetCalories.toFixed(0) }} kcal</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Grid Layout -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Calculator Section -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Update Measurements</h3>
            
            <form @submit.prevent="updateCalculations" class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label for="weight" class="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  v-model="weight"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="height" class="block text-sm font-medium text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  v-model="height"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  v-model="age"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div>
                <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  v-model="gender"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label for="activityLevel" class="block text-sm font-medium text-gray-700">Activity Level</label>
                <select
                  v-model="activityLevel"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="1.2">Sedentary</option>
                  <option value="1.375">Lightly Active</option>
                  <option value="1.55">Moderately Active</option>
                  <option value="1.725">Very Active</option>
                  <option value="1.9">Extremely Active</option>
                </select>
              </div>

              <div>
                <label for="goal" class="block text-sm font-medium text-gray-700">Goal</label>
                <select
                  v-model="goal"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="lose">Weight Loss</option>
                  <option value="maintain">Maintain</option>
                  <option value="gain">Weight Gain</option>
                </select>
              </div>

              <div>
                <label for="dietType" class="block text-sm font-medium text-gray-700">Diet Type</label>
                <select
                  v-model="dietType"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="balanced">Balanced</option>
                  <option value="lowCarb">Low Carb</option>
                  <option value="highCarb">High Carb</option>
                </select>
              </div>

              <div class="sm:col-span-2">
                <button
                  type="submit"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update Calculations
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Macronutrients Section -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Daily Macronutrients</h3>
            
            <div class="mt-5 space-y-4">
              <!-- Protein -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <label class="text-sm font-medium text-gray-700">Protein</label>
                  <span class="text-sm text-gray-500">{{ macros.protein.toFixed(0) }}g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: `${(macros.protein / (macros.protein + macros.carbs + macros.fats)) * 100}%` }"
                  ></div>
                </div>
              </div>

              <!-- Carbs -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <label class="text-sm font-medium text-gray-700">Carbohydrates</label>
                  <span class="text-sm text-gray-500">{{ macros.carbs.toFixed(0) }}g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-green-500 h-2 rounded-full"
                    :style="{ width: `${(macros.carbs / (macros.protein + macros.carbs + macros.fats)) * 100}%` }"
                  ></div>
                </div>
              </div>

              <!-- Fats -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <label class="text-sm font-medium text-gray-700">Fats</label>
                  <span class="text-sm text-gray-500">{{ macros.fats.toFixed(0) }}g</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-yellow-500 h-2 rounded-full"
                    :style="{ width: `${(macros.fats / (macros.protein + macros.carbs + macros.fats)) * 100}%` }"
                  ></div>
                </div>
              </div>

              <!-- Daily Totals -->
              <div class="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
                <div>
                  <p class="text-sm font-medium text-gray-500">Protein Calories</p>
                  <p class="mt-1 text-lg font-semibold text-gray-900">
                    {{ (macros.protein * 4).toFixed(0) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Carb Calories</p>
                  <p class="mt-1 text-lg font-semibold text-gray-900">
                    {{ (macros.carbs * 4).toFixed(0) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500">Fat Calories</p>
                  <p class="mt-1 text-lg font-semibold text-gray-900">
                    {{ (macros.fats * 9).toFixed(0) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Progress Section -->
        <div class="bg-white shadow rounded-lg lg:col-span-2">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Weekly Progress</h3>
            
            <form @submit.prevent="updateProgress" class="mt-5">
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Current Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    v-model="weeklyProgress.currentWeight"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Weight Change</label>
                  <p class="mt-2 text-sm text-gray-500">
                    {{ weeklyProgress.weightChange > 0 ? '+' : '' }}{{ weeklyProgress.weightChange.toFixed(1) }} kg this week
                  </p>
                </div>

                <div class="sm:col-span-2">
                  <button
                  type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update Progress
                  </button>
                </div>
              </div>
            </form>

            <!-- Progress Recommendations -->
            <div class="mt-6 bg-gray-50 rounded-md p-4" v-if="progressRecommendation">
              <h4 class="text-sm font-medium text-gray-900">Weekly Adjustment Recommendation</h4>
              <p class="mt-1 text-sm text-gray-500">{{ progressRecommendation }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()
const db = getFirestore()

// User data and form states
const userData = ref(null)
const weight = ref(0)
const height = ref(0)
const age = ref(0)
const gender = ref('male')
const activityLevel = ref('1.2')
const goal = ref('maintain')
const dietType = ref('balanced')

// Progress tracking
const weeklyProgress = ref({
  currentWeight: 0,
  weightChange: 0,
  lastWeight: 0,
  lastUpdateDate: null
})

// Computed values
const calculatedBMR = computed(() => {
  // Mifflin-St Jeor Equation
  let bmr = (10 * weight.value) + (6.25 * height.value) - (5 * age.value)
  bmr += gender.value === 'male' ? 5 : -161
  return bmr
})

const calculatedTDEE = computed(() => {
  return calculatedBMR.value * parseFloat(activityLevel.value)
})

const targetCalories = computed(() => {
  let tdee = calculatedTDEE.value
  switch (goal.value) {
    case 'lose':
      return tdee * 0.85 // 15% deficit
    case 'gain':
      return tdee * 1.15 // 15% surplus
    default:
      return tdee
  }
})

const macros = computed(() => {
  const targetCals = targetCalories.value
  let proteinRatio, carbRatio, fatRatio

  switch (dietType.value) {
    case 'lowCarb':
      proteinRatio = 0.4
      fatRatio = 0.4
      carbRatio = 0.2
      break
    case 'highCarb':
      proteinRatio = 0.2
      fatRatio = 0.2
      carbRatio = 0.6
      break
    default: // balanced
      proteinRatio = 0.3
      fatRatio = 0.25
      carbRatio = 0.45
  }

  return {
    protein: (targetCals * proteinRatio) / 4, // 4 calories per gram of protein
    carbs: (targetCals * carbRatio) / 4,     // 4 calories per gram of carbs
    fats: (targetCals * fatRatio) / 9        // 9 calories per gram of fat
  }
})

const progressRecommendation = computed(() => {
  if (!weeklyProgress.value.weightChange) return null

  const change = weeklyProgress.value.weightChange
  
  switch (goal.value) {
    case 'lose':
      if (change < -1) return "Weight loss is too rapid. Consider increasing calories by 10%"
      if (change > -0.25) return "Weight loss is slower than target. Consider reducing calories by 10%"
      return "You're losing weight at a healthy rate. Keep going!"
    
    case 'gain':
      if (change > 0.5) return "Weight gain is too rapid. Consider reducing calories by 10%"
      if (change < 0.25) return "Weight gain is slower than target. Consider increasing calories by 10%"
      return "You're gaining weight at a healthy rate. Keep going!"
    
    default:
      if (Math.abs(change) > 0.5) return "Consider adjusting calories to maintain weight"
      return "You're maintaining weight successfully!"
  }
})

// Methods
const loadUserData = async () => {
  const user = auth.currentUser
  if (!user) return

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid))
    if (userDoc.exists()) {
      userData.value = userDoc.data()
      weight.value = userData.value.weight || 0
      height.value = userData.value.height || 0
      age.value = userData.value.age || 0
      gender.value = userData.value.gender || 'male'
      activityLevel.value = userData.value.activityLevel || '1.2'
      goal.value = userData.value.goal || 'maintain'
      dietType.value = userData.value.dietType || 'balanced'
      
      weeklyProgress.value = userData.value.weeklyProgress || {
        currentWeight: weight.value,
        weightChange: 0,
        lastWeight: weight.value,
        lastUpdateDate: new Date().toISOString()
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error)
  }
}

const updateCalculations = async () => {
  const user = auth.currentUser
  if (!user) return

  try {
    await updateDoc(doc(db, 'users', user.uid), {
      weight: weight.value,
      height: height.value,
      age: age.value,
      gender: gender.value,
      activityLevel: activityLevel.value,
      goal: goal.value,
      dietType: dietType.value,
      lastUpdated: new Date().toISOString()
    })
    
    // Update local user data
    await loadUserData()
  } catch (error) {
    console.error('Error updating calculations:', error)
  }
}

const updateProgress = async () => {
  const user = auth.currentUser
  if (!user) return

  try {
    const newWeightChange = weeklyProgress.value.currentWeight - weeklyProgress.value.lastWeight
    
    const progressData = {
      currentWeight: weeklyProgress.value.currentWeight,
      weightChange: newWeightChange,
      lastWeight: weeklyProgress.value.currentWeight,
      lastUpdateDate: new Date().toISOString()
    }

    await updateDoc(doc(db, 'users', user.uid), {
      weight: weeklyProgress.value.currentWeight,
      weeklyProgress: progressData
    })

    weeklyProgress.value = progressData
  } catch (error) {
    console.error('Error updating progress:', error)
  }
}

const handleLogout = async () => {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (error) {
    console.error('Error logging out:', error)
  }
}

// Load user data on component mount
onMounted(() => {
  loadUserData()
})
</script>