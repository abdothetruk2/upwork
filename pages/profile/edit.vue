<template>
  <div class="bg-neutral-50 py-8">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold">Edit Profile</h1>
          <p class="text-neutral-600">Update your personal information and profile settings</p>
        </div>
        
        <form @submit.prevent="saveProfile">
          <!-- Profile Information -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-6">Basic Information</h2>
            
            <!-- Profile Photo -->
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div class="flex-shrink-0">
                <div class="relative group">
                  <div class="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow">
                    <img :src="profile.avatar || 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'" alt="Profile" class="h-full w-full object-cover" />
                  </div>
                  <div class="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <Icon name="heroicons:camera" class="text-white h-8 w-8" />
                  </div>
                </div>
              </div>
              
              <div class="flex-grow">
                <h3 class="font-medium mb-2">Profile Photo</h3>
                <p class="text-neutral-500 text-sm mb-4">Upload a professional profile picture. A clear, friendly headshot works best.</p>
                <div class="flex space-x-2">
                  <button type="button" class="btn btn-outline py-1.5 px-3">Upload Photo</button>
                  <button type="button" class="btn py-1.5 px-3 bg-neutral-200 text-neutral-700 hover:bg-neutral-300">Remove</button>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="first-name" class="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                <input type="text" id="first-name" v-model="profile.firstName" class="input" />
              </div>
              
              <div>
                <label for="last-name" class="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                <input type="text" id="last-name" v-model="profile.lastName" class="input" />
              </div>
              
              <div>
                <label for="title" class="block text-sm font-medium text-neutral-700 mb-1">Professional Title</label>
                <input type="text" id="title" v-model="profile.title" class="input" />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                <input type="email" id="email" v-model="profile.email" class="input" />
              </div>
              
              <div>
                <label for="location" class="block text-sm font-medium text-neutral-700 mb-1">Location</label>
                <input type="text" id="location" v-model="profile.location" class="input" />
              </div>
              
              <div>
                <label for="phone" class="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                <input type="tel" id="phone" v-model="profile.phone" class="input" />
              </div>
            </div>
          </div>
          
          <!-- Professional Information -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-6">Professional Information</h2>
            
            <div class="space-y-6">
              <div>
                <label for="bio" class="block text-sm font-medium text-neutral-700 mb-1">Bio</label>
                <textarea id="bio" v-model="profile.bio" rows="6" class="input"></textarea>
                <p class="mt-1 text-sm text-neutral-500">
                  Describe your professional background, expertise, and what you can offer clients. 
                  {{ 1000 - profile.bio.length }} characters remaining.
                </p>
              </div>
              
              <div>
                <label for="skills" class="block text-sm font-medium text-neutral-700 mb-1">Skills</label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span 
                    v-for="(skill, index) in profile.skills" 
                    :key="index"
                    class="badge badge-primary flex items-center"
                  >
                    {{ skill }}
                    <button 
                      type="button" 
                      @click="removeSkill(index)" 
                      class="ml-1 text-primary-700 hover:text-primary-900"
                    >
                      <Icon name="heroicons:x-mark" class="h-3 w-3" />
                    </button>
                  </span>
                </div>
                <div class="flex gap-2">
                  <input type="text" v-model="newSkill" placeholder="Add a skill" class="input" />
                  <button 
                    type="button" 
                    @click="addSkill"
                    class="btn btn-primary"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div>
                <label for="hourly-rate" class="block text-sm font-medium text-neutral-700 mb-1">Hourly Rate ($)</label>
                <input type="number" id="hourly-rate" v-model="profile.hourlyRate" class="input" />
                <p class="mt-1 text-sm text-neutral-500">
                  Set your hourly rate. You can adjust this for individual projects.
                </p>
              </div>
              
              <div>
                <label for="languages" class="block text-sm font-medium text-neutral-700 mb-1">Languages</label>
                <select id="languages" multiple v-model="profile.languages" class="input h-auto py-2">
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Russian">Russian</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Italian">Italian</option>
                </select>
                <p class="mt-1 text-sm text-neutral-500">
                  Select all languages you are proficient in. Hold Ctrl/Cmd to select multiple.
                </p>
              </div>
              
              <div>
                <label for="availability" class="block text-sm font-medium text-neutral-700 mb-1">Availability</label>
                <select id="availability" v-model="profile.availability" class="input">
                  <option value="Full-time">Full-time (40+ hrs/week)</option>
                  <option value="Part-time">Part-time (Less than 40 hrs/week)</option>
                  <option value="Weekends">Weekends only</option>
                  <option value="Evenings">Evenings only</option>
                  <option value="As-needed">As-needed basis</option>
                  <option value="Not available">Not currently available</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Portfolio Projects -->
          <div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-neutral-200">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-semibold">Portfolio Projects</h2>
              <button 
                type="button" 
                @click="addProject"
                class="btn btn-primary"
              >
                Add Project
              </button>
            </div>
            
            <div v-if="profile.portfolio.length === 0" class="text-center py-8 border border-dashed border-neutral-300 rounded-lg">
              <Icon name="heroicons:photo" class="h-12 w-12 text-neutral-300 mx-auto mb-2" />
              <p class="text-neutral-500">No projects added yet</p>
              <p class="text-sm text-neutral-500 mt-1">Showcase your work by adding portfolio projects</p>
            </div>
            
            <div v-else class="space-y-6">
              <div 
                v-for="(project, index) in profile.portfolio" 
                :key="index"
                class="border border-neutral-200 rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-4">
                  <h3 class="font-medium">{{ project.title || 'Untitled Project' }}</h3>
                  <button 
                    type="button" 
                    @click="removeProject(index)"
                    class="text-neutral-500 hover:text-red-500"
                  >
                    <Icon name="heroicons:trash" class="h-5 w-5" />
                  </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="md:col-span-1">
                    <div class="aspect-w-16 aspect-h-9 bg-neutral-100 rounded overflow-hidden">
                      <img 
                        :src="project.image || 'https://via.placeholder.com/300x200?text=No+Image'" 
                        alt="Project thumbnail" 
                        class="object-cover w-full h-full"
                      />
                    </div>
                    <button type="button" class="btn btn-outline w-full mt-2 text-sm py-1">Upload Image</button>
                  </div>
                  
                  <div class="md:col-span-2 space-y-4">
                    <div>
                      <label :for="`project-title-${index}`" class="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                      <input type="text" :id="`project-title-${index}`" v-model="project.title" class="input" />
                    </div>
                    
                    <div>
                      <label :for="`project-desc-${index}`" class="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                      <textarea :id="`project-desc-${index}`" v-model="project.description" rows="3" class="input"></textarea>
                    </div>
                    
                    <div>
                      <label :for="`project-url-${index}`" class="block text-sm font-medium text-neutral-700 mb-1">Project URL (optional)</label>
                      <input type="url" :id="`project-url-${index}`" v-model="project.url" class="input" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Experience and Education -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <!-- Employment History -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Employment History</h2>
                <button 
                  type="button" 
                  @click="addEmployment"
                  class="btn btn-outline"
                >
                  Add
                </button>
              </div>
              
              <div v-if="profile.employmentHistory.length === 0" class="text-center py-6">
                <p class="text-neutral-500">No employment history added</p>
              </div>
              
              <div v-else class="space-y-6">
                <div 
                  v-for="(job, index) in profile.employmentHistory" 
                  :key="index"
                  class="border-b border-neutral-200 last:border-0 pb-4 last:pb-0"
                >
                  <div class="flex justify-between">
                    <h3 class="font-medium">{{ job.title }}</h3>
                    <button 
                      type="button" 
                      @click="removeEmployment(index)"
                      class="text-neutral-500 hover:text-red-500"
                    >
                      <Icon name="heroicons:x-mark" class="h-5 w-5" />
                    </button>
                  </div>
                  <p class="text-neutral-600">{{ job.company }}</p>
                  <p class="text-sm text-neutral-500">{{ job.period }}</p>
                </div>
              </div>
            </div>
            
            <!-- Education -->
            <div class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Education</h2>
                <button 
                  type="button" 
                  @click="addEducation"
                  class="btn btn-outline"
                >
                  Add
                </button>
              </div>
              
              <div v-if="profile.education.length === 0" class="text-center py-6">
                <p class="text-neutral-500">No education history added</p>
              </div>
              
              <div v-else class="space-y-6">
                <div 
                  v-for="(edu, index) in profile.education" 
                  :key="index"
                  class="border-b border-neutral-200 last:border-0 pb-4 last:pb-0"
                >
                  <div class="flex justify-between">
                    <h3 class="font-medium">{{ edu.degree }}</h3>
                    <button 
                      type="button" 
                      @click="removeEducation(index)"
                      class="text-neutral-500 hover:text-red-500"
                    >
                      <Icon name="heroicons:x-mark" class="h-5 w-5" />
                    </button>
                  </div>
                  <p class="text-neutral-600">{{ edu.institution }}</p>
                  <p class="text-sm text-neutral-500">{{ edu.period }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Submit Buttons -->
          <div class="flex justify-end space-x-4">
            <button type="button" class="btn btn-outline" @click="navigateTo('/profile/me')">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" :disabled="isSaving">
              <span v-if="isSaving" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

definePageMeta({
  layout: 'default'
});

// New skill input
const newSkill = ref('');

// Loading state
const isSaving = ref(false);

// Sample profile data (in a real app, fetch from API)
const profile = ref({
  firstName: 'Sarah',
  lastName: 'Johnson',
  title: 'Senior Full Stack Developer',
  email: 'sarah.j@example.com',
  location: 'Toronto, Canada',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  bio: `I'm a full-stack developer with 8+ years of experience building robust web applications. I specialize in React, Node.js, and MongoDB, with a strong focus on creating scalable, user-friendly solutions. My approach combines technical expertise with a deep understanding of business needs to deliver products that exceed expectations.`,
  skills: [
    'JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'AWS', 'Docker', 'GraphQL', 'REST API', 'Redux', 'Next.js'
  ],
  hourlyRate: 85,
  languages: ['English', 'French'],
  availability: 'Full-time',
  portfolio: [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack development of a modern e-commerce site',
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://example.com/project1'
    },
    {
      title: 'Financial Dashboard',
      description: 'Interactive dashboard with data visualization',
      image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      url: 'https://example.com/project2'
    }
  ],
  employmentHistory: [
    {
      title: 'Senior Developer',
      company: 'TechSolutions Inc.',
      period: '2019 - Present'
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      period: '2016 - 2019'
    }
  ],
  education: [
    {
      degree: 'Master of Computer Science',
      institution: 'University of Toronto',
      period: '2012 - 2014'
    },
    {
      degree: 'Bachelor of Computer Science',
      institution: 'University of Waterloo',
      period: '2008 - 2012'
    }
  ]
});

