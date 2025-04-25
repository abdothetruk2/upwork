<template>
  <div class="bg-white min-h-screen">
    <div class="bg-primary-500 py-12">
      <div class="container-custom">
        <h1 class="text-3xl font-bold text-white mb-8">Find Work</h1>
        <div class="bg-white rounded-xl shadow-lg p-4">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-grow">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="heroicons:magnifying-glass" class="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  v-model="searchQuery"
                  placeholder="Search for jobs"
                  class="input pl-10"
                />
              </div>
            </div>
            <div class="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <select v-model="selectedCategory" class="input">
                <option value="">All Categories</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <button @click="applyFilters" class="btn btn-primary">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-custom py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters Sidebar -->
        <div class="w-full lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-xl shadow-sm border border-neutral-200 sticky top-20">
            <div class="p-4 border-b border-neutral-200">
              <h2 class="font-semibold text-lg">Filters</h2>
            </div>

            <div class="p-4 border-b border-neutral-200">
              <h3 class="font-medium mb-3">Job Type</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" v-model="filters.jobTypes" value="Hourly" class="mr-2" />
                  Hourly
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="filters.jobTypes" value="Fixed" class="mr-2" />
                  Fixed Price
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="filters.jobTypes" value="Contract" class="mr-2" />
                  Contract
                </label>
              </div>
            </div>

            <div class="p-4 border-b border-neutral-200">
              <h3 class="font-medium mb-3">Experience Level</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" v-model="filters.experienceLevels" value="Entry" class="mr-2" />
                  Entry Level
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="filters.experienceLevels" value="Intermediate" class="mr-2" />
                  Intermediate
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="filters.experienceLevels" value="Expert" class="mr-2" />
                  Expert
                </label>
              </div>
            </div>

            <div class="p-4 border-b border-neutral-200">
              <h3 class="font-medium mb-3">Client Rating</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="radio" name="rating" v-model="filters.clientRating" value="4" class="mr-2" />
                  4+ stars
                </label>
                <label class="flex items-center">
                  <input type="radio" name="rating" v-model="filters.clientRating" value="3" class="mr-2" />
                  3+ stars
                </label>
                <label class="flex items-center">
                  <input type="radio" name="rating" v-model="filters.clientRating" value="any" class="mr-2" />
                  Any
                </label>
              </div>
            </div>

            <div class="p-4">
              <button @click="applyFilters" class="btn btn-primary w-full">
                Apply Filters
              </button>
              <button @click="resetFilters" class="btn btn-outline w-full mt-2">
                Reset
              </button>
            </div>
          </div>
        </div>

        <!-- Job Listings -->
        <div class="flex-grow">
          <div class="mb-6 flex justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold">{{ filteredJobs.length }} jobs found</h2>
              <p class="text-neutral-500">Matching your skills and preferences</p>
            </div>
            <div>
              <select v-model="sortOption" class="input w-48">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget_high">Highest Budget</option>
                <option value="budget_low">Lowest Budget</option>
              </select>
            </div>
          </div>

          <div v-if="isLoading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>

          <div v-else-if="filteredJobs.length === 0" class="text-center py-12">
            <div class="bg-neutral-50 p-8 rounded-xl">
              <Icon name="heroicons:magnifying-glass" class="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 class="text-xl font-medium text-neutral-800 mb-2">No jobs found</h3>
              <p class="text-neutral-600 mb-6">
                Try adjusting your search criteria or browse our categories
              </p>
              <button @click="resetFilters" class="btn btn-primary">
                Reset Filters
              </button>
            </div>
          </div>

          <div v-else class="space-y-6">
            <JobCard 
              v-for="job in sortedJobs" 
              :key="job.id" 
              :job="job"
            />
            
            <div class="py-8 flex justify-center">
              <button v-if="hasMoreJobs" @click="loadMoreJobs" class="btn btn-outline">
                <span v-if="loadingMore" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-neutral-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading more...
                </span>
                <span v-else>Load More Jobs</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref('');
const selectedCategory = ref('');
const isLoading = ref(false);
const loadingMore = ref(false);
const hasMoreJobs = ref(true);
const sortOption = ref('newest');

const filters = reactive({
  jobTypes: [],
  experienceLevels: [],
  clientRating: 'any',
});

const categories = ref([
  { id: 1, name: 'Web Development' },
  { id: 2, name: 'Mobile Development' },
  { id: 3, name: 'UI/UX Design' },
  { id: 4, name: 'Content Writing' },
  { id: 5, name: 'Digital Marketing' }
]);

