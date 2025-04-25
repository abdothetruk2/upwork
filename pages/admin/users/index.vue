<template>
  <div>
    <div class="mb-8 flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">User Management</h1>
        <p class="text-neutral-600 mt-1">
          Manage and monitor all users on the platform
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
          Add User
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
              placeholder="Search users by name, email or location"
              class="input pl-10"
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-2">
          <select v-model="filters.userType" class="input">
            <option value="">All Types</option>
            <option value="Freelancer">Freelancers</option>
            <option value="Client">Clients</option>
            <option value="Admin">Admins</option>
          </select>
          <select v-model="filters.status" class="input">
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-neutral-200">
          <thead class="bg-neutral-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div class="flex items-center">
                  <input type="checkbox" class="mr-2" @change="toggleSelectAll" v-model="selectAll" />
                  User
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('location')">
                  Location
                  <Icon 
                    :name="sortField === 'location' ? (sortDirection === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down') : 'heroicons:chevron-up-down'" 
                    class="h-4 w-4 ml-1"
                  />
                </div>
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                <div class="flex items-center cursor-pointer" @click="sortBy('joined')">
                  Joined
                  <Icon 
                    :name="sortField === 'joined' ? (sortDirection === 'asc' ? 'heroicons:chevron-up' : 'heroicons:chevron-down') : 'heroicons:chevron-up-down'" 
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
            <tr v-for="user in sortedUsers" :key="user.id" :class="selectedUsers.includes(user.id) ? 'bg-primary-50' : ''">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <input type="checkbox" class="mr-2" v-model="selectedUsers" :value="user.id" />
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
                  :class="userTypeClasses[user.type]"
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
                <div class="flex justify-end space-x-2">
                  <button 
                    class="text-primary-500 hover:text-primary-600"
                    @click="viewUser(user.id)"
                  >
                    <Icon name="heroicons:eye" class="h-5 w-5" />
                  </button>
                  <button 
                    class="text-neutral-500 hover:text-neutral-600"
                    @click="editUser(user.id)"
                  >
                    <Icon name="heroicons:pencil-square" class="h-5 w-5" />
                  </button>
                  <button 
                    class="text-red-500 hover:text-red-600"
                    @click="confirmDeleteUser(user.id)"
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
              Showing <span class="font-medium">1</span> to <span class="font-medium">{{ users.length }}</span> of <span class="font-medium">{{ totalUsers }}</span> results
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

    <!-- Bulk Actions (visible when items are selected) -->
    <div 
      v-if="selectedUsers.length > 0"
      class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-10"
    >
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="p-2 rounded-lg bg-primary-500 shadow-lg sm:p-3">
          <div class="flex items-center justify-between flex-wrap">
            <div class="flex-1 flex items-center">
              <span class="flex p-2 rounded-lg bg-primary-600">
                <Icon name="heroicons:check" class="h-6 w-6 text-white" />
              </span>
              <p class="ml-3 font-medium text-white truncate">
                <span>{{ selectedUsers.length }} users selected</span>
              </p>
            </div>
            <div class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <div class="flex space-x-2">
                <button 
                  class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-primary-50"
                  @click="verifySelected"
                >
                  Verify
                </button>
                <button 
                  class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                  @click="suspendSelected"
                >
                  Suspend
                </button>
              </div>
            </div>
            <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
              <button
                type="button"
                class="-mr-1 flex p-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-white"
                @click="clearSelection"
              >
                <span class="sr-only">Dismiss</span>
                <Icon name="heroicons:x-mark" class="h-6 w-6 text-white" />
              </button>
            </div>
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
  userType: '',
  status: ''
});

// Sort state
const sortField = ref('joined');
const sortDirection = ref('desc');

// Pagination
const currentPage = ref(1);
const totalUsers = ref(250);
const perPage = ref(10);
const totalPages = computed(() => Math.ceil(totalUsers.value / perPage.value));

// Selection
const selectedUsers = ref([]);
const selectAll = ref(false);

