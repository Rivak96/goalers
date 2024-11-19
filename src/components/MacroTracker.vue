<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Macronutrient Distribution</h3>

      <!-- Diet Type Selection -->
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Diet Type</label>
        <select
          v-model="selectedDietType"
          @change="calculateMacros"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="balanced">Balanced (30/45/25)</option>
          <option value="lowCarb">Low Carb (40/20/40)</option>
          <option value="highCarb">High Carb (20/60/20)</option>
          <option value="custom">Custom Distribution</option>
        </select>
      </div>

      <!-- Custom Macro Distribution (shows only when custom is selected) -->
      <div v-if="selectedDietType === 'custom'" class="mt-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Protein Percentage ({{ customMacros.protein }}%)
          </label>
          <input
            type="range"
            v-model="customMacros.protein"
            min="10"
            max="60"
            @input="validateCustomMacros"
            class="mt-1 w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Carbs Percentage ({{ customMacros.carbs }}%)
          </label>
          <input
            type="range"
            v-model="customMacros.carbs"
            min="10"
            max="70"
            @input="validateCustomMacros"
            class="mt-1 w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Fats Percentage ({{ customMacros.fats }}%)
          </label>
          <input
            type="range"
            v-model="customMacros.fats"
            min="10"
            max="60"
            @input="validateCustomMacros"
            class="mt-1 w-full"
          />
        </div>
        <div class="text-sm" :class="totalPercentage === 100 ? 'text-green-600' : 'text-red-600'">
          Total: {{ totalPercentage }}% (Should equal 100%)
        </div>
      </div>

      <!-- Macronutrient Display -->
      <div class="mt-6 space-y-6">
        <!-- Protein -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <div>
              <span class="text-sm font-medium text-gray-900">Protein</span>
              <span class="ml-2 text-sm text-gray-500">{{ Math.round(macros.protein) }}g</span>
            </div>
            <span class="text-sm text-gray-500">
              {{ Math.round(macros.protein * 4) }} kcal
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              :style="{ width: `${(macros.protein * 4 / dailyCalories) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Carbohydrates -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <div>
              <span class="text-sm font-medium text-gray-900">Carbohydrates</span>
              <span class="ml-2 text-sm text-gray-500">{{ Math.round(macros.carbs) }}g</span>
            </div>
            <span class="text-sm text-gray-500">
              {{ Math.round(macros.carbs * 4) }} kcal
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-green-500 h-2.5 rounded-full"
              :style="{ width: `${(macros.carbs * 4 / dailyCalories) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Fats -->
        <div>
          <div class="flex justify-between items-center mb-1">
            <div>
              <span class="text-sm font-medium text-gray-900">Fats</span>
              <span class="ml-2 text-sm text-gray-500">{{ Math.round(macros.fats) }}g</span>
            </div>
            <span class="text-sm text-gray-500">
              {{ Math.round(macros.fats * 9) }} kcal
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-yellow-500 h-2.5 rounded-full"
              :style="{ width: `${(macros.fats * 9 / dailyCalories) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Summary Stats -->
        <div class="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <p class="text-sm font-medium text-gray-500">Daily Calories</p>
            <p class="mt-1 text-xl font-semibold text-gray-900">
              {{ Math.round(dailyCalories) }}
            </p>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Protein per kg</p>
            <p class="mt-1 text-xl font-semibold text-gray-900">
              {{ (macros.protein / weight).toFixed(1) }}g
            </p>
          </div>
        </div>

        <!-- Meal Distribution -->
        <div class="mt-6 border-t pt-4">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Suggested Meal Distribution</h4>
          <div class="space-y-3">
            <div v-for="(meal, index) in mealDistribution" :key="index" class="text-sm">
              <p class="font-medium text-gray-700">{{ meal.name }}</p>
              <p class="text-gray-500">
                Protein: {{ Math.round(macros.protein * meal.percentage) }}g | 
                Carbs: {{ Math.round(macros.carbs * meal.percentage) }}g | 
                Fats: {{ Math.round(macros.fats * meal.percentage) }}g
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps({
  dailyCalories: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:macros'])

const selectedDietType = ref('balanced')
const customMacros = reactive({
  protein: 30,
  carbs: 45,
  fats: 25
})

const totalPercentage = computed(() => {
  return parseInt(customMacros.protein) + parseInt(customMacros.carbs) + parseInt(customMacros.fats)
})

const macros = reactive({
  protein: 0,
  carbs: 0,
  fats: 0
})

const mealDistribution = [
  { name: 'Breakfast (30%)', percentage: 0.3 },
  { name: 'Lunch (35%)', percentage: 0.35 },
  { name: 'Dinner (25%)', percentage: 0.25 },
  { name: 'Snacks (10%)', percentage: 0.1 }
]

const validateCustomMacros = () => {
  if (totalPercentage.value > 100) {
    // Adjust the last changed value to make total 100%
    const excess = totalPercentage.value - 100
    if (customMacros.fats > excess) {
      customMacros.fats -= excess
    } else if (customMacros.carbs > excess) {
      customMacros.carbs -= excess
    } else if (customMacros.protein > excess) {
      customMacros.protein -= excess
    }
  }
  calculateMacros()
}

const calculateMacros = () => {
  let proteinPercentage, carbPercentage, fatPercentage

  switch (selectedDietType.value) {
    case 'lowCarb':
      proteinPercentage = 0.4
      carbPercentage = 0.2
      fatPercentage = 0.4
      break
    case 'highCarb':
      proteinPercentage = 0.2
      carbPercentage = 0.6
      fatPercentage = 0.2
      break
    case 'custom':
      proteinPercentage = customMacros.protein / 100
      carbPercentage = customMacros.carbs / 100
      fatPercentage = customMacros.fats / 100
      break
    default: // balanced
      proteinPercentage = 0.3
      carbPercentage = 0.45
      fatPercentage = 0.25
  }

  // Calculate macros in grams
  macros.protein = (props.dailyCalories * proteinPercentage) / 4  // 4 calories per gram of protein
  macros.carbs = (props.dailyCalories * carbPercentage) / 4      // 4 calories per gram of carbs
  macros.fats = (props.dailyCalories * fatPercentage) / 9        // 9 calories per gram of fat

  emit('update:macros', { ...macros })
}

// Watch for changes in daily calories and recalculate macros
watch(() => props.dailyCalories, calculateMacros, { immediate: true })
</script>