<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation Bar -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-2xl font-bold text-blue-600">Goalers</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Update the check-in button in your template -->
<button
  @click="showCheckInModal = true"
  :disabled="!canCheckInToday(userData.lastCheckIn)"
  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
>
  <span v-if="!canCheckInToday(userData.lastCheckIn)">
    Next check-in available tomorrow
  </span>
  <span v-else>
    Daily Check-in
  </span>
</button>
            <button
              @click="showUserProfile = true"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none"
            >
              {{ userData.name || 'Profile' }}
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
     <!-- Add this at the top level of your template -->
<div v-if="errorBoundary.hasError" class="p-4 bg-red-50 text-red-700 rounded-lg">
  <p>An error occurred: {{ errorBoundary.error }}</p>
  <button 
    @click="fetchUserData" 
    class="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-md"
  >
    Retry
  </button>
</div>
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <!-- Daily Nutrition Overview -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Today's Nutrition Plan</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Calories -->
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex justify-between items-center">
              <div>
                <p class="text-sm font-medium text-blue-600">Daily Calories</p>
                <p class="mt-1 text-2xl font-semibold text-gray-900">
                  {{ Math.round(currentCalories) }}
                </p>
                <div v-if="lastAdjustmentInfo" class="mt-2 text-xs text-gray-500">
  {{ lastAdjustmentInfo }}
</div>
              </div>
              <div 
                v-if="calorieAdjustment"
                :class="[
                  calorieAdjustment > 0 ? 'text-green-600' : 'text-red-600',
                  'text-sm font-medium'
                ]"
              >
                {{ calorieAdjustment > 0 ? '+' : '' }}{{ calorieAdjustment }}
                <span class="block text-xs text-gray-500">Adjustment</span>
              </div>
            </div>
          </div>

          <!-- Macros -->
          <div class="bg-green-50 rounded-lg p-4">
            <p class="text-sm font-medium text-green-600">Macros (P/C/F)</p>
            <div class="mt-1 flex items-baseline space-x-2">
              <span class="text-2xl font-semibold text-gray-900">
                {{ macros.protein }}g
              </span>
              <span class="text-2xl font-semibold text-gray-900">
                {{ macros.carbs }}g
              </span>
              <span class="text-2xl font-semibold text-gray-900">
                {{ macros.fats }}g
              </span>
            </div>
          </div>

          <!-- Next Check-in -->
          <div class="bg-purple-50 rounded-lg p-4">
            <p class="text-sm font-medium text-purple-600">Next Check-in</p>
            <p class="mt-1 text-2xl font-semibold text-gray-900">
              {{ nextCheckInTime }}
            </p>
          </div>
        </div>
      </div>

      <!-- Progress Stats Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Current Weight</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ currentWeight }} kg
                    </div>
                    <div 
                      v-if="weeklyWeightChange"
                      :class="[
                        getWeightChangeColor(weeklyWeightChange),
                        'ml-2 flex items-baseline text-sm font-semibold'
                      ]"
                    >
                      {{ formatWeightChange(weeklyWeightChange) }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Weekly Average -->
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
        </div>

<!-- Progress to Goal -->
<div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Goal Progress</dt>
                  <dd class="mt-1">
                    <div class="relative pt-1">
                      <div class="overflow-hidden h-2 mb-2 text-xs flex rounded bg-blue-100">
                        <div
                          :style="{ width: `${goalProgress}%` }"
                          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                        ></div>
                      </div>
                      <div class="flex justify-between text-xs text-gray-600">
                        <span>Start: {{ userData.startWeight }}kg</span>
                        <span>Target: {{ userData.targetWeight }}kg</span>
                      </div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Calorie Trend -->
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Calorie Adjustment</dt>
                  <dd class="mt-1">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ calorieTrendMessage }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-5 py-3">
            <div class="text-sm">
              <button 
                @click="showCalorieHistory = true"
                class="font-medium text-blue-600 hover:text-blue-900"
              >
                View adjustment history
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Chart -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Progress Tracking</h3>
          <div class="flex space-x-3">
            <select 
              v-model="chartTimeframe"
              class="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="7">Last Week</option>
              <option value="30">Last Month</option>
              <option value="90">Last 3 Months</option>
              <option value="365">Last Year</option>
            </select>
          </div>
        </div>
        
        <div class="h-[400px]">
          <Line
            v-if="chartData"
            :data="chartData"
            :options="chartOptions"
          />
          <div 
            v-else 
            class="h-full flex items-center justify-center bg-gray-50 rounded-lg"
          >
            <p class="text-gray-500">Start tracking to see your progress</p>
          </div>
        </div>
      </div>

      <!-- Analysis Grid -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <!-- Insights Panel -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Analysis & Insights</h3>
          
          <div class="space-y-4">
            <!-- Weight Trend -->
            <div class="flex items-start">
  <div 
    v-if="weightTrendInfo"
    :class="[weightTrendInfo.color, 'flex-shrink-0 rounded-md p-2']"
  >
    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
  </div>
  <div class="ml-3">
    <p class="text-sm text-gray-700">{{ weightTrendInfo?.message || 'Loading...' }}</p>
  </div>
