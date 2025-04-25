<template>
  <header class="bg-white border-b border-neutral-200 sticky top-0 z-10">
    <div class="container-custom">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2">
          <div class="h-10 w-10 overflow-hidden rounded-lg bg-primary-500 flex items-center justify-center">
            <img src="https://images.pexels.com/photos/5726693/pexels-photo-5726693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="UpClone Logo" class="h-full w-full object-cover" />
          </div>
          <span class="text-2xl font-bold text-primary-500">UpClone</span>
        </NuxtLink>

        <!-- Main Navigation -->
        <nav class="hidden md:flex items-center space-x-6">
          <NuxtLink to="/find-work" class="text-neutral-700 hover:text-primary-500 font-medium">
            Find Work
          </NuxtLink>
          <NuxtLink to="/find-talent" class="text-neutral-700 hover:text-primary-500 font-medium">
            Find Talent
          </NuxtLink>
          <NuxtLink to="/why-upclone" class="text-neutral-700 hover:text-primary-500 font-medium">
            Why UpClone
          </NuxtLink>
        </nav>

        <!-- Auth Links or User Menu -->
        <div class="flex items-center space-x-2">
          <ClientOnly>
            <template v-if="isLoggedIn">
              <UserMenu />
            </template>
            <template v-else>
              <NuxtLink to="/login" class="btn btn-outline px-4 py-1.5">Log In</NuxtLink>
              <NuxtLink to="/signup" class="btn btn-primary px-4 py-1.5">Sign Up</NuxtLink>
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Initialize isLoggedIn state
const isLoggedIn = ref(false);

// You should replace this with your actual auth state management
// For example, connect to a store or use a composable
onMounted(() => {
  // Check authentication status on client-side only
  // This is just a placeholder - replace with your actual auth check
  const token = localStorage.getItem('auth_token');
  isLoggedIn.value = !!token;
});
</script>