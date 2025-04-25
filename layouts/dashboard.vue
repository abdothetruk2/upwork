<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <div class="flex-grow flex">
      <DashboardSidebar />
      <main class="flex-grow">
        <div class="container-custom py-6">
          <slot />
        </div>
      </main>
    </div>
    <AppFooter />
  </div>
</template>