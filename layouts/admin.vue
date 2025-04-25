<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-neutral-800 text-white border-b border-neutral-700 sticky top-0 z-10">
      <div class="container-custom">
        <div class="flex items-center justify-between py-3">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/admin" class="flex items-center space-x-2">
              <div class="h-10 w-10 overflow-hidden rounded-lg bg-primary-500 flex items-center justify-center">
                <img src="https://images.pexels.com/photos/5726693/pexels-photo-5726693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="UpClone Logo" class="h-full w-full object-cover" />
              </div>
              <div>
                <span class="text-2xl font-bold text-primary-500">UpClone</span>
                <span class="bg-primary-500 text-white text-xs px-2 py-0.5 rounded ml-2">Admin</span>
              </div>
            </NuxtLink>
          </div>

          <!-- Header Right -->
          <div class="flex items-center space-x-4">
            <button 
              class="text-neutral-300 hover:text-white"
              @click="toggleNotifications"
            >
              <div class="relative">
                <Icon name="heroicons:bell" size="24" />
                <span class="absolute -top-1 -right-1 bg-primary-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  3
                </span>
              </div>
            </button>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>

    <div class="flex-grow flex">
      <!-- Sidebar -->
      <aside class="w-64 bg-neutral-800 text-white hidden lg:block">
        <div class="p-6">
          <nav class="space-y-1">
            <h3 class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-3">Dashboard</h3>
            <AdminNavLink to="/admin" icon="heroicons:home">
              Overview
            </AdminNavLink>
            <AdminNavLink to="/admin/analytics" icon="heroicons:chart-bar">
              Analytics
            </AdminNavLink>
            
            <h3 class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-6 mb-3">Management</h3>
            <AdminNavLink to="/admin/users" icon="heroicons:users">
              Users
            </AdminNavLink>
            <AdminNavLink to="/admin/jobs" icon="heroicons:briefcase">
              Jobs
            </AdminNavLink>
            <AdminNavLink to="/admin/contracts" icon="heroicons:clipboard-document-check">
              Contracts
            </AdminNavLink>
            <AdminNavLink to="/admin/categories" icon="heroicons:tag">
              Categories
            </AdminNavLink>
            
            <h3 class="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-6 mb-3">Settings</h3>
            <AdminNavLink to="/admin/settings" icon="heroicons:cog-6-tooth">
              System Settings
            </AdminNavLink>
            <AdminNavLink to="/admin/payments" icon="heroicons:credit-card">
              Payment Settings
            </AdminNavLink>
          </nav>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-grow bg-neutral-100">
        <div class="p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const toggleNotifications = () => {
  // Toggle notifications panel
  console.log('Toggle notifications');
};
</script>