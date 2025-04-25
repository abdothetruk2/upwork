<template>
  <div class="w-64 bg-white border-r border-neutral-200 hidden lg:block">
    <div class="h-full flex flex-col">
      <div class="flex-1 py-6 px-4 space-y-1">
        <div class="px-2 pb-6">
          <h3 class="text-sm font-medium text-neutral-500 uppercase tracking-wider">
            {{ userType }} Dashboard
          </h3>
        </div>
        
        <!-- Freelancer Navigation -->
        <template v-if="userType === 'Freelancer'">
          <SidebarLink to="/dashboard" icon="heroicons:home">
            Home
          </SidebarLink>
          <SidebarLink to="/find-work" icon="heroicons:briefcase">
            Find Work
          </SidebarLink>
          <SidebarLink to="/proposals" icon="heroicons:document-text">
            Proposals
          </SidebarLink>
          <SidebarLink to="/contracts" icon="heroicons:clipboard-document-check">
            Contracts
          </SidebarLink>
          <SidebarLink to="/messages" icon="heroicons:chat-bubble-left-right">
            Messages
            <span class="bg-primary-100 text-primary-800 ml-auto inline-block py-0.5 px-2 text-xs rounded-full">
              3
            </span>
          </SidebarLink>
        </template>
        
        <!-- Client Navigation -->
        <template v-else>
          <SidebarLink to="/dashboard" icon="heroicons:home">
            Home
          </SidebarLink>
          <SidebarLink to="/post-job" icon="heroicons:plus-circle">
            Post a Job
          </SidebarLink>
          <SidebarLink to="/my-jobs" icon="heroicons:clipboard-document-list">
            My Jobs
          </SidebarLink>
          <SidebarLink to="/talent" icon="heroicons:users">
            Talent
          </SidebarLink>
          <SidebarLink to="/messages" icon="heroicons:chat-bubble-left-right">
            Messages
            <span class="bg-primary-100 text-primary-800 ml-auto inline-block py-0.5 px-2 text-xs rounded-full">
              2
            </span>
          </SidebarLink>
        </template>
        
        <div class="pt-4 mt-4 border-t border-neutral-200">
          <SidebarLink to="/profile" icon="heroicons:user-circle">
            Profile
          </SidebarLink>
          <SidebarLink to="/settings" icon="heroicons:cog-6-tooth">
            Settings
          </SidebarLink>
          <SidebarLink to="/help" icon="heroicons:question-mark-circle">
            Help
          </SidebarLink>
        </div>
      </div>
      
      <div class="p-4 border-t border-neutral-200">
        <div class="flex items-center">
          <div class="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
            {{ userInitials }}
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-neutral-700">{{ userName }}</p>
            <p class="text-xs text-neutral-500">{{ userType }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const userType = ref('Freelancer'); // or 'Client'
const userName = ref('John Doe');
const userInitials = computed(() => {
  if (!userName.value) return '';
  return userName.value
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();
});
</script>