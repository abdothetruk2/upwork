<template>
  <div>
    <div class="card max-w-md w-full mx-auto p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold">Create an account</h1>
        <p class="text-neutral-500 mt-2">Join UpClone to find work or hire talent</p>
      </div>

      <form @submit.prevent="handleSignup" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-neutral-700 mb-1">
              First name
            </label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              autocomplete="given-name"
              required
              class="input"
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-neutral-700 mb-1">
              Last name
            </label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              autocomplete="family-name"
              required
              class="input"
            />
          </div>
        </div>

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
          <label for="password" class="block text-sm font-medium text-neutral-700 mb-1">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="new-password"
            required
            class="input"
          />
          <p class="mt-1 text-xs text-neutral-500">
            Must be at least 8 characters and include a number and special character
          </p>
        </div>

        <div>
          <fieldset>
            <legend class="block text-sm font-medium text-neutral-700 mb-1">
              I want to
            </legend>
            <div class="grid grid-cols-2 gap-3 mt-1">
              <div>
                <label 
                  :class="[
                    'flex items-center justify-center p-3 border rounded-lg cursor-pointer',
                    accountType === 'freelancer' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                  ]"
                >
                  <input 
                    type="radio" 
                    name="account-type" 
                    value="freelancer"
                    v-model="accountType"
                    class="sr-only"
                  />
                  <Icon name="heroicons:user" class="h-5 w-5 mr-2" />
                  <span>Work as freelancer</span>
                </label>
              </div>
              <div>
                <label 
                  :class="[
                    'flex items-center justify-center p-3 border rounded-lg cursor-pointer',
                    accountType === 'client' 
                      ? 'border-primary-500 bg-primary-50 text-primary-700' 
                      : 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50'
                  ]"
                >
                  <input 
                    type="radio" 
                    name="account-type" 
                    value="client"
                    v-model="accountType"
                    class="sr-only"
                  />
                  <Icon name="heroicons:briefcase" class="h-5 w-5 mr-2" />
                  <span>Hire for a project</span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="terms"
              v-model="termsAccepted"
              type="checkbox"
              required
              class="h-4 w-4 text-primary-500 border-neutral-300 rounded"
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="terms" class="text-neutral-700">
              I agree to the 
              <a href="#" class="text-primary-500 hover:text-primary-600">Terms of Service</a>
              and
              <a href="#" class="text-primary-500 hover:text-primary-600">Privacy Policy</a>
            </label>
          </div>
        </div>

        <div>
          <button 
            type="submit"
            class="btn btn-primary w-full py-2.5"
            :disabled="loading || !termsAccepted"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
            <span v-else>Create account</span>
          </button>
        </div>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-neutral-600">
          Already have an account?
          <NuxtLink to="/login" class="font-medium text-primary-500 hover:text-primary-600">
            Log in
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
});

import { ref } from 'vue';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const accountType = ref('freelancer');
const termsAccepted = ref(false);
const loading = ref(false);

const handleSignup = () => {
  loading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    // Save some token to localStorage for demo purposes
    localStorage.setItem('auth_token', 'demo_token');
    // Navigate to onboarding or dashboard
    navigateTo('/dashboard');
  }, 1500);
};
</script>