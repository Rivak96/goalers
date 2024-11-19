<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Stats Grid -->
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Daily Calories Card -->
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
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Daily Calories
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ Math.round(userStats.dailyCalories) }}
                    </div>
                    <div 
                      :class="[
                        calorieAdjustment > 0 ? 'text-green-600' : 'text-red-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      ]"
                    >
                      {{ calorieAdjustment > 0 ? '+' : '' }}{{ calorieAdjustment }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <span 
                class="font-medium text-blue-700 hover:text-blue-900 cursor-pointer"
                @click="showCalorieDetails = true"
              >
                View adjustment details
              </span>
            </div>
          </div>
        </div>

        <!-- Current Weight Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Current Weight
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ userStats.currentWeight }} kg
                    </div>
                    <div 
                      :class="[
                        weightChange >= 0 ? 'text-red-600' : 'text-green-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      ]"
                    >
                      {{ weightChange > 0 ? '+' : '' }}{{ weightChange }} kg
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-blue-700 hover:text-blue-900 cursor-pointer">
                View weight history
              </span>
            </div>
          </div>
        </div>

        <!-- Weekly Average Card -->
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
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Weekly Average Change
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ weeklyAverage }} kg/week
                    </div>
                    <div 
                      :class="[
                        isWeeklyChangeOptimal ? 'text-green-600' : 'text-yellow-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      ]"
                    >
                      {{ weeklyChangeStatus }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-blue-700 hover:text-blue-900 cursor-pointer">
                View weekly analysis
              </span>
            </div>
          </div>
        </div>

        <!-- Goal Progress Card -->
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Goal Progress
                  </dt>
                  <dd class="mt-1">
                    <div class="relative pt-1">
                      <div class="flex mb-2 items-center justify-between">
                        <div>
                          <span class="text-xs font-semibold inline-block text-blue-600">
                            {{ Math.round(goalProgress) }}% Complete
                          </span>
                        </div>
                      </div>
                      <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-100">
                        <div
                          :style="{ width: `${goalProgress}%` }"
                          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-blue-700 hover:text-blue-900 cursor-pointer">
                View goal details
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Progress Chart Section -->
      <div class="mt-8 bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Progress Tracker</h3>
            <div class="flex space-x-3">
              <select 
                v-model="chartTimeframe"
                class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="year">Last Year</option>
              </select>
            </div>
          </div>
          
          <!-- Progress Chart -->
          <div class="mt-4" style="height: 400px;">
            <Line
  :data="chartData"
  :options="chartOptions"
  class="h-[400px] w-full"
/>
          </div>
        </div>
      </div>

      <!-- Daily Check-in Section -->
      <div class="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <!-- Check-in Form -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Daily Check-in</h3>
            <form @submit.prevent="handleDailyCheckin" class="mt-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Today's Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  v-model="checkinData.weight"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Energy Level (1-10)
                </label>
                <input
                  type="range"
                  v-model="checkinData.energyLevel"
                  min="1"
                  max="10"
                  class="mt-1 block w-full"
                />
                <div class="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Low Energy</span>
                  <span>High Energy</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Hunger Level (1-10)
                </label>
                <input
                  type="range"
                  v-model="checkinData.hungerLevel"
                  min="1"
                  max="10"
                  class="mt-1 block w-full"
                />
                <div class="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Satisfied</span>
                  <span>Very Hungry</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  v-model="checkinData.notes"
                  rows="3"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="How are you feeling today? Any challenges?"
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="loading"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {{ loading ? 'Saving...' : 'Save Check-in' }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Insights Panel -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Your Insights</h3>
            
            <!-- Weekly Trend -->
            <div class="mt-4">
  <h4 class="text-sm font-medium text-gray-500">Weekly Trend</h4>
  <div class="mt-2 flex items-center">
    <span 
      v-if="weeklyTrendIcon"
      :class="[weeklyTrendIcon.color, 'flex-shrink-0 h-5 w-5']"
      v-html="weeklyTrendIcon.svg"
    ></span>
    <p class="ml-2 text-sm text-gray-900">{{ weeklyTrendMessage }}</p>
  </div>
</div>

            <!-- Calorie Adjustment Explanation -->
            <div class="mt-6">
              <h4 class="text-sm font-medium text-gray-500">Calorie Adjustment</h4>
              <div class="mt-2">
                <p class="text-sm text-gray-900">{{ calorieAdjustmentExplanation }}</p>
              </div>
            </div>

            <!-- Progress Highlights -->
            <div class="mt-6" v-if="progressHighlights.length">
                <h4 class="text-sm font-medium text-gray-500">Highlights</h4>
                <ul class="mt-2 space-y-2">
                  <li 
                    v-for="(highlight, index) in progressHighlights" 
                    :key="index"
                    class="flex items-start"
                  >
                    <span 
                      :class="[
                        highlight.type === 'success' ? 'text-green-400' : 'text-yellow-400',
                        'flex-shrink-0 h-5 w-5'
                      ]"
                    >
                      <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    <p class="ml-2 text-sm text-gray-900">{{ highlight.message }}</p>
                  </li>
                </ul>
              </div>

            <!-- Recommendations -->
            <div class="mt-6">
              <h4 class="text-sm font-medium text-gray-500">Recommendations</h4>
              <div class="mt-2 space-y-4">
                <div 
                  v-for="(recommendation, index) in recommendations" 
                  :key="index"
                  class="bg-blue-50 rounded-md p-4"
                >
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-blue-700">{{ recommendation }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Calorie Details Modal -->
    <TransitionRoot appear :show="showCalorieDetails" as="template">
      <Dialog as="div" @close="showCalorieDetails = false" class="relative z-10">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              enter="ease-out duration-300"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Calorie Adjustment Details
                </DialogTitle>

                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ calorieAdjustmentDetails }}
                  </p>
                  
                  <div class="mt-4">
                    <h4 class="text-sm font-medium text-gray-900">Adjustment Factors:</h4>
                    <ul class="mt-2 space-y-2">
                      <li v-for="(factor, index) in adjustmentFactors" :key="index" class="text-sm">
                        <span class="font-medium">{{ factor.name }}:</span> {{ factor.value }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="showCalorieDetails = false"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Register ChartJS components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
)
import { auth, db } from '@/firebase'
import { 
  doc, 
  getDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore'

// Register ChartJS components

// State
const loading = ref(false)
const error = ref(null)
const showCalorieDetails = ref(false)
const chartTimeframe = ref('month')

const userStats = ref({
  dailyCalories: 0,
  currentWeight: 0,
  targetWeight: 0,
  startWeight: 0,
  goal: '',
  weeklyGoal: 0,
  progress: []
})

const checkinData = ref({
  weight: '',
  energyLevel: 5,
  hungerLevel: 5,
  notes: ''
})

// Fetch user data and progress
const fetchUserData = async () => {
  try {
    loading.value = true
    const userId = auth.currentUser.uid
    const userDoc = await getDoc(doc(db, 'users', userId))
    
    if (userDoc.exists()) {
      const userData = userDoc.data()
      userStats.value = {
        dailyCalories: userData.dailyCalories || calculateBaseline(userData),
        currentWeight: userData.weight,
        targetWeight: userData.targetWeight,
        startWeight: userData.startWeight,
        goal: userData.goal,
        weeklyGoal: userData.weeklyGoal,
        progress: []
      }

      // Fetch progress history
      const progressRef = collection(db, 'users', userId, 'progress')
      const q = query(
        progressRef,
        orderBy('timestamp', 'desc'),
        limit(getTimeframeLimit())
      )
      
      const progressSnap = await getDocs(q)
      userStats.value.progress = progressSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    }
  } catch (err) {
    error.value = err.message
    console.error('Error fetching user data:', err)
  } finally {
    loading.value = false
  }
}

// Calculate baseline calories using Mifflin-St Jeor Equation
const calculateBaseline = (userData) => {
  let bmr
  if (userData.gender === 'male') {
    bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5
  } else {
    bmr = (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161
  }
  
  const activityMultipliers = {
    '1.2': 1.2,    // Sedentary
    '1.375': 1.375,// Lightly active
    '1.55': 1.55,  // Moderately active
    '1.725': 1.725,// Very active
    '1.9': 1.9     // Extremely active
  }

  return Math.round(bmr * activityMultipliers[userData.activityLevel])
}

// Computed Properties
const weightChange = computed(() => {
  if (userStats.value.progress.length < 2) return 0
  const latestWeight = userStats.value.progress[0].weight
  const previousWeight = userStats.value.progress[1].weight
  return +(latestWeight - previousWeight).toFixed(1)
})

const weeklyAverage = computed(() => {
  const recentProgress = userStats.value.progress.slice(0, 7)
  if (recentProgress.length < 2) return 0
  
  const totalChange = recentProgress[0].weight - recentProgress[recentProgress.length - 1].weight
  const weeks = recentProgress.length / 7
  return +(totalChange / weeks).toFixed(2)
})

const isWeeklyChangeOptimal = computed(() => {
  const change = Math.abs(weeklyAverage.value)
  if (userStats.value.goal === 'lose') {
    return change >= 0.5 && change <= 1
  } else if (userStats.value.goal === 'gain') {
    return change >= 0.25 && change <= 0.5
  }
  return change <= 0.25
})

const weeklyChangeStatus = computed(() => {
  if (!weeklyAverage.value) return 'No data'
  if (isWeeklyChangeOptimal.value) return 'Optimal'
  return 'Adjust needed'
})

const goalProgress = computed(() => {
  if (!userStats.value.targetWeight || !userStats.value.startWeight) return 0
  const totalChange = Math.abs(userStats.value.targetWeight - userStats.value.startWeight)
  const currentChange = Math.abs(userStats.value.currentWeight - userStats.value.startWeight)
  return Math.min(Math.round((currentChange / totalChange) * 100), 100)
})

// Chart Data
const chartData = computed(() => {
  const dates = userStats.value.progress.map(p => 
    new Date(p.timestamp.seconds * 1000).toLocaleDateString()
  ).reverse()
  
  const weights = userStats.value.progress.map(p => p.weight).reverse()
  
  return {
    labels: dates,
    datasets: [
      {
        label: 'Weight',
        data: weights,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    y: {
      ticks: {
        callback: value => `${value} kg`
      }
    }
  }
}

// Calorie Adjustment Logic
const calorieAdjustment = computed(() => {
  if (!weeklyAverage.value) return 0
  
  const currentRate = Math.abs(weeklyAverage.value)
  let adjustment = 0
  
  if (userStats.value.goal === 'lose') {
    if (currentRate < 0.5) {
      adjustment = -150 // Increase deficit
    } else if (currentRate > 1) {
      adjustment = 150 // Decrease deficit
    }
  } else if (userStats.value.goal === 'gain') {
    if (currentRate < 0.25) {
      adjustment = 150 // Increase surplus
    } else if (currentRate > 0.5) {
      adjustment = -150 // Decrease surplus
    }
  }
  
  return adjustment
})

const adjustmentFactors = computed(() => [
  { 
    name: 'Weekly Change Rate', 
    value: `${Math.abs(weeklyAverage.value)} kg/week` 
  },
  { 
    name: 'Energy Level Trend', 
    value: calculateEnergyTrend() 
  },
  { 
    name: 'Hunger Level Trend', 
    value: calculateHungerTrend() 
  }
])

// Helper Functions
const calculateEnergyTrend = () => {
  const recentCheckins = userStats.value.progress.slice(0, 7)
  const avgEnergy = recentCheckins.reduce((acc, curr) => acc + (curr.energyLevel || 5), 0) / recentCheckins.length
  return avgEnergy >= 7 ? 'High' : avgEnergy >= 4 ? 'Moderate' : 'Low'
}

const calculateHungerTrend = () => {
  const recentCheckins = userStats.value.progress.slice(0, 7)
  const avgHunger = recentCheckins.reduce((acc, curr) => acc + (curr.hungerLevel || 5), 0) / recentCheckins.length
  return avgHunger >= 7 ? 'High' : avgHunger >= 4 ? 'Moderate' : 'Low'
}

const getTimeframeLimit = () => {
  const limits = {
    week: 7,
    month: 30,
    '3months': 90,
    year: 365
  }
  return limits[chartTimeframe.value]
}

// Daily Check-in Handler
const handleDailyCheckin = async () => {
  try {
    loading.value = true
    const userId = auth.currentUser.uid
    
    // Add progress entry
    await addDoc(collection(db, 'users', userId, 'progress'), {
      weight: parseFloat(checkinData.value.weight),
      energyLevel: parseInt(checkinData.value.energyLevel),
      hungerLevel: parseInt(checkinData.value.hungerLevel),
      notes: checkinData.value.notes,
      timestamp: serverTimestamp()
    })

    // Update user's current weight
    await updateDoc(doc(db, 'users', userId), {
      weight: parseFloat(checkinData.value.weight),
      dailyCalories: userStats.value.dailyCalories + calorieAdjustment.value
    })

    // Refresh data
    await fetchUserData()
    
    // Reset form
    checkinData.value = {
      weight: '',
      energyLevel: 5,
      hungerLevel: 5,
      notes: ''
    }
  } catch (err) {
    error.value = err.message
    console.error('Error saving check-in:', err)
  } finally {
    loading.value = false
  }
}
// Add this computed property
const weeklyTrendIcon = computed(() => {
  if (!weeklyAverage.value) {
    return {
      color: 'text-gray-400',
      svg: `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
      </svg>`
    }
  }

  if (userStats.value.goal === 'lose') {
    return weeklyAverage.value < 0 ? {
      color: 'text-green-500',
      svg: `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
      </svg>`
    } : {
      color: 'text-red-500',
      svg: `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-8.707l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 9.414V13a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414z" clip-rule="evenodd" />
      </svg>`
    }
  } else if (userStats.value.goal === 'gain') {
    return weeklyAverage.value > 0 ? {
      color: 'text-green-500',
      svg: `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-8.707l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 9.414V13a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414z" clip-rule="evenodd" />
      </svg>`
    } : {
      color: 'text-red-500',
      svg: `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
      </svg>`
    }
  }

  // For maintain goal
  return Math.abs(weeklyAverage.value) <= 0.25 ? {
    color: 'text-green-500',
    svg: `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>`
  } : {
    color: 'text-yellow-500',
    svg: `<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>`
  }
})

// Add weekly trend message
const weeklyTrendMessage = computed(() => {
  if (!weeklyAverage.value) return 'Not enough data'
  
  const change = Math.abs(weeklyAverage.value)
  const direction = weeklyAverage.value < 0 ? 'losing' : 'gaining'
  
  if (userStats.value.goal === 'lose') {
    if (weeklyAverage.value < 0) {
      if (change > 1) return 'Weight loss may be too rapid'
      if (change < 0.5) return 'Weight loss is slower than target'
      return 'Weight loss is on track'
    }
    return 'Weight is increasing - adjust your plan'
  }
  
  if (userStats.value.goal === 'gain') {
    if (weeklyAverage.value > 0) {
      if (change > 0.5) return 'Weight gain may be too rapid'
      if (change < 0.25) return 'Weight gain is slower than target'
      return 'Weight gain is on track'
    }
    return 'Weight is decreasing - adjust your plan'
  }
  
  // For maintain goal
  if (change <= 0.25) return 'Weight is stable'
  return `Weight is ${direction} - consider adjustments`
})

// Add recommendations
const recommendations = computed(() => {
  const recs = []
  const change = weeklyAverage.value
  
  if (!change) {
    recs.push('Start tracking your weight daily for personalized recommendations')
    return recs
  }

  // Weight-based recommendations
  if (userStats.value.goal === 'lose') {
    if (change > 0) {
      recs.push('Consider reducing daily calories by 250')
      recs.push('Increase protein intake to preserve muscle mass')
    } else if (Math.abs(change) > 1) {
      recs.push('Current weight loss may be too aggressive')
      recs.push('Consider increasing calories slightly')
    } else if (Math.abs(change) < 0.5) {
      recs.push('Increase your calorie deficit slightly')
      recs.push('Try adding more movement to your day')
    }
  } else if (userStats.value.goal === 'gain') {
    if (change < 0) {
      recs.push('Increase your daily calories by 250')
      recs.push('Add an extra protein-rich snack')
    } else if (change > 0.5) {
      recs.push('Slow down weight gain to minimize fat gain')
      recs.push('Focus on progressive overload in training')
    } else if (change < 0.25) {
      recs.push('Increase your calorie surplus slightly')
      recs.push('Ensure adequate protein intake')
    }
  }

  // Energy level based recommendations
  if (calculateEnergyTrend() === 'Low') {
    recs.push('Consider adjusting meal timing for better energy')
    recs.push('Review sleep quality and duration')
  }

  // Hunger level based recommendations
  if (calculateHungerTrend() === 'High') {
    recs.push('Include more fiber-rich foods in your meals')
    recs.push('Consider spreading meals throughout the day')
  }

  return recs
})

// Add progress highlights
const progressHighlights = computed(() => {
  const highlights = []
  
  if (!userStats.value.progress.length) {
    return [{
      type: 'info',
      message: 'Start tracking to see your progress highlights'
    }]
  }

  if (isWeeklyChangeOptimal.value) {
    highlights.push({
      type: 'success',
      message: 'Your progress rate is optimal'
    })
  }

  const consistentTracking = userStats.value.progress.length >= 7
  if (consistentTracking) {
    highlights.push({
      type: 'success',
      message: 'Great job maintaining consistent tracking!'
    })
  }

  if (calculateEnergyTrend() === 'High') {
    highlights.push({
      type: 'success',
      message: 'Your energy levels are consistently good'
    })
  }

  return highlights
})

// Initialize dashboard
onMounted(fetchUserData)
</script>