</div>

            <!-- Calorie Analysis -->
            <div class="flex items-start">
              <div 
                :class="[calorieAnalysis.color, 'flex-shrink-0 rounded-md p-2']"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-700">{{ calorieAnalysis.message }}</p>
              </div>
            </div>

            <!-- Adherence Score -->
            <div class="flex items-start">
              <div 
                :class="[adherenceScore.color, 'flex-shrink-0 rounded-md p-2']"
              >
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-gray-700">{{ adherenceScore.message }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations Panel -->
        <div class="bg-white shadow rounded-lg p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
          
          <div class="space-y-4">
            <div 
              v-for="(rec, index) in recommendations" 
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
                  <p class="text-sm text-blue-700">{{ rec }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<!-- Check-in Modal -->
<TransitionRoot appear :show="showCheckInModal" as="template">
        <Dialog as="div" @close="showCheckInModal = false" class="relative z-10">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
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
                    Daily Check-in
                  </DialogTitle>

                  <form @submit.prevent="handleCheckIn" class="mt-4">
                    <div class="space-y-4">
                      <!-- Weight Input -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          Current Weight (kg)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          v-model="checkInData.weight"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          :placeholder="userData.weight"
                        />
                      </div>

                      <!-- Adherence Input -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          Diet Adherence
                        </label>
                        <select
                          v-model="checkInData.adherence"
                          required
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="high">High (90-100% on plan)</option>
                          <option value="medium">Medium (70-90% on plan)</option>
                          <option value="low">Low (Below 70% on plan)</option>
                        </select>
                      </div>

                      <!-- Energy Level -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          Energy Level
                        </label>
                        <div class="mt-1">
                          <input
                            type="range"
                            v-model="checkInData.energy"
                            min="1"
                            max="10"
                            class="w-full"
                          />
                          <div class="flex justify-between text-xs text-gray-500">
                            <span>Very Low</span>
                            <span>Average</span>
                            <span>Very High</span>
                          </div>
                        </div>
                      </div>

                      <!-- Hunger Level -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          Hunger Level
                        </label>
                        <div class="mt-1">
                          <input
                            type="range"
                            v-model="checkInData.hunger"
                            min="1"
                            max="10"
                            class="w-full"
                          />
                          <div class="flex justify-between text-xs text-gray-500">
                            <span>Satisfied</span>
                            <span>Moderate</span>
                            <span>Very Hungry</span>
                          </div>
                        </div>
                      </div>

                      <!-- Notes -->
                      <div>
                        <label class="block text-sm font-medium text-gray-700">
                          Notes (Optional)
                        </label>
                        <textarea
                          v-model="checkInData.notes"
                          rows="3"
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          placeholder="Any challenges or observations?"
                        ></textarea>
                      </div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" class="mt-4 rounded-md bg-red-50 p-4">
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
                    <div class="mt-6">
                      <button
                        type="submit"
                        :disabled="loading"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {{ loading ? 'Saving...' : 'Save Check-in' }}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
<!-- Add this to your modals section -->
<TransitionRoot appear :show="showProfileSetup" as="template">
  <Dialog as="div" @close="showProfileSetup = false" class="relative z-10">
    <TransitionChild
      enter="ease-out duration-300"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="ease-in duration-200"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div class="fixed inset-0 bg-black/25" />
    </TransitionChild>

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
          <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
            Complete Your Profile
          </DialogTitle>

          <form @submit.prevent="handleProfileUpdate" class="mt-4 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                v-model="profileData.height"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                v-model="profileData.age"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Activity Level</label>
              <select
                v-model="profileData.activityLevel"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="1.2">Sedentary (Little or no exercise)</option>
                <option value="1.375">Lightly Active (1-3 days/week)</option>
                <option value="1.55">Moderately Active (3-5 days/week)</option>
                <option value="1.725">Very Active (6-7 days/week)</option>
                <option value="1.9">Extremely Active (Very hard exercise & physical job)</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Goal</label>
              <select
                v-model="profileData.goal"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="lose">Weight Loss</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Weight Gain</option>
              </select>
            </div>

            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </form>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</TransitionRoot>
      <!-- Calorie History Modal -->
      <TransitionRoot appear :show="showCalorieHistory" as="template">
        <Dialog as="div" @close="showCalorieHistory = false" class="relative z-10">
          <TransitionChild
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
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
                <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                    Calorie Adjustment History
                  </DialogTitle>

                  <div class="mt-4">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Calories
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Change
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reason
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(entry, index) in calorieHistory" :key="index">
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ formatDate(entry.date) }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {{ entry.calories }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm">
                            <span
                              :class="[
                                entry.change > 0 ? 'text-green-600' : 'text-red-600',
                              ]"
                            >
                              {{ entry.change > 0 ? '+' : '' }}{{ entry.change }}
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {{ entry.reason }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>
<script setup>

import { ref, computed, onMounted, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Line } from 'vue-chartjs'
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
import { auth, db } from '@/firebase'
import { 
  doc, 
  getDoc, 
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// State Management
const loading = ref(false)
const error = ref(null)
const showCheckInModal = ref(false)
const showCalorieHistory = ref(false)
const chartTimeframe = ref('30')

const userData = ref({
  weight: 0,
  height: 0,
  age: 0,
  gender: '',
  activityLevel: '1.2',
  goal: 'maintain',
  targetWeight: 0,
  startWeight: 0,
  dailyCalories: 0,
  lastCheckIn: null,
  progress: []
})
const checkInData = ref({
  weight: '',
  adherence: 'high',
  energy: 5,
  hunger: 5,
  notes: ''
})

// RP Diet Coach Style Calorie Adjustments
const ADJUSTMENT_FACTORS = {
  AGGRESSIVE: {
    DECREASE: -300,
    INCREASE: 300
  },
  MODERATE: {
    DECREASE: -150,
    INCREASE: 150
  },
  MILD: {
    DECREASE: -100,
    INCREASE: 100
  }
}

const WEEKLY_TARGETS = {
  lose: {
    min: -1.0,
    max: -0.5,
    optimal: -0.7
  },
  gain: {
    min: 0.25,
    max: 0.5,
    optimal: 0.35
  },
  maintain: {
    min: -0.25,
    max: 0.25,
    optimal: 0
  }
}

// Helper Functions
const calculateWeeklyChange = (progress) => {
  if (!progress || progress.length < 2) return 0
  const latestWeight = progress[0].weight
  const previousWeight = progress[progress.length - 1].weight
  const weeksPassed = Math.min(7, progress.length - 1)
  return parseFloat(((latestWeight - previousWeight) / weeksPassed).toFixed(2))
}
const determineAdjustment = (weeklyChange, goal, adherence) => {
  const targets = WEEKLY_TARGETS[goal]
  if (!targets) return 0

  const adherenceMultiplier = {
    high: 1,
    medium: 0.7,
    low: 0.5
  }[adherence]

  if (goal === 'lose') {
    if (weeklyChange > 0) {
      return ADJUSTMENT_FACTORS.AGGRESSIVE.DECREASE * adherenceMultiplier // Gaining weight when should be losing
    } else if (weeklyChange < targets.min) {
      return ADJUSTMENT_FACTORS.MODERATE.INCREASE * adherenceMultiplier // Losing too fast
    } else if (weeklyChange > targets.max) {
      return ADJUSTMENT_FACTORS.MODERATE.DECREASE * adherenceMultiplier // Losing too slow
    }
  } else if (goal === 'gain') {
    if (weeklyChange < 0) {
      return ADJUSTMENT_FACTORS.AGGRESSIVE.INCREASE * adherenceMultiplier // Losing weight when should be gaining
    } else if (weeklyChange > targets.max) {
      return ADJUSTMENT_FACTORS.MODERATE.DECREASE * adherenceMultiplier // Gaining too fast
    } else if (weeklyChange < targets.min) {
      return ADJUSTMENT_FACTORS.MODERATE.INCREASE * adherenceMultiplier // Gaining too slow
    }
  } else {
    // Maintenance
    if (Math.abs(weeklyChange) > targets.max) {
      return weeklyChange > 0 
        ? ADJUSTMENT_FACTORS.MILD.DECREASE * adherenceMultiplier
        : ADJUSTMENT_FACTORS.MILD.INCREASE * adherenceMultiplier
    }
  }

  return 0 // No adjustment needed
}

// Computed Properties
const currentWeight = computed(() => 
  userData.value.progress.length ? userData.value.progress[0].weight : userData.value.weight
)

const weeklyWeightChange = computed(() => {
  if (!userData.value?.progress?.length) return 0
  if (userData.value.progress.length < 2) return 0
  
  const latestWeight = userData.value.progress[0].weight
  const previousWeight = userData.value.progress[1].weight
  return parseFloat((latestWeight - previousWeight).toFixed(2))
})

const currentCalories = computed(() => {
  console.log('Current userData:', userData.value) // Debug log
  const baseCalories = userData.value.dailyCalories || 0
  const adjustment = calorieAdjustment.value || 0
  return Math.max(0, Math.round(baseCalories + adjustment))
})


// Add/update calculateBaseline function
const calculateBaseline = (data) => {
  console.log('Calculating baseline for:', data) // Debug log

  // Validate required data
  if (!data.weight || !data.height || !data.age || !data.gender) {
    console.warn('Missing required data for calorie calculation:', {
      weight: data.weight,
      height: data.height,
      age: data.age,
      gender: data.gender
    })
    return 0
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  let bmr
  if (data.gender === 'male') {
    bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5
  } else {
    bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161
  }

  console.log('Calculated BMR:', bmr) // Debug log

  // Apply activity multiplier
  const activityMultiplier = {
    '1.2': 1.2,    // Sedentary
    '1.375': 1.375,// Lightly active
    '1.55': 1.55,  // Moderately active
    '1.725': 1.725,// Very active
    '1.9': 1.9     // Extremely active
  }[data.activityLevel] || 1.2

  const tdee = Math.round(bmr * activityMultiplier)
  console.log('Calculated TDEE:', tdee) // Debug log

  // Apply goal modifier
  let calories
  switch(data.goal) {
    case 'lose':
      calories = Math.round(tdee * 0.8) // 20% deficit
      break
    case 'gain':
      calories = Math.round(tdee * 1.1) // 10% surplus
      break
    default:
      calories = tdee
  }

  console.log('Final calculated calories:', calories) // Debug log
  return calories
}

// Add this utility function to validate user data
const validateUserData = (data) => {
  const required = ['weight', 'height', 'age', 'gender']
  const missing = required.filter(field => !data[field] || data[field] === 0)
  if (missing.length > 0) {
    console.warn('Missing required fields:', missing)
    return false
  }
  return true
}
const calorieAdjustment = computed(() => {
  if (!userData.value.progress.length) return 0
  return determineAdjustment(
    weeklyWeightChange.value,
    userData.value.goal,
    userData.value.progress[0].adherence || 'high'
  )
})

const macros = computed(() => {
  const calories = currentCalories.value || 0
  const weight = userData.value.weight || 0
  
  // Default values if no data
  if (!calories || !weight) {
    return {
      protein: 0,
      carbs: 0,
      fats: 0
    }
  }

  let proteinMultiplier, carbMultiplier, fatMultiplier

  switch(userData.value.goal) {
    case 'lose':
      proteinMultiplier = 2.3 // Higher protein for muscle preservation
      fatMultiplier = 0.35    // Moderate fats
      break
    case 'gain':
      proteinMultiplier = 2.0 // Moderate protein
      fatMultiplier = 0.35    // Moderate fats
      break
    default: // maintain
      proteinMultiplier = 2.0 // Moderate protein
      fatMultiplier = 0.35    // Moderate fats
  }

  // Calculate macros
  const protein = Math.round(weight * proteinMultiplier)
  const fats = Math.round((calories * fatMultiplier) / 9)
  const proteinCals = protein * 4
  const fatCals = fats * 9
  const remainingCals = Math.max(0, calories - (proteinCals + fatCals))
  const carbs = Math.round(remainingCals / 4)

  return {
    protein,
    carbs,
    fats
  }
})

// Chart Data
const chartData = computed(() => {
  const dates = userData.value.progress
    .map(p => new Date(p.timestamp.seconds * 1000).toLocaleDateString())
    .reverse()
  
  const weights = userData.value.progress
    .map(p => p.weight)
    .reverse()

  const calories = userData.value.progress
    .map(p => p.calories)
    .reverse()
  
  return {
    labels: dates,
    datasets: [
      {
        label: 'Weight (kg)',
        data: weights,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        yAxisID: 'y',
        fill: true
      },
      {
        label: 'Calories',
        data: calories,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        yAxisID: 'y1',
        fill: true
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
      title: {
        display: true,
        text: 'Weight (kg)'
      }
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      title: {
        display: true,
        text: 'Calories'
      },
      grid: {
        drawOnChartArea: false
      }
    }
  }
}

// Update fetchUserData to set initial calories if none exist
const fetchUserData = async () => {
  try {
    loading.value = true
    const userId = auth.currentUser?.uid
    
    if (!userId) {
      console.error('No user ID found')
      return
    }

    const userRef = doc(db, 'users', userId)
    const userDoc = await getDoc(userRef)
    
    if (userDoc.exists()) {
      const data = userDoc.data()

      // Get progress history
      const progressRef = collection(userRef, 'progress')
      const q = query(
        progressRef,
        orderBy('timestamp', 'desc'),
        limit(parseInt(chartTimeframe.value))
      )
      const progressSnap = await getDocs(q)
      const progress = progressSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      userData.value = {
        ...data,
        progress
      }

      // Calculate calories if needed
      if (!userData.value.dailyCalories) {
        const baseCalories = calculateBaseline(userData.value)
        if (baseCalories > 0) {
          await updateDoc(userRef, {
            dailyCalories: baseCalories
          })
          userData.value.dailyCalories = baseCalories
        }
      }
    }
  } catch (err) {
    error.value = 'Error loading user data: ' + err.message
    console.error('Error fetching user data:', err)
  } finally {
    loading.value = false
  }
}

const handleCheckIn = async () => {
  try {
    loading.value = true
    const userId = auth.currentUser?.uid
    
    if (!userId) {
      throw new Error('No authenticated user')
    }

    // Check if user already checked in today
    if (!canCheckInToday(userData.value.lastCheckIn)) {
      throw new Error('You have already checked in today. Next check-in available tomorrow.')
    }

    const userRef = doc(db, 'users', userId)
    const progressRef = collection(userRef, 'progress')
    const calorieHistoryRef = collection(userRef, 'calorieHistory')

    const newWeight = parseFloat(checkInData.value.weight)
    
    // Calculate calorie adjustment
    const weightChange = calculateWeeklyChange([
      { weight: newWeight },
      ...userData.value.progress
    ])
    
    // Only calculate adjustment if a week has passed since last adjustment
    let adjustment = 0
    if (canAdjustCalories(userData.value.progress)) {
      adjustment = determineAdjustment(
        weightChange,
        userData.value.goal,
        checkInData.value.adherence
      )
    }

    const newCalories = userData.value.dailyCalories + adjustment

    // Create progress entry
    const progressData = {
      weight: newWeight,
      calories: newCalories,
      adherence: checkInData.value.adherence,
      energy: parseInt(checkInData.value.energy),
      hunger: parseInt(checkInData.value.hunger),
      notes: checkInData.value.notes,
      adjustment,
      timestamp: serverTimestamp()
    }

    // Create batch to ensure atomic updates
    const batch = writeBatch(db)

    // Add progress entry
    const newProgressRef = doc(progressRef)
    batch.set(newProgressRef, progressData)

    // Prepare user document update
    const userUpdate = {
      weight: newWeight,
      dailyCalories: newCalories,
      lastCheckIn: serverTimestamp(),
    }

    // Only add lastCalorieAdjustment if there was an adjustment
    if (adjustment !== 0) {
      userUpdate.lastCalorieAdjustment = serverTimestamp()
    }

    // Update user document
    batch.update(userRef, userUpdate)

    // Add calorie history entry if there was an adjustment
    if (adjustment !== 0) {
      const historyEntry = {
        previousCalories: userData.value.dailyCalories,
        newCalories,
        change: adjustment,
        reason: generateAdjustmentReason(weightChange, userData.value.goal),
        timestamp: serverTimestamp()
      }
      const newHistoryRef = doc(calorieHistoryRef)
      batch.set(newHistoryRef, historyEntry)
    }

    // Commit all changes
    await batch.commit()

    // Refresh data
    await fetchUserData()
    showCheckInModal.value = false
    
    // Reset form
    checkInData.value = {
      weight: '',
      adherence: 'high',
      energy: 5,
      hunger: 5,
      notes: ''
    }

    // Show success message
    showSuccessMessage('Check-in saved successfully')
  } catch (err) {
    error.value = 'Error saving check-in: ' + err.message
    console.error('Error handling check-in:', err)
  } finally {
    loading.value = false
  }
}

// Add this helper function for success messages
const showSuccessMessage = (message) => {
  // You can implement this based on your UI needs
  // For example, using a toast notification
  console.log('Success:', message)
}
// Add these utility functions
const canCheckInToday = (lastCheckIn) => {
  if (!lastCheckIn) return true
  
  const lastDate = new Date(lastCheckIn.seconds * 1000)
  const today = new Date()
  
  return !isSameDay(lastDate, today)
}

const canAdjustCalories = (progress) => {
  if (!progress || !Array.isArray(progress) || progress.length === 0) return true
  
  const lastAdjustment = progress.find(p => p?.adjustment !== 0)
  if (!lastAdjustment || !lastAdjustment.timestamp) return true
  
  const lastAdjustmentDate = new Date(lastAdjustment.timestamp.seconds * 1000)
  const today = new Date()
  
  return daysBetween(lastAdjustmentDate, today) >= 7
}

const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

const daysBetween = (date1, date2) => {
  const oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
  return Math.round(Math.abs((date1 - date2) / oneDay))
}
// Analysis and Insights
const generateAdjustmentReason = (weightChange, goal) => {
  const targets = WEEKLY_TARGETS[goal]
  if (!targets) return 'Maintenance adjustment'

  if (goal === 'lose') {
    if (weightChange > 0) return 'Weight gain during fat loss phase'
    if (weightChange < targets.min) return 'Weight loss too aggressive'
    if (weightChange > targets.max) return 'Weight loss too slow'
    return 'Optimization adjustment'
  }

  if (goal === 'gain') {
    if (weightChange < 0) return 'Weight loss during muscle gain phase'
    if (weightChange > targets.max) return 'Weight gain too aggressive'
    if (weightChange < targets.min) return 'Weight gain too slow'
    return 'Optimization adjustment'
  }

  return 'Maintenance optimization'
}

// Add these computed properties to your script section
const weightTrendInfo = computed(() => {
  // Default state if no data
  if (!userData.value || !userData.value.progress.length) {
    return {
      color: 'bg-gray-100 text-gray-500',
      message: 'Start tracking to see weight trend analysis'
    }
  }

  const change = weeklyWeightChange.value
  const goal = userData.value.goal

  // Handle null or undefined change
  if (!change) {
    return {
      color: 'bg-gray-100 text-gray-500',
      message: 'Not enough data for trend analysis'
    }
  }

  // Weight loss goal
  if (goal === 'lose') {
    if (change > 0) {
      return {
        color: 'bg-red-100 text-red-700',
        message: `Weight increasing by ${Math.abs(change)}kg/week. Adjusting plan to restore fat loss.`
      }
    }
    if (Math.abs(change) > 1) {
      return {
        color: 'bg-yellow-100 text-yellow-700',
        message: `Weight loss of ${Math.abs(change)}kg/week is faster than optimal. Consider slowing down.`
      }
    }
    if (Math.abs(change) < 0.5) {
      return {
        color: 'bg-yellow-100 text-yellow-700',
        message: `Weight loss of ${Math.abs(change)}kg/week is slower than target. Adjusting plan.`
      }
    }
    return {
      color: 'bg-green-100 text-green-700',
      message: `Optimal weight loss rate of ${Math.abs(change)}kg/week. Keep going!`
    }
  }

  // Weight gain goal
  if (goal === 'gain') {
    if (change < 0) {
      return {
        color: 'bg-red-100 text-red-700',
        message: `Weight decreasing by ${Math.abs(change)}kg/week. Adjusting plan to support gains.`
      }
    }
    if (change > 0.5) {
      return {
        color: 'bg-yellow-100 text-yellow-700',
        message: `Weight gain of ${change}kg/week is faster than optimal. Consider slowing down.`
      }
    }
    if (change < 0.25) {
      return {
        color: 'bg-yellow-100 text-yellow-700',
        message: `Weight gain of ${change}kg/week is slower than target. Adjusting plan.`
      }
    }
    return {
      color: 'bg-green-100 text-green-700',
      message: `Optimal weight gain rate of ${change}kg/week. Keep going!`
    }
  }

  // Maintenance goal
  return {
    color: Math.abs(change) <= 0.25 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700',
    message: Math.abs(change) <= 0.25 
      ? 'Weight stable within optimal range'
      : `Weight changing by ${Math.abs(change)}kg/week. Consider adjustments.`
  }
})

// Add error handling wrapper for the component
const errorBoundary = computed(() => {
  try {
    return {
      hasError: false,
      error: null
    }
  } catch (err) {
    console.error('Error in component:', err)
    return {
      hasError: true,
      error: err.message
    }
  }
})


const recommendations = computed(() => {
  const recs = []
  const weeklyChange = weeklyWeightChange.value
  const adherence = userData.value.progress[0]?.adherence || 'high'
  
  // Add diet adherence recommendations
  if (adherence !== 'high') {
    recs.push('Focus on improving diet consistency before making calorie adjustments')
    recs.push('Track all meals to identify adherence challenges')
  }

  // Add weight-trend based recommendations
  if (userData.value.goal === 'lose') {
    if (weeklyChange > 0) {
      recs.push('Ensure you\'re accurately tracking all food intake')
      recs.push('Consider reducing portion sizes at meals')
      recs.push('Add 10-15 minutes to daily activity')
    } else if (Math.abs(weeklyChange) > 1) {
      recs.push('Increase protein intake to preserve muscle mass')
      recs.push('Ensure you\'re getting adequate sleep')
      recs.push('Consider reducing training intensity temporarily')
    }
  }

  // Add energy and hunger based recommendations
  const recentEnergy = averageEnergyLevel()
  const recentHunger = averageHungerLevel()

  if (recentEnergy < 5) {
    recs.push('Consider adjusting meal timing for better energy levels')
    recs.push('Review sleep quality and duration')
  }

  if (recentHunger > 7) {
    recs.push('Add more high-volume, low-calorie foods to meals')
    recs.push('Consider spreading meals out more evenly')
  }

  return recs
})

// Utility Functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  })
}

const averageEnergyLevel = () => {
  const recentCheckins = userData.value.progress.slice(0, 7)
  if (!recentCheckins.length) return 5
  return recentCheckins.reduce((acc, curr) => acc + (curr.energy || 5), 0) / recentCheckins.length
}

const averageHungerLevel = () => {
  const recentCheckins = userData.value.progress.slice(0, 7)
  if (!recentCheckins.length) return 5
  return recentCheckins.reduce((acc, curr) => acc + (curr.hunger || 5), 0) / recentCheckins.length
}
const nextCheckInTime = computed(() => {
  const lastCheckIn = userData.value.lastCheckIn
  if (!lastCheckIn) return 'Now'
  
  const lastDate = new Date(lastCheckIn)
  const nextDate = new Date(lastDate.setHours(lastDate.getHours() + 24))
  return formatDate(nextDate)
})

const weeklyAverage = computed(() => {
  if (userData.value.progress.length < 7) return 0
  const recentProgress = userData.value.progress.slice(0, 7)
  const totalChange = recentProgress[0].weight - recentProgress[recentProgress.length - 1].weight
  return (totalChange / 7).toFixed(2)
})

const isWeeklyChangeOptimal = computed(() => {
  const change = Math.abs(weeklyAverage.value)
  const { goal } = userData.value
  
  if (goal === 'lose') {
    return change >= 0.5 && change <= 1
  } else if (goal === 'gain') {
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
  const { targetWeight, startWeight, weight } = userData.value
  if (!targetWeight || !startWeight) return 0
  
  const totalChange = Math.abs(targetWeight - startWeight)
  const currentChange = Math.abs(weight - startWeight)
  return Math.min(Math.round((currentChange / totalChange) * 100), 100)
})

const calorieTrendMessage = computed(() => {
  if (!weeklyAverage.value) return 'Start tracking to see trends'
  
  const change = weeklyAverage.value
  const { goal } = userData.value
  
  if (goal === 'lose') {
    if (change > 0) return 'Weight is increasing - reducing calories'
    if (Math.abs(change) > 1) return 'Weight loss too fast - increasing calories'
    if (Math.abs(change) < 0.5) return 'Weight loss too slow - reducing calories'
    return 'Weight loss on target'
  }
  
  if (goal === 'gain') {
    if (change < 0) return 'Weight is decreasing - increasing calories'
    if (change > 0.5) return 'Weight gain too fast - reducing calories'
    if (change < 0.25) return 'Weight gain too slow - increasing calories'
    return 'Weight gain on target'
  }
  
  return 'Maintaining weight'
})

const calorieAnalysis = computed(() => {
  if (!weeklyAverage.value) return {
    color: 'text-gray-500 bg-gray-100',
    message: 'Start tracking to see analysis'
  }

  const change = weeklyAverage.value
  const { goal } = userData.value

  if (goal === 'lose') {
    if (change > 0) {
      return {
        color: 'text-red-500 bg-red-100',
        message: 'Weight gain detected - calories reduced to restore fat loss'
      }
    }
    if (Math.abs(change) > 1) {
      return {
        color: 'text-yellow-500 bg-yellow-100',
        message: 'Weight loss faster than optimal - calories increased'
      }
    }
    return {
      color: 'text-green-500 bg-green-100',
      message: 'Weight loss rate is optimal'
    }
  }

  if (goal === 'gain') {
    if (change < 0) {
      return {
        color: 'text-red-500 bg-red-100',
        message: 'Weight loss detected - calories increased to support growth'
      }
    }
    if (change > 0.5) {
      return {
        color: 'text-yellow-500 bg-yellow-100',
        message: 'Weight gain faster than optimal - calories reduced'
      }
    }
    return {
      color: 'text-green-500 bg-green-100',
      message: 'Weight gain rate is optimal'
    }
  }

  return {
    color: 'text-blue-500 bg-blue-100',
    message: 'Maintaining weight successfully'
  }
})

const adherenceScore = computed(() => {
  const recentProgress = userData.value.progress.slice(0, 7)
  if (!recentProgress.length) {
    return {
      color: 'text-gray-500 bg-gray-100',
      message: 'Start tracking to see adherence score'
    }
  }

  const highAdherenceDays = recentProgress.filter(p => p.adherence === 'high').length
  const score = (highAdherenceDays / recentProgress.length) * 100

  if (score >= 90) {
    return {
      color: 'text-green-500 bg-green-100',
      message: 'Excellent adherence to plan'
    }
  } else if (score >= 70) {
    return {
      color: 'text-yellow-500 bg-yellow-100',
      message: 'Good adherence - room for improvement'
    }
  }
  return {
    color: 'text-red-500 bg-red-100',
    message: 'Focus on improving plan adherence'
  }
})
// Add these functions to your script section
const getWeightChangeColor = (change) => {
  if (!change) return 'text-gray-500'
  
  const { goal } = userData.value
  
  if (goal === 'lose') {
    return change < 0 ? 'text-green-600' : 'text-red-600'
  }
  
  if (goal === 'gain') {
    return change > 0 ? 'text-green-600' : 'text-red-600'
  }
  
  // For maintenance
  return Math.abs(change) <= 0.25 ? 'text-green-600' : 'text-yellow-600'
}

const formatWeightChange = (change) => {
  if (!change) return ''
  return `${change > 0 ? '+' : ''}${change.toFixed(1)} kg`
}
// Watch entire userData object
watch(
  userData,
  (newData) => {
    console.log('userData updated:', newData)
  },
  { deep: true, immediate: true }
)

// Watch specifically for calorie changes
watch(
  () => userData.value.dailyCalories,
  (newCalories, oldCalories) => {
    console.log('Calories changed:', { old: oldCalories, new: newCalories })
  }
)

// Watch for weight changes
watch(
  () => userData.value.weight,
  (newWeight, oldWeight) => {
    console.log('Weight changed:', { old: oldWeight, new: newWeight })
  }
)

// Watch for progress updates
watch(
  () => userData.value.progress,
  (newProgress) => {
    console.log('Progress updated:', newProgress)
  },
  { deep: true }
)

// Watch computed calories
watch(
  currentCalories,
  (newCalories) => {
    console.log('Current calories computed:', newCalories)
  }
)
// Add to your state section
const showProfileSetup = ref(false)
const profileData = ref({
  height: userData.value.height || '',
  age: userData.value.age || '',
  activityLevel: userData.value.activityLevel || '1.2',
  goal: userData.value.goal || 'maintain'
})

// Add this function to handle profile updates
const handleProfileUpdate = async () => {
  try {
    loading.value = true
    const userId = auth.currentUser.uid

    // Update user document with profile data
    await updateDoc(doc(db, 'users', userId), {
      height: parseInt(profileData.value.height),
      age: parseInt(profileData.value.age),
      activityLevel: profileData.value.activityLevel,
      goal: profileData.value.goal
    })

    // Refresh user data
    await fetchUserData()
    showProfileSetup.value = false
  } catch (err) {
    error.value = err.message
    console.error('Error updating profile:', err)
  } finally {
    loading.value = false
  }
}

const lastAdjustmentInfo = computed(() => {
  const lastAdjustment = userData.value.progress.find(p => p.adjustment !== 0)
  if (!lastAdjustment) return 'No previous adjustments'
  
  const lastDate = new Date(lastAdjustment.timestamp.seconds * 1000)
  const daysUntilNext = 7 - daysBetween(lastDate, new Date())
  
  if (daysUntilNext > 0) {
    return `Next calorie adjustment available in ${daysUntilNext} days`
  }
  return 'Calorie adjustment available'
})
// Initialize dashboard
onMounted(() => {
  fetchUserData()
})

// Watch for timeframe changes
watch(chartTimeframe, fetchUserData)
</script>