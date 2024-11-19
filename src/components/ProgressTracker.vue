<template>
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Progress Tracker</h3>
  
        <!-- Weekly Check-in Form -->
        <form @submit.prevent="submitProgress" class="mt-5">
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <!-- Current Weight -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700">Current Weight (kg)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  step="0.1"
                  v-model="currentWeight"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
  
            <!-- Measurements (optional) -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700">Body Fat % (optional)</label>
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  step="0.1"
                  v-model="bodyFat"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
  
            <!-- Additional Measurements -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Body Measurements (cm)</label>
              <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div>
                  <label class="block text-xs text-gray-500">Chest</label>
                  <input
                    type="number"
                    step="0.1"
                    v-model="measurements.chest"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs text-gray-500">Waist</label>
                  <input
                    type="number"
                    step="0.1"
                    v-model="measurements.waist"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label class="block text-xs text-gray-500">Hips</label>
                  <input
                    type="number"
                    step="0.1"
                    v-model="measurements.hips"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
  
            <!-- Notes -->
            <div class="col-span-2">
              <label class="block text-sm font-medium text-gray-700">Notes</label>
              <div class="mt-1">
                <textarea
                  v-model="notes"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="How did you feel this week? Any changes in energy, hunger, or performance?"
                ></textarea>
              </div>
            </div>
  
            <div class="col-span-2">
              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Progress
              </button>
            </div>
          </div>
        </form>
  
        <!-- Progress Analysis -->
        <div v-if="progressHistory.length > 0" class="mt-6 border-t border-gray-200 pt-4">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Progress Analysis</h4>
  
          <!-- Weekly Changes -->
          <div class="bg-gray-50 rounded-lg p-4 mb-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500">Weight Change</p>
                <p class="text-lg font-semibold" :class="weightChangeColor">
                  {{ weightChange > 0 ? '+' : ''}}{{ weightChange.toFixed(1) }} kg
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">Average Rate</p>
                <p class="text-lg font-semibold">
                  {{ (weightChange / weeksTracked).toFixed(2) }} kg/week
                </p>
              </div>
            </div>
          </div>
  
          <!-- Progress Recommendation -->
          <div 
            v-if="recommendation"
            class="rounded-md p-4"
            :class="{
              'bg-green-50': recommendationType === 'success',
              'bg-yellow-50': recommendationType === 'warning',
              'bg-red-50': recommendationType === 'alert'
            }"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg 
                  class="h-5 w-5"
                  :class="{
                    'text-green-400': recommendationType === 'success',
                    'text-yellow-400': recommendationType === 'warning',
                    'text-red-400': recommendationType === 'alert'
                  }"
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p 
                  class="text-sm font-medium"
                  :class="{
                    'text-green-800': recommendationType === 'success',
                    'text-yellow-800': recommendationType === 'warning',
                    'text-red-800': recommendationType === 'alert'
                  }"
                >
                  {{ recommendation }}
                </p>
              </div>
            </div>
          </div>
  
          <!-- Progress Chart -->
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-900 mb-4">Weight Trend</h4>
            <div class="h-64">
              <LineChart
                :data="chartData"
                :options="chartOptions"
              />
            </div>
          </div>
  
          <!-- Progress History -->
          <div class="mt-6">
            <h4 class="text-sm font-medium text-gray-900 mb-4">History</h4>
            <div class="flow-root">
              <ul role="list" class="-mb-8">
                <li v-for="(entry, index) in progressHistory" :key="entry.date">
                  <div class="relative pb-8">
                    <span
                      v-if="index !== progressHistory.length - 1"
                      class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    ></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span
                          class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white"
                        >
                          <svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clip-rule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div>
                          <p class="text-sm text-gray-500">
                            {{ formatDate(entry.date) }}
                          </p>
                          <p class="mt-0.5 text-sm text-gray-900">
                            Weight: {{ entry.weight }}kg
                            <span v-if="entry.bodyFat" class="ml-2">
                              Body Fat: {{ entry.bodyFat }}%
                            </span>
                          </p>
                          <p v-if="entry.notes" class="mt-2 text-sm text-gray-500">
                            {{ entry.notes }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { Line as LineChart } from 'vue-chartjs'
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
  
  const props = defineProps({
    goal: {
      type: String,
      required: true
    },
    initialWeight: {
      type: Number,
      required: true
    }
  })
  
  const emit = defineEmits(['update:progress'])
  
  // Form Data
  const currentWeight = ref(props.initialWeight)
  const bodyFat = ref(null)
  const measurements = ref({
    chest: null,
    waist: null,
    hips: null
  })
  const notes = ref('')
  
  // Progress History
  const progressHistory = ref([])
  
  // Computed Properties
  const weightChange = computed(() => {
    if (progressHistory.value.length < 2) return 0
    return currentWeight.value - progressHistory.value[progressHistory.value.length - 2].weight
  })
  
  const weeksTracked = computed(() => {
    return progressHistory.value.length
  })
  
  const weightChangeColor = computed(() => {
    if (props.goal === 'lose') {
      return weightChange.value < 0 ? 'text-green-600' : 'text-red-600'
    }
    if (props.goal === 'gain') {
      return weightChange.value > 0 ? 'text-green-600' : 'text-red-600'
    }
    return 'text-gray-900'
  })
  
  const recommendationType = computed(() => {
    if (!weightChange.value) return null
  
    if (props.goal === 'lose') {
      if (weightChange.value < -1) return 'warning'
      if (weightChange.value > 0) return 'alert'
      return 'success'
    }
  
    if (props.goal === 'gain') {
      if (weightChange.value > 0.5) return 'warning'
      if (weightChange.value < 0) return 'alert'
      return 'success'
    }
  
    return Math.abs(weightChange.value) > 0.5 ? 'warning' : 'success'
  })
  
  const recommendation = computed(() => {
    if (!weightChange.value) return null
  
    if (props.goal === 'lose') {
      if (weightChange.value < -1) {
        return 'Weight loss is too rapid. Consider increasing calories by 10%'
      }
      if (weightChange.value > 0) {
        return 'No weight loss detected. Consider reducing calories by 10%'
      }
      return "You're losing weight at a healthy rate. Keep going!"
    }
  
    if (props.goal === 'gain') {
      if (weightChange.value > 0.5) {
        return 'Weight gain is too rapid. Consider reducing calories by 10%'
      }
      if (weightChange.value < 0) {
        return 'No weight gain detected. Consider increasing calories by 10%'
      }
      return "You're gaining weight at a healthy rate. Keep going!"
    }
  
    return Math.abs(weightChange.value) > 0.5 
      ? 'Consider adjusting calories to maintain weight'
      : "You're maintaining weight successfully!"
  })
  
  // Chart Data
  const chartData = computed(() => ({
    labels: progressHistory.value.map(entry => formatDate(entry.date)),
    datasets: [
      {
        label: 'Weight (kg)',
        data: progressHistory.value.map(entry => entry.weight),
        borderColor: '#3B82F6',
        tension: 0.1
      }
    ]
  }))
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  }
  
  // Methods
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }
  
  const submitProgress = () => {
    const entry = {
      date: new Date().toISOString(),
      weight: parseFloat(currentWeight.value),
      bodyFat: bodyFat.value ? parseFloat(bodyFat.value) : null,
      measurements: { ...measurements.value },
      notes: notes.value
    }
  
    progressHistory.value.push(entry)
    
    // Clear form
    bodyFat.value = null
    measurements.value = {
      chest: null,
      waist: null,
      hips: null
    }
    notes.value = ''
  
    // Emit update
    emit('update:progress', {
      currentWeight: currentWeight.value,
      history: progressHistory.value,
      recommendation: recommendation.value
    })
  }
  
  // Initialize component
  onMounted(() => {
    // Add initial weight as first entry
    if (progressHistory.value.length === 0) {
      progressHistory.value.push({
        date: new Date().toISOString(),
        weight: props.initialWeight,
        bodyFat: null,
        measurements: {},
        notes: 'Initial weight'
      })
    }
  })
  </script>