<template>
  <div>
    <div class="card max-w-md w-full mx-auto p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold">Welcome back</h1>
        <p class="text-neutral-500 mt-2">Log in to your UpClone account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">
            Email address
          </label>
          <input
            id="email"
            v-model="email"
            type="email" 
            autocomplete="email" 
            required
            class="input"
          />
        </div>

        <div>
          <div class="flex items-center justify-between mb-1">
            <label for="password" class="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <NuxtLink to="/forgot-password" class="text-sm text-primary-500 hover:text-primary-600">
              Forgot password?
            </NuxtLink>
          </div>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="input"
          />
        </div>

        <div class="flex items-center">
          <input
            id="remember-me"
            v-model="rememberMe"
            type="checkbox"
            class="h-4 w-4 text-primary-500 border-neutral-300 rounded"
          />
          <label for="remember-me" class="ml-2 block text-sm text-neutral-700">
            Remember me
          </label>
        </div>

        <div>
          <button 
            type="submit"
            class="btn btn-primary w-full py-2.5"
            :disabled="loading"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
            <span v-else>Log in</span>
          </button>
        </div>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-neutral-600">
          Don't have an account?
          <NuxtLink to="/signup" class="font-medium text-primary-500 hover:text-primary-600">
            Sign up
          </NuxtLink>
        </p>
      </div>

      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-neutral-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-neutral-500">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button 
            type="button"
            class="btn btn-outline w-full flex items-center justify-center py-2.5"
          >
            <Icon name="mdi:google" class="h-5 w-5 mr-2" />
            Google
          </button>
          <button 
            type="button"
            class="btn btn-outline w-full flex items-center justify-center py-2.5"
          >
            <Icon name="mdi:apple" class="h-5 w-5 mr-2" />
            Apple
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
});

import { ref } from 'vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);

const handleLogin = () => {
  loading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    // Save some token to localStorage for demo purposes
    localStorage.setItem('auth_token', 'demo_token');
    // Navigate to dashboard on successful login
    navigateTo('/dashboard');
  }, 1500);
};
</script>