// User status classes
const statusClasses = {
  'Active': 'bg-green-100 text-green-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Suspended': 'bg-red-100 text-red-800',
  'Inactive': 'bg-neutral-100 text-neutral-800'
};

// User type classes
const userTypeClasses = {
  'Freelancer': 'bg-primary-100 text-primary-800',
  'Client': 'bg-secondary-100 text-secondary-800',
  'Admin': 'bg-accent-100 text-accent-800'
};

// Mock users data (in a real app, this would come from an API)
const users = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'Freelancer',
    location: 'Toronto, Canada',
    joined: 'Jun 15, 2023',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    type: 'Client',
    location: 'Berlin, Germany',
    joined: 'May 22, 2023',
    status: 'Pending',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    name: 'Jessica Patel',
    email: 'jessica.p@example.com',
    type: 'Freelancer',
    location: 'Mumbai, India',
    joined: 'Jul 3, 2023',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    name: 'David Wilson',
    email: 'david.w@example.com',
    type: 'Client',
    location: 'London, UK',
    joined: 'Apr 18, 2023',
    status: 'Inactive',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 5,
    name: 'Emma Rodriguez',
    email: 'emma.r@example.com',
    type: 'Freelancer',
    location: 'Barcelona, Spain',
    joined: 'Feb 9, 2023',
    status: 'Suspended',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 6,
    name: 'James Taylor',
    email: 'james.t@example.com',
    type: 'Admin',
    location: 'New York, USA',
    joined: 'Jan 12, 2023',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 7,
    name: 'Sophia Lee',
    email: 'sophia.l@example.com',
    type: 'Freelancer',
    location: 'Seoul, South Korea',
    joined: 'Mar 27, 2023',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 8,
    name: 'Daniel Martinez',
    email: 'daniel.m@example.com',
    type: 'Client',
    location: 'Mexico City, Mexico',
    joined: 'May 5, 2023',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 9,
    name: 'Olivia Brown',
    email: 'olivia.b@example.com',
    type: 'Freelancer',
    location: 'Sydney, Australia',
    joined: 'Jun 30, 2023',
    status: 'Pending',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 10,
    name: 'Noah Wilson',
    email: 'noah.w@example.com',
    type: 'Client',
    location: 'Vancouver, Canada',
    joined: 'Apr 12, 2023',
    status: 'Active',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]);

// Filtered and sorted users
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = searchQuery.value === '' || 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    const matchesType = filters.value.userType === '' || user.type === filters.value.userType;
    const matchesStatus = filters.value.status === '' || user.status === filters.value.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });
});

const sortedUsers = computed(() => {
  const sorted = [...filteredUsers.value].sort((a, b) => {
    let aValue = a[sortField.value];
    let bValue = b[sortField.value];
    
    if (sortField.value === 'joined') {
      // Convert dates to comparable format (for this example, simple string comparison)
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

// Selection methods
function toggleSelectAll() {
  if (selectAll.value) {
    selectedUsers.value = filteredUsers.value.map(user => user.id);
  } else {
    selectedUsers.value = [];
  }
}

function clearSelection() {
  selectedUsers.value = [];
  selectAll.value = false;
}

// Bulk actions
function verifySelected() {
  console.log('Verifying users:', selectedUsers.value);
  // In a real app, send API request to verify these users
  alert(`Verified ${selectedUsers.value.length} users`);
  clearSelection();
}

function suspendSelected() {
  console.log('Suspending users:', selectedUsers.value);
  // In a real app, send API request to suspend these users
  alert(`Suspended ${selectedUsers.value.length} users`);
  clearSelection();
}

// Individual user actions
function viewUser(id) {
  console.log('View user', id);
  // In a real app, navigate to user details page
  navigateTo(`/admin/users/${id}`);
}

function editUser(id) {
  console.log('Edit user', id);
  // In a real app, open edit form or navigate to edit page
  alert(`Editing user ${id}`);
}

function confirmDeleteUser(id) {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    console.log('Delete user', id);
    // In a real app, send API request to delete user
    alert(`Deleted user ${id}`);
  }
}
</script>