// Sample jobs data - in a real app this would come from an API
const allJobs = ref([
  {
    id: 1,
    title: 'Senior React.js Developer for E-commerce Platform',
    type: 'Contract',
    level: 'Expert',
    budget: '$5,000 - $10,000',
    description: 'We are looking for an experienced React developer to help us build the frontend of our e-commerce platform. The ideal candidate should have experience with Redux, GraphQL, and responsive design.',
    skills: ['React.js', 'Redux', 'GraphQL', 'Responsive Design'],
    client: {
      name: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      avatar: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.8
    },
    postedAt: '2 days ago',
    proposals: 18,
    categoryId: 1
  },
  {
    id: 2,
    title: 'WordPress Website Redesign and Development',
    type: 'Fixed',
    level: 'Intermediate',
    budget: '$1,500 - $3,000',
    description: 'We need to redesign our existing WordPress website to improve UX/UI and overall performance. We are looking for someone who can create a modern, responsive design and implement it with clean code.',
    skills: ['WordPress', 'PHP', 'CSS', 'JavaScript', 'UI/UX Design'],
    client: {
      name: 'Creative Agency LLC',
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.2
    },
    postedAt: '5 days ago',
    proposals: 27,
    categoryId: 1
  },
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
      avatar: 'https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 3.9
    },
    postedAt: '1 day ago',
    proposals: 12,
    categoryId: 2
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
      avatar: 'https://images.pexels.com/photos/1181712/pexels-photo-1181712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.5
    },
    postedAt: '3 days ago',
    proposals: 24,
    categoryId: 1
  },
  {
    id: 5,
    title: 'UI/UX Designer for Financial App',
    type: 'Fixed',
    level: 'Expert',
    budget: '$4,000 - $7,000',
    description: 'We are looking for a UI/UX designer to redesign our financial app. The ideal candidate should have experience with financial applications, user research, and creating clean, intuitive interfaces.',
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Financial Apps'],
    client: {
      name: 'FinTech Innovations',
      location: 'Chicago, IL',
      avatar: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.7
    },
    postedAt: '4 days ago',
    proposals: 19,
    categoryId: 3
  },
  {
    id: 6,
    title: 'Technical Content Writer for Developer Documentation',
    type: 'Hourly',
    level: 'Entry',
    budget: '$20 - $35/hr',
    description: 'We need a technical writer to create documentation for our API and developer tools. The ideal candidate should have experience with technical writing, understanding of web technologies, and excellent English writing skills.',
    skills: ['Technical Writing', 'API Documentation', 'Markdown', 'Web Technologies'],
    client: {
      name: 'DevTools Co.',
      location: 'Remote',
      avatar: 'https://images.pexels.com/photos/1181292/pexels-photo-1181292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      rating: 4.0
    },
    postedAt: '6 days ago',
    proposals: 15,
    categoryId: 4
  }
]);

// Filtered jobs based on search, category and filters
const filteredJobs = computed(() => {
  let result = [...allJobs.value];
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(job => 
      job.title.toLowerCase().includes(query) || 
      job.description.toLowerCase().includes(query) ||
      job.skills.some(skill => skill.toLowerCase().includes(query))
    );
  }
  
  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(job => job.categoryId === parseInt(selectedCategory.value));
  }
  
  // Filter by job types
  if (filters.jobTypes.length > 0) {
    result = result.filter(job => filters.jobTypes.includes(job.type));
  }
  
  // Filter by experience levels
  if (filters.experienceLevels.length > 0) {
    result = result.filter(job => filters.experienceLevels.includes(job.level));
  }
  
  // Filter by client rating
  if (filters.clientRating !== 'any') {
    const minRating = parseInt(filters.clientRating);
    result = result.filter(job => job.client.rating >= minRating);
  }
  
  return result;
});

// Sorted jobs based on sort option
const sortedJobs = computed(() => {
  const jobs = [...filteredJobs.value];
  
  switch (sortOption.value) {
    case 'newest':
      // For demo purposes, we'll just return as is (assuming they're already sorted by newest)
      return jobs;
    case 'oldest':
      return [...jobs].reverse();
    case 'budget_high':
      return [...jobs].sort((a, b) => {
        // This is a simplified sorting for demo purposes
        const aValue = parseInt(a.budget.replace(/[^\d]/g, ''));
        const bValue = parseInt(b.budget.replace(/[^\d]/g, ''));
        return bValue - aValue;
      });
    case 'budget_low':
      return [...jobs].sort((a, b) => {
        const aValue = parseInt(a.budget.replace(/[^\d]/g, ''));
        const bValue = parseInt(b.budget.replace(/[^\d]/g, ''));
        return aValue - bValue;
      });
    default:
      return jobs;
  }
});

// Simulate searching/filtering
function applyFilters() {
  isLoading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    isLoading.value = false;
  }, 800);
}

// Reset filters
function resetFilters() {
  searchQuery.value = '';
  selectedCategory.value = '';
  filters.jobTypes = [];
  filters.experienceLevels = [];
  filters.clientRating = 'any';
  
  applyFilters();
}

// Load more jobs
function loadMoreJobs() {
  loadingMore.value = true;
  
  // Simulate loading more jobs
  setTimeout(() => {
    loadingMore.value = false;
    // In a real app, you would fetch more jobs and add them to allJobs
    
    // For demo purposes, we'll just set hasMoreJobs to false after first load
    hasMoreJobs.value = false;
  }, 1000);
}

// Initial load
onMounted(() => {
  applyFilters();
});
</script>