// Skills methods
function addSkill() {
  if (newSkill.value.trim() && !profile.value.skills.includes(newSkill.value.trim())) {
    profile.value.skills.push(newSkill.value.trim());
    newSkill.value = '';
  }
}

function removeSkill(index) {
  profile.value.skills.splice(index, 1);
}

// Portfolio methods
function addProject() {
  profile.value.portfolio.push({
    title: '',
    description: '',
    image: '',
    url: ''
  });
}

function removeProject(index) {
  profile.value.portfolio.splice(index, 1);
}

// Employment methods
function addEmployment() {
  profile.value.employmentHistory.push({
    title: 'New Position',
    company: 'Company Name',
    period: 'Start - End'
  });
}

function removeEmployment(index) {
  profile.value.employmentHistory.splice(index, 1);
}

// Education methods
function addEducation() {
  profile.value.education.push({
    degree: 'Degree Name',
    institution: 'Institution Name',
    period: 'Start - End'
  });
}

function removeEducation(index) {
  profile.value.education.splice(index, 1);
}

// Save profile
function saveProfile() {
  isSaving.value = true;
  
  // Simulate API call
  setTimeout(() => {
    isSaving.value = false;
    // In a real app, you would save the profile data to an API
    alert('Profile saved successfully!');
    navigateTo('/profile/me');
  }, 1500);
}
</script>