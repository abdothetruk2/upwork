<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Job Management</h1>
        <p class="text-neutral-600 mt-1">
          Manage and monitor all jobs on the platform
        </p>
      </div>
      <div class="flex space-x-3">
        <button class="btn btn-outline flex items-center">
          <Icon name="heroicons:funnel" class="h-5 w-5 mr-2" />
          Filter
        </button>
        <button class="btn btn-outline flex items-center">
          <Icon name="heroicons:document-arrow-down" class="h-5 w-5 mr-2" />
          Export
        </button>
        <button class="btn btn-primary flex items-center">
          <Icon name="heroicons:plus" class="h-5 w-5 mr-2" />
          Add Job
        </button>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-lg shadow mb-6 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-grow">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="heroicons:magnifying-glass" class="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search jobs by title, client, or skills"
              class="input pl-10"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-2">
          <select v-model="filters.jobType" class="input">
            <option value="">All Types</option>
            <option value="Hourly">Hourly</option>
            <option value="Fixed">Fixed Price</option>
            <option value="Contract">Contract</option>
          </select>
          <select v-model="filters.status" class="input">
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Jobs Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-neutral-200">
          <thead class="bg-neutral-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('title')">
                  Job Title
                  <Icon 
                    :name="sortField === 'title' ? (sortDirection === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down') : 'heroicons:chevron-up-down'" 
                    class="h-4 w-4 ml-1"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('client')">
                  Client
                  <Icon 
                    :name="sortField === 'client' ? (sortDirection === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down') : 'heroicons:chevron-up-down'" 
                    class="h-4 w-4 ml-1"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Budget
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('posted')">
                  Posted
                  <Icon 
                    :name="sortField === 'posted' ? (sortDirection === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down') : 'heroicons:chevron-up-down'" 
                    class="h-4 w-4 ml-1"
                  />
                </div>
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
            <tr v-for="job in sortedJobs" :key="job.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-neutral-900">
                  <NuxtLink :to="`/admin/jobs/${job.id}`" class="hover:text-primary-600">{{ job.title }}</NuxtLink>
                </div>
                <div class="text-xs text-neutral-500 mt-1 flex flex-wrap gap-1">
                  <span 
                    v-for="(skill, i) in job.skills.slice(0, 3)" 
                    :key="i" 
                    class="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-700"
                  >
                    {{ skill }}
                  </span>
                  <span v-if="job.skills.length > 3" class="text-neutral-500">+{{ job.skills.length - 3 }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full overflow-hidden mr-2">
                    <img :src="job.client.avatar" alt="" class="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div class="text-sm font-medium text-neutral-900">{{ job.client.name }}</div>
                    <div class="text-xs text-neutral-500">{{ job.client.location }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="jobTypeClasses[job.type]"
                >
                  {{ job.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                {{ job.budget }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                {{ job.posted }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="statusClasses[job.status]"
                >
                  {{ job.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button 
                    class="text-primary-500 hover:text-primary-600"
                    @click="viewJob(job.id)"
                  >
                    <Icon name="heroicons:eye" class="h-5 w-5" />
                  </button>
                  <button 
                    class="text-neutral-500 hover:text-neutral-600"
                    @click="editJob(job.id)"
                  >
                    <Icon name="heroicons:pencil-square" class="h-5 w-5" />
                  </button>
                  <button 
                    class="text-red-500 hover:text-red-600"
                    @click="confirmDeleteJob(job.id)"
                  >
                    <Icon name="heroicons:trash" class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-neutral-200 sm:px-6">
        <div class="flex-1 flex justify-between items-center">
          <div>
            <p class="text-sm text-neutral-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">{{ jobs.length }}</span> of <span class="font-medium">{{ totalJobs }}</span> jobs
            </p>
          </div>
          <div class="flex space-x-2">
            <button 
              class="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
              :disabled="currentPage === 1"
              @click="prevPage"
            >
              Previous
            </button>
            <button 
              class="relative inline-flex items-center px-4 py-2 border border-neutral-300 text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: 'admin',
});

// Search and filter state
const searchQuery = ref('');
const filters = ref({
  jobType: '',
  status: ''
});

// Sort state
const sortField = ref('posted');
const sortDirection = ref('desc');

// Pagination
const currentPage = ref(1);
const totalJobs = ref(135);
const perPage = ref(10);
const totalPages = computed(() => Math.ceil(totalJobs.value / perPage.value));

// Job status classes
const statusClasses = {
  'Active': 'bg-green-100 text-green-800',
  'Completed': 'bg-blue-100 text-blue-800',
  'Paused': 'bg-yellow-100 text-yellow-800',
  'Canceled': 'bg-red-100 text-red-800'
};

// Job type classes
const jobTypeClasses = {
  'Hourly': 'bg-purple-100 text-purple-800',
  'Fixed': 'bg-indigo-100 text-indigo-800',
  'Contract': 'bg-cyan-100 text-cyan-800',
};

// Mock jobs data (in a real app, this would come from an API)
const jobs = ref([
  {
    id: 1,
    title: 'Senior React Developer for E-commerce Platform',
    type: 'Contract',
    budget: '$5,000 - $10,000',
    status: 'Active',
    posted: 'May 15, 2023',
    skills: ['React', 'Redux', 'GraphQL', 'Responsive Design'],
    client: {
      name: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 2,
    title: 'WordPress Website Redesign',
    type: 'Fixed',
    budget: '$1,500 - $3,000',
    status: 'Active',
    posted: 'May 10, 2023',
    skills: ['WordPress', 'PHP', 'CSS', 'JavaScript', 'UI/UX'],
    client: {
      name: 'Creative Agency LLC',
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 3,
    title: 'Mobile App Developer for Healthcare Startup',
    type: 'Contract',
    budget: '$3,000 - $5,000',
    status: 'Paused',
    posted: 'May 8, 2023',
    skills: ['React Native', 'JavaScript', 'Mobile Development', 'Healthcare'],
    client: {
      name: 'HealthTech Solutions',
      location: 'Boston, MA',
      avatar: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 4,
    title: 'Frontend Developer for E-learning Platform',
    type: 'Hourly',
    budget: '$30 - $50/hr',
    status: 'Active',
    posted: 'May 5, 2023',
    skills: ['Vue.js', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
    client: {
      name: 'EduLearn Inc.',
      location: 'Remote',
      avatar: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 5,
    title: 'UI/UX Designer for Financial App',
    type: 'Fixed',
    budget: '$4,000 - $7,000',
    status: 'Completed',
    posted: 'Apr 28, 2023',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Financial Apps'],
    client: {
      name: 'FinTech Innovations',
      location: 'Chicago, IL',
      avatar: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 6,
    title: 'Technical Content Writer for Developer Documentation',
    type: 'Hourly',
    budget: '$20 - $35/hr',
    status: 'Canceled',
    posted: 'Apr 25, 2023',
    skills: ['Technical Writing', 'API Documentation', 'Markdown', 'Web Technologies'],
    client: {
      name: 'DevTools Co.',
      location: 'Remote',
      avatar: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 7,
    title: 'Full Stack Developer for Social Media Platform',
    type: 'Contract',
    budget: '$8,000 - $12,000',
    status: 'Active',
    posted: 'Apr 20, 2023',
    skills: ['Node.js', 'React', 'MongoDB', 'Socket.io', 'AWS'],
    client: {
      name: 'Social Connect',
      location: 'Austin, TX',
      avatar: 'https://images.pexels.com/photos/3184603/pexels-photo-3184603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 8,
    title: 'E-commerce Store Migration to Shopify',
    type: 'Fixed',
    budget: '$2,000 - $4,000',
    status: 'Completed',
    posted: 'Apr 18, 2023',
    skills: ['Shopify', 'E-commerce', 'Data Migration', 'Liquid'],
    client: {
      name: 'Fashion Retail Inc.',
      location: 'Los Angeles, CA',
      avatar: 'https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 9,
    title: 'AI Chatbot Development for Customer Service',
    type: 'Hourly',
    budget: '$45 - $65/hr',
    status: 'Active',
    posted: 'Apr 15, 2023',
    skills: ['Python', 'Machine Learning', 'Natural Language Processing', 'API Integration'],
    client: {
      name: 'Tech Innovations Inc.',
      location: 'Seattle, WA',
      avatar: 'https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  },
  {
    id: 10,
    title: 'Database Administrator for Cloud Migration',
    type: 'Contract',
    budget: '$6,000 - $9,000',
    status: 'Paused',
    posted: 'Apr 10, 2023',
    skills: ['PostgreSQL', 'AWS', 'Cloud Migration', 'Database Optimization'],
    client: {
      name: 'Cloud Solutions Ltd.',
      location: 'Denver, CO',
      avatar: 'https://images.pexels.com/photos/3182783/pexels-photo-3182783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  }
]);

// Filtered and sorted jobs
const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const matchesSearch = searchQuery.value === '' || 
      job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.client.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    const matchesType = filters.value.jobType === '' || job.type === filters.value.jobType;
    const matchesStatus = filters.value.status === '' || job.status === filters.value.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });
});

const sortedJobs = computed(() => {
  const sorted = [...filteredJobs.value].sort((a, b) => {
    let aValue = a[sortField.value];
    let bValue = b[sortField.value];
    
    if (sortField.value === 'client') {
      aValue = a.client.name;
      bValue = b.client.name;
    }
    
    if (sortField.value === 'posted') {
      // Convert dates to comparable format (simple string comparison for this example)
      // In a real app, you would use proper date parsing
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  return sorted;
});

// Sort by field
function sortBy(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortDirection.value = 'asc';
  }
}

// Pagination methods
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Job actions
function viewJob(id) {
  console.log('View job', id);
  // In a real app, navigate to job details page
  navigateTo(`/admin/jobs/${id}`);
}

function editJob(id) {
  console.log('Edit job', id);
  // In a real app, open edit form or navigate to edit page
  alert(`Editing job ${id}`);
}

function confirmDeleteJob(id) {
  if (confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
    console.log('Delete job', id);
    // In a real app, send API request to delete job
    alert(`Deleted job ${id}`);
  }
}
</script>