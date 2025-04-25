<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Admin Dashboard</h1>
        <p class="text-neutral-600 mt-1">
          Overview of platform statistics and activity
        </p>
      </div>
      <div>
        <span class="text-sm text-neutral-600 mr-2">Last updated: {{ formattedDate }}</span>
        <button 
          @click="refreshData" 
          class="text-primary-500 hover:text-primary-600"
        >
          <Icon name="heroicons:arrow-path" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Total Users</p>
            <p class="mt-2 text-3xl font-bold">{{ dashboardStats.totalUsers }}</p>
          </div>
          <div class="p-2 rounded-lg bg-primary-100 text-primary-600">
            <Icon name="heroicons:users" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-success-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-up" class="h-4 w-4 mr-1" />
            {{ dashboardStats.userGrowth }}%
          </span>
          <span class="text-neutral-500 ml-2">from last month</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Active Jobs</p>
            <p class="mt-2 text-3xl font-bold">{{ dashboardStats.activeJobs }}</p>
          </div>
          <div class="p-2 rounded-lg bg-secondary-100 text-secondary-600">
            <Icon name="heroicons:briefcase" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-success-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-up" class="h-4 w-4 mr-1" />
            {{ dashboardStats.jobGrowth }}%
          </span>
          <span class="text-neutral-500 ml-2">from last month</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Revenue</p>
            <p class="mt-2 text-3xl font-bold">${{ dashboardStats.revenue.toLocaleString() }}</p>
          </div>
          <div class="p-2 rounded-lg bg-accent-100 text-accent-600">
            <Icon name="heroicons:banknotes" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-success-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-up" class="h-4 w-4 mr-1" />
            {{ dashboardStats.revenueGrowth }}%
          </span>
          <span class="text-neutral-500 ml-2">from last month</span>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-neutral-500">Completed Contracts</p>
            <p class="mt-2 text-3xl font-bold">{{ dashboardStats.completedContracts }}</p>
          </div>
          <div class="p-2 rounded-lg bg-yellow-100 text-yellow-600">
            <Icon name="heroicons:document-check" class="h-6 w-6" />
          </div>
        </div>
        <div class="mt-2 flex items-center text-sm">
          <span class="text-error-500 font-medium flex items-center">
            <Icon name="heroicons:arrow-down" class="h-4 w-4 mr-1" />
            {{ Math.abs(dashboardStats.contractGrowth) }}%
          </span>
          <span class="text-neutral-500 ml-2">from last month</span>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="font-semibold text-lg mb-4">User Registration</h2>
        <div class="h-64">
          <LineChart :chart-data="userChartData" :options="chartOptions" />
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="font-semibold text-lg mb-4">Revenue</h2>
        <div class="h-64">
          <BarChart :chart-data="revenueChartData" :options="chartOptions" />
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white rounded-lg shadow mb-8">
      <div class="p-6 border-b border-neutral-200">
        <h2 class="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div class="divide-y divide-neutral-200">
        <div v-for="(activity, index) in recentActivities" :key="index" class="p-6 flex">
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
        <NuxtLink to="/admin/activity" class="text-primary-500 font-medium hover:text-primary-600">
          View all activity
        </NuxtLink>
      </div>
    </div>

    <!-- New Users -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-neutral-200 flex justify-between items-center">
        <h2 class="text-lg font-semibold">Latest Users</h2>
        <NuxtLink to="/admin/users" class="text-primary-500 hover:text-primary-600 text-sm font-medium">
          View All
        </NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-neutral-200">
          <thead class="bg-neutral-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Location
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Joined
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-neutral-200">
            <tr v-for="user in latestUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-10 w-10 rounded-full overflow-hidden mr-3">
                    <img :src="user.avatar" :alt="user.name" class="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900">{{ user.name }}</div>
                    <div class="text-sm text-neutral-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="user.type === 'Freelancer' ? 'bg-primary-100 text-primary-800' : 'bg-secondary-100 text-secondary-800'"
                >
                  {{ user.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                {{ user.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                {{ user.joined }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="statusClasses[user.status]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <NuxtLink :to="`/admin/users/${user.id}`" class="text-primary-500 hover:text-primary-600 mr-3">
                  View
                </NuxtLink>
                <a href="#" class="text-neutral-500 hover:text-neutral-600">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { format } from 'date-fns';
import { Line as LineChart, Bar as BarChart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, BarElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, BarElement);

definePageMeta({
  layout: 'admin',
});

// Dashboard statistics
const dashboardStats = ref({
  totalUsers: 24578,
  userGrowth: 12,
  activeJobs: 8723,
  jobGrowth: 8,
  revenue: 342890,
  revenueGrowth: 15,
  completedContracts: 5467,
  contractGrowth: -3
});

// Chart data for user registrations
const userChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Users',
      backgroundColor: 'rgba(233, 84, 32, 0.2)',
      borderColor: '#e95420',
      data: [1200, 1900, 1650, 2100, 2500, 2800]
    }
  ]
});

// Chart data for revenue
const revenueChartData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue ($)',
      backgroundColor: 'rgba(20, 168, 0, 0.2)',
      borderColor: '#14a800',
      data: [48000, 59000, 53000, 61000, 69000, 75000]
    }
  ]
});

