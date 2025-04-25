<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <p class="text-neutral-600 mt-1">
        Welcome back, {{ user.firstName }}! Here's an overview of your activity.
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Active Proposals</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.activeProposals }}</p>
          </div>
          <div class="p-2 rounded-lg bg-primary-100 text-primary-600">
            <Icon name="heroicons:document-text" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-success-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-up" class="h-4 w-4 mr-1" />
            4%
          </span>
          <span class="text-neutral-500 ml-2">from last week</span>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Active Contracts</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.activeContracts }}</p>
          </div>
          <div class="p-2 rounded-lg bg-secondary-100 text-secondary-600">
            <Icon name="heroicons:clipboard-document-check" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-success-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-up" class="h-4 w-4 mr-1" />
            12%
          </span>
          <span class="text-neutral-500 ml-2">from last month</span>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Earnings</p>
            <p class="mt-2 text-3xl font-bold">${{ stats.earnings.toLocaleString() }}</p>
          </div>
          <div class="p-2 rounded-lg bg-accent-100 text-accent-600">
            <Icon name="heroicons:banknotes" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-success-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-up" class="h-4 w-4 mr-1" />
            8%
          </span>
          <span class="text-neutral-500 ml-2">from last month</span>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Profile Views</p>
            <p class="mt-2 text-3xl font-bold">{{ stats.profileViews }}</p>
          </div>
          <div class="p-2 rounded-lg bg-yellow-100 text-yellow-600">
            <Icon name="heroicons:eye" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-error-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-down" class="h-4 w-4 mr-1" />
            3%
          </span>
          <span class="text-neutral-500 ml-2">from last week</span>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card mb-8">
      <div class="p-6 border-b border-neutral-200">
        <h2 class="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div class="divide-y divide-neutral-200">
        <div v-for="(activity, index) in activities" :key="index" class="p-6 flex">
          <div 
            class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4"
            :class="activityTypeClasses[activity.type]"
          >
            <Icon :name="activityTypeIcons[activity.type]" class="h-5 w-5" />
          </div>
          <div>
            <p class="text-neutral-900">{{ activity.message }}</p>
            <p class="text-sm text-neutral-500">{{ activity.time }}</p>
          </div>
        </div>
      </div>
      <div class="p-4 border-t border-neutral-200 bg-neutral-50 text-center">
        <a href="#" class="text-primary-500 font-medium hover:text-primary-600">
          View all activity
        </a>
      </div>
    </div>

    <!-- Job Recommendations -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg font-semibold">Recommended Jobs</h2>
        <NuxtLink to="/find-work" class="text-primary-500 font-medium hover:text-primary-600">
          View all
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobCard 
          v-for="job in recommendedJobs" 
          :key="job.id" 
          :job="job" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'dashboard'
});

const user = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  type: 'freelancer'
});

const stats = ref({
  activeProposals: 7,
  activeContracts: 3,
  earnings: 4850,
  profileViews: 142
});

const activityTypeIcons = {
  proposal: 'heroicons:document-text',
  contract: 'heroicons:clipboard-document-check',
  message: 'heroicons:chat-bubble-oval-left-ellipsis',
  payment: 'heroicons:banknotes'
};

const activityTypeClasses = {
  proposal: 'bg-primary-100 text-primary-600',
  contract: 'bg-secondary-100 text-secondary-600',
  message: 'bg-neutral-100 text-neutral-600',
  payment: 'bg-accent-100 text-accent-600'
};

const activities = ref([
  {
    type: 'proposal',
    message: 'Your proposal for "React Native Developer" was viewed by the client',
    time: '2 hours ago'
  },
  {
    type: 'message',
    message: 'You received a new message from Alex Morgan',
    time: '5 hours ago'
  },
  {
    type: 'contract',
    message: 'Your contract with TechCorp Inc. has been funded',
    time: 'Yesterday at 3:45 PM'
  },
  {
    type: 'payment',
    message: 'You received a payment of $750 for "UI Design Project"',
    time: '2 days ago'
  }
]);

const recommendedJobs = ref([
  {
    id: 3,
    title: 'Mobile App Developer for Healthcare Startup',
    type: 'Contract',
    level: 'Intermediate',
    budget: '$3,000 - $5,000',
    description: 'We are building a healthcare app that helps patients track their medications and appointments. Looking for a mobile developer experienced with React Native and familiar with health data privacy requirements.',
    skills: ['React Native', 'JavaScript', 'Mobile Development', 'Healthcare'],
    client: {
      name: 'HealthTech Solutions',
      location: 'Boston, MA',
      avatar: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    postedAt: '1 day ago',
    proposals: 12
  },
  {
    id: 4,
    title: 'Frontend Developer for E-learning Platform',
    type: 'Hourly',
    level: 'Intermediate',
    budget: '$30 - $50/hr',
    description: 'We need a frontend developer to help build our e-learning platform. The ideal candidate should have experience with Vue.js, responsive design, and creating interactive user interfaces for educational content.',
    skills: ['Vue.js', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
    client: {
      name: 'EduLearn Inc.',
      location: 'Remote',
      avatar: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    postedAt: '3 days ago',
    proposals: 24
  }
]);
</script>