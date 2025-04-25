<template>
  <div class="min-h-screen flex flex-col bg-neutral-50">
    <div class="py-6 px-4 sm:px-6 flex justify-center">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <div class="h-10 w-10 overflow-hidden rounded-lg bg-primary-500 flex items-center justify-center">
          <img src="https://images.pexels.com/photos/5726693/pexels-photo-5726693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="UpClone Logo" class="h-full w-full object-cover" />
        </div>
        <span class="text-2xl font-bold text-primary-500">UpClone</span>
      </NuxtLink>
    </div>
    <main class="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full">
        <ClientOnly>
          <slot />
        </ClientOnly>
      </div>
    </main>
    <div class="py-6 text-center text-sm text-neutral-500">
      &copy; {{ new Date().getFullYear() }} UpClone. All rights reserved.
    </div>
  </div>
</template>