// Chart options
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  }
});

// Activity types and icons
const activityTypeIcons = {
  user: 'heroicons:user',
  job: 'heroicons:briefcase',
  payment: 'heroicons:banknotes',
  contract: 'heroicons:clipboard-document-check',
  security: 'heroicons:shield-exclamation'
};

const activityTypeClasses = {
  user: 'bg-primary-100 text-primary-600',
  job: 'bg-secondary-100 text-secondary-600',
  payment: 'bg-accent-100 text-accent-600',
  contract: 'bg-yellow-100 text-yellow-600',
  security: 'bg-red-100 text-red-600'
};

// Recent activities
const recentActivities = ref([
  {
    type: 'user',
    message: 'New user Sarah Johnson registered as a freelancer',
    time: '25 minutes ago'
  },
  {
    type: 'job',
    message: 'Job "Senior React Developer Needed" was posted by TechCorp Inc.',
    time: '2 hours ago'
  },
  {
    type: 'payment',
    message: 'Payment of $1,200 was processed for project "E-commerce Redesign"',
    time: '3 hours ago'
  },
  {
    type: 'contract',
    message: 'Contract between Alex Wong and Digital Solutions was completed',
    time: '5 hours ago'
  },
  {
    type: 'security',
    message: 'Multiple failed login attempts detected for user admin@upclone.com',
    time: '1 day ago'
  }
]);

// User status classes
const statusClasses = {
  'Active': 'bg-green-100 text-green-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Suspended': 'bg-red-100 text-red-800',
  'Inactive': 'bg-neutral-100 text-neutral-800'
};

// Latest users
const latestUsers = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Freelancer',
    location: 'Toronto, Canada',
    joined: '2 hours ago',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    type: 'Client',
    location: 'Berlin, Germany',
    joined: '5 hours ago',
    status: 'Pending',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Jessica Patel',
    email: 'jessica.p@example.com',
    type: 'Freelancer',
    location: 'Mumbai, India',
    joined: '1 day ago',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.w@example.com',
    type: 'Client',
    location: 'London, UK',
    joined: '2 days ago',
    status: 'Inactive',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    email: 'emma.r@example.com',
    type: 'Freelancer',
    location: 'Barcelona, Spain',
    joined: '3 days ago',
    status: 'Suspended',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]);

// Current date formatted
const formattedDate = computed(() => {
  return format(new Date(), 'MMM d, yyyy h:mm a');
});

// Refresh data method
const refreshData = () => {
  // In a real app, this would fetch fresh data from an API
  console.log('Refreshing dashboard data...');
};

onMounted(() => {
  // In a real app, you would fetch the initial data here
  console.log('Admin dashboard mounted');
});
</script>