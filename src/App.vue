<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-2xl font-bold text-blue-600">Goalers</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <RouterLink 
                to="/" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[$route.path === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              >
                Home
              </RouterLink>
              <RouterLink 
                to="/dashboard" 
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[$route.path === '/dashboard' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']"
              >
                Dashboard
              </RouterLink>
            </div>
          </div>
          <div class="flex items-center">
            <RouterLink 
              to="/login" 
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </RouterLink>
            <RouterLink 
              to="/register" 
              class="ml-4 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Register
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>