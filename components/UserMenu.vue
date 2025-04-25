<template>
  <div class="relative">
    <button 
      @click="isOpen = !isOpen"
      @blur="onBlur"
      class="flex items-center space-x-1 focus:outline-none"
    >
      <div class="h-9 w-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold overflow-hidden">
        <img v-if="user.avatar" :src="user.avatar" :alt="user.name" class="h-full w-full object-cover" />
        <span v-else>{{ userInitials }}</span>
      </div>
      <Icon name="heroicons:chevron-down" class="h-5 w-5 text-neutral-500" />
    </button>
    
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-neutral-100"
      >
        <div class="px-4 py-3">
          <p class="text-sm font-medium text-neutral-900">{{ user.name }}</p>
          <p class="text-sm text-neutral-500 truncate">{{ user.email }}</p>
        </div>
        <div class="py-1">
          <NuxtLink 
            to="/dashboard" 
            class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            @click="isOpen = false"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink 
            to="/profile" 
            class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            @click="isOpen = false"
          >
            Profile
          </NuxtLink>
          <NuxtLink 
            to="/settings" 
            class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            @click="isOpen = false"
          >
            Settings
          </NuxtLink>
        </div>
        <div class="py-1">
          <a 
            href="#" 
            class="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
            @click.prevent="logout"
          >
            Sign out
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const isOpen = ref(false);
const user = ref({
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
});

const userInitials = computed(() => {
  if (!user.value.name) return '';
  return user.value.name
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();
});

function onBlur(event) {
  // Prevent closing when clicking inside the menu
  const related = event.relatedTarget;
  if (related && event.currentTarget.contains(related)) {
    return;
  }
  isOpen.value = false;
}

function logout() {
  // Handle logout logic here
  localStorage.removeItem('auth_token');
  isOpen.value = false;
  window.location.href = '/';
}
</script>