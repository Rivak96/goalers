<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Calculate BMR & TDEE</h3>
      
      <form @submit.prevent="calculateAndEmit" class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label for="weight" class="block text-sm font-medium text-gray-700">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            v-model="formData.weight"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="height" class="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            v-model="formData.height"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            v-model="formData.age"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
          <select
            v-model="formData.gender"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label for="activityLevel" class="block text-sm font-medium text-gray-700">Activity Level</label>
          <select
            v-model="formData.activityLevel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="1.2">Sedentary (Little or no exercise)</option>
            <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
            <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
            <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
            <option value="1.9">Extremely Active (Very hard exercise & physical job)</option>
          </select>
        </div>

        <div>
          <label for="goal" class="block text-sm font-medium text-gray-700">Goal</label>
          <select
            v-model="formData.goal"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="lose">Weight Loss</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Weight Gain</option>
          </select>
        </div>

        <div class="sm:col-span-2">
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate
          </button>
        </div>
      </form>

      <!-- Results Section -->
      <div v-if="showResults" class="mt-6 border-t border-gray-200 pt-4">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Base BMR</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              {{ results.bmr.toFixed(0) }} calories/day
            </dd>
          </div>
          
          <div>
            <dt class="text-sm font-medium text-gray-500">TDEE</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              {{ results.tdee.toFixed(0) }} calories/day
            </dd>
          </div>

          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Target Calories</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              {{ results.targetCalories.toFixed(0) }} calories/day
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['calculation-updated'])

const formData = reactive({
  weight: '',
  height: '',
  age: '',
  gender: 'male',
  activityLevel: '1.2',
  goal: 'maintain'
})

const showResults = ref(false)
const results = reactive({
  bmr: 0,
  tdee: 0,
  targetCalories: 0
})

const calculateBMR = () => {
  // Mifflin-St Jeor Equation
  let bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age)
  bmr += formData.gender === 'male' ? 5 : -161
  return bmr
}

const calculateTDEE = (bmr) => {
  return bmr * parseFloat(formData.activityLevel)
}

const calculateTargetCalories = (tdee) => {
  switch (formData.goal) {
    case 'lose':
      return tdee * 0.85 // 15% deficit
    case 'gain':
      return tdee * 1.15 // 15% surplus
    default:
      return tdee
  }
}

const calculateAndEmit = () => {
  const bmr = calculateBMR()
  const tdee = calculateTDEE(bmr)
  const targetCalories = calculateTargetCalories(tdee)

  results.bmr = bmr
  results.tdee = tdee
  results.targetCalories = targetCalories
  showResults.value = true

  emit('calculation-updated', {
    ...formData,
    bmr,
    tdee,
    targetCalories
  })
}

// Initialize with props if provided
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  }
})

// Set initial values if provided
if (props.initialData) {
  Object.assign(formData, props.initialData)
}
</script>