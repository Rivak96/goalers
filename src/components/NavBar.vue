<template>
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Left side - Logo and main navigation -->
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="flex items-center">
                <span class="text-2xl font-bold text-blue-600">Goalers</span>
              </router-link>
            </div>
  
            <!-- Main Navigation -->
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-if="isAuthenticated"
                to="/dashboard"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[
                  currentRoute === '/dashboard'
                    ? 'border-b-2 border-blue-500 text-gray-900'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                Dashboard
              </router-link>
  
              <router-link
                v-if="isAuthenticated"
                to="/progress"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[
                  currentRoute === '/progress'
                    ? 'border-b-2 border-blue-500 text-gray-900'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                Progress
              </router-link>
  
              <router-link
                v-if="isAuthenticated"
                to="/meals"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium"
                :class="[
                  currentRoute === '/meals'
                    ? 'border-b-2 border-blue-500 text-gray-900'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
              >
                Meal Planner
              </router-link>
            </div>
          </div>
  
          <!-- Right side - User menu -->
          <div class="flex items-center">
            <div class="hidden sm:ml-6 sm:flex sm:items-center">
              <!-- Profile dropdown -->
              <div v-if="isAuthenticated" class="ml-3 relative">
                <div>
                  <button
                    @click="toggleUserMenu"
                    type="button"
                    class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    id="user-menu-button"
                  >
                    <span class="sr-only">Open user menu</span>
                    <div v-if="userPhotoURL" class="h-8 w-8 rounded-full overflow-hidden">
                      <img :src="userPhotoURL" alt="User profile" class="h-full w-full object-cover" />
                    </div>
                    <div
                      v-else
                      class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <span class="text-blue-600 font-medium text-sm">
                        {{ userInitials }}
                      </span>
                    </div>
                  </button>
                </div>
  
                <!-- Dropdown menu -->
                <div
                  v-if="showUserMenu"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                >
                  <div class="px-4 py-2 text-xs text-gray-500">
                    Signed in as<br>
                    <span class="font-medium text-gray-900">{{ userEmail }}</span>
                  </div>
  
                  <div class="border-t border-gray-100"></div>
  
                  <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    @click="showUserMenu = false"
                  >
                    Your Profile
                  </router-link>
  
                  <router-link
                    to="/settings"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    @click="showUserMenu = false"
                  >
                    Settings
                  </router-link>
  
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              </div>
  
              <!-- Login/Register buttons for non-authenticated users -->
              <div v-else class="flex items-center space-x-4">
                <router-link
                  to="/login"
                  class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </router-link>
                <router-link
                  to="/register"
                  class="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </router-link>
              </div>
            </div>
  
            <!-- Mobile menu button -->
            <div class="flex items-center sm:hidden">
              <button
                @click="toggleMobileMenu"
                type="button"
                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  :class="{ 'hidden': showMobileMenu, 'block': !showMobileMenu }"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  :class="{ 'block': showMobileMenu, 'hidden': !showMobileMenu }"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu -->
      <div v-if="showMobileMenu" class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            v-if="isAuthenticated"
            to="/dashboard"
            class="block pl-3 pr-4 py-2 text-base font-medium"
            :class="[
              currentRoute === '/dashboard'
                ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            ]"
            @click="showMobileMenu = false"
          >
            Dashboard
          </router-link>
  
          <router-link
            v-if="isAuthenticated"
            to="/progress"
            class="block pl-3 pr-4 py-2 text-base font-medium"
            :class="[
              currentRoute === '/progress'
                ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            ]"
            @click="showMobileMenu = false"
          >
            Progress
          </router-link>
  
          <router-link
            v-if="isAuthenticated"
            to="/meals"
            class="block pl-3 pr-4 py-2 text-base font-medium"
            :class="[
              currentRoute === '/meals'
                ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700'
                : 'border-l-4 border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
            ]"
            @click="showMobileMenu = false"
          >
            Meal Planner
          </router-link>
        </div>
  
        <!-- Mobile profile section -->
        <div v-if="isAuthenticated" class="pt-4 pb-3 border-t border-gray-200">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <div v-if="userPhotoURL" class="h-10 w-10 rounded-full overflow-hidden">
                <img :src="userPhotoURL" alt="User profile" class="h-full w-full object-cover" />
              </div>
              <div
                v-else
                class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
              >
                <span class="text-blue-600 font-medium">{{ userInitials }}</span>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">{{ userName }}</div>
              <div class="text-sm font-medium text-gray-500">{{ userEmail }}</div>
            </div>
          </div>
          <div class="mt-3 space-y-1">
            <router-link
              to="/profile"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="showMobileMenu = false"
            >
              Your Profile
            </router-link>
            <router-link
              to="/settings"
              class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              @click="showMobileMenu = false"
            >
              Settings
            </router-link>
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { getAuth, signOut } from 'firebase/auth'
  
  const router = useRouter()
  const route = useRoute()
  const auth = getAuth()
  
  // State
  const showUserMenu = ref(false)
  const showMobileMenu = ref(false)
  
  // Computed
  const currentRoute = computed(() => route.path)
  
  const isAuthenticated = computed(() => {
    return auth.currentUser !== null
  })
  
  const userName = computed(() => {
    return auth.currentUser?.displayName || 'User'
  })
  
  const userEmail = computed(() => {
    return auth.currentUser?.email || ''
  })
  
  const userPhotoURL = computed(() => {
    return auth.currentUser?.photoURL || null
  })
  
  const userInitials = computed(() => {
    const name = userName.value
    if (!name || name === 'User') return 'U'
    return name.split(' ').map(word => word[0].toUpperCase()).join('').slice(0, 2)
  })
  
  // Methods
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
  }
  
  const toggleMobileMenu = () => {
    showMobileMenu.value = !showMobileMenu.value
  }
  
  const handleLogout = async () => {
    try {
      await signOut(auth)
      showUserMenu.value = false
      showMobileMenu.value = false
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }
  
  // Close menus when clicking outside
  const closeMenus = (event) => {
    if (!event.target.closest('#user-menu-button')) {
      showUserMenu.value = false
    }
  }
  
  // Add click event listener to close menus when clicking outside
  if (typeof window !== 'undefined') {
    window.addEventListener('click', closeMenus)
  }
  </script>