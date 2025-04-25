<template>
  <div class="bg-neutral-50">
    <!-- User Profile Header -->
    <div class="bg-white shadow-sm border-b border-neutral-200">
      <div class="container-custom py-8">
        <div class="flex flex-col md:flex-row items-start gap-8">
          <!-- Profile Picture -->
          <div class="flex-shrink-0">
            <div class="relative group">
              <div class="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img :src="user.avatar" :alt="user.name" class="h-full w-full object-cover" />
              </div>
              <div v-if="isOwnProfile" class="absolute inset-0 rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Icon name="heroicons:camera" class="text-white h-8 w-8" />
              </div>
            </div>
          </div>
          
          <!-- Profile Info -->
          <div class="flex-grow">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 class="text-3xl font-bold text-neutral-900">{{ user.name }}</h1>
                <p class="text-xl text-neutral-600 mt-1">{{ user.title }}</p>
                <div class="flex items-center mt-2 text-neutral-500">
                  <Icon name="heroicons:map-pin" class="h-5 w-5 mr-1" />
                  <span>{{ user.location }}</span>
                  <span class="mx-2">•</span>
                  <span class="flex items-center">
                    <Icon name="heroicons:clock" class="h-5 w-5 mr-1" />
                    Member since {{ user.joinDate }}
                  </span>
                </div>
              </div>
              
              <div class="flex flex-wrap gap-2">
                <button v-if="!isOwnProfile" class="btn btn-primary">
                  <Icon name="heroicons:envelope" class="h-5 w-5 mr-2" />
                  Contact
                </button>
                <button v-if="isOwnProfile" class="btn btn-outline" @click="navigateTo('/profile/edit')">
                  <Icon name="heroicons:pencil-square" class="h-5 w-5 mr-2" />
                  Edit Profile
                </button>
                <button v-if="!isOwnProfile" class="btn btn-outline">
                  <Icon name="heroicons:heart" class="h-5 w-5 mr-2" />
                  Save
                </button>
              </div>
            </div>
            
            <!-- Rating and Stats -->
            <div class="flex flex-wrap items-center gap-6 mt-4">
              <div class="flex items-center">
                <div class="flex items-center text-yellow-400">
                  <Icon name="heroicons:star-solid" class="h-5 w-5" v-for="i in Math.floor(user.rating)" :key="`full-${i}`" />
                  <Icon 
                    v-if="user.rating % 1 >= 0.5" 
                    name="heroicons:star-half-solid" 
                    class="h-5 w-5" 
                    key="half" 
                  />
                </div>
                <span class="ml-1 font-medium">{{ user.rating }}</span>
                <span class="ml-1 text-neutral-500">({{ user.reviewCount }} reviews)</span>
              </div>
              
              <div class="flex items-center text-neutral-600 font-medium">
                <Icon name="heroicons:briefcase" class="h-5 w-5 mr-1" />
                {{ user.jobsCompleted }} jobs completed
              </div>
              
              <div v-if="user.hourlyRate" class="flex items-center font-medium">
                <Icon name="heroicons:currency-dollar" class="h-5 w-5 mr-1" />
                {{ user.hourlyRate }}/hr
              </div>
              
              <div class="text-success-500 flex items-center font-medium">
                <Icon name="heroicons:check-badge" class="h-5 w-5 mr-1" />
                Verified
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="container-custom py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column: Bio, Skills, etc -->
        <div class="lg:col-span-2 space-y-8">
          <!-- About -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-4">About</h2>
            <div class="prose max-w-none text-neutral-700">
              <p>{{ user.bio }}</p>
            </div>
          </div>
          
          <!-- Skills -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-4">Skills</h2>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="skill in user.skills" 
                :key="skill" 
                class="badge badge-primary"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          
          <!-- Portfolio -->
          <div v-if="user.portfolio && user.portfolio.length > 0" class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-4">Portfolio</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="(project, index) in user.portfolio" 
                :key="index" 
                class="border border-neutral-200 rounded-lg overflow-hidden group cursor-pointer"
              >
                <div class="aspect-w-16 aspect-h-9 relative">
                  <img :src="project.image" :alt="project.title" class="object-cover w-full h-48" />
                  <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Icon name="heroicons:eye" class="text-white h-10 w-10" />
                  </div>
                </div>
                <div class="p-4">
                  <h3 class="font-medium">{{ project.title }}</h3>
                  <p class="text-sm text-neutral-500">{{ project.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Reviews -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold">Reviews</h2>
              <select v-model="reviewSort" class="input w-32">
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
            
            <div v-if="user.reviews && user.reviews.length > 0" class="space-y-6">
              <div v-for="(review, index) in sortedReviews" :key="index" class="pb-6 border-b border-neutral-200 last:border-0">
                <div class="flex justify-between">
                  <div class="flex items-start">
                    <div class="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img :src="review.reviewer.avatar" :alt="review.reviewer.name" class="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p class="font-medium">{{ review.reviewer.name }}</p>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center text-yellow-400">
                          <Icon name="heroicons:star-solid" class="h-4 w-4" v-for="i in review.rating" :key="i" />
                        </div>
                        <span class="ml-2 text-sm text-neutral-500">{{ review.date }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-sm text-neutral-500">
                    {{ review.project }}
                  </div>
                </div>
                <p class="mt-3 text-neutral-700">{{ review.comment }}</p>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <Icon name="heroicons:star" class="h-12 w-12 text-neutral-300 mx-auto mb-2" />
              <p class="text-neutral-500">No reviews yet</p>
            </div>
            
            <div v-if="user.reviews && user.reviews.length > 0" class="mt-4 text-center">
              <button class="text-primary-500 hover:text-primary-600 font-medium">
                View all {{ user.reviewCount }} reviews
              </button>
            </div>
          </div>
        </div>
        
        <!-- Right Column: Availability, etc -->
        <div class="space-y-8">
          <!-- Availability -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-4">Availability</h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-neutral-700">Availability</span>
                <span class="font-medium text-success-500">
                  {{ user.availability }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-700">Response Time</span>
                <span class="font-medium">{{ user.responseTime }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-neutral-700">Languages</span>
                <span class="font-medium">{{ user.languages.join(', ') }}</span>
              </div>
            </div>
          </div>
          
          <!-- Employment History -->
          <div v-if="user.employmentHistory && user.employmentHistory.length > 0" class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-4">Employment History</h2>
            <div class="space-y-4">
              <div v-for="(job, index) in user.employmentHistory" :key="index" class="border-b border-neutral-200 last:border-0 pb-4 last:pb-0">
                <h3 class="font-medium">{{ job.title }}</h3>
                <p class="text-neutral-600">{{ job.company }}</p>
                <p class="text-sm text-neutral-500">{{ job.period }}</p>
              </div>
            </div>
          </div>
          
          <!-- Education -->
          <div v-if="user.education && user.education.length > 0" class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-4">Education</h2>
            <div class="space-y-4">
              <div v-for="(edu, index) in user.education" :key="index" class="border-b border-neutral-200 last:border-0 pb-4 last:pb-0">
                <h3 class="font-medium">{{ edu.degree }}</h3>
                <p class="text-neutral-600">{{ edu.institution }}</p>
                <p class="text-sm text-neutral-500">{{ edu.period }}</p>
              </div>
            </div>
          </div>
          
          <!-- Certifications -->
          <div v-if="user.certifications && user.certifications.length > 0" class="bg-white rounded-lg shadow-sm p-6 border border-neutral-200">
            <h2 class="text-xl font-semibold mb-4">Certifications</h2>
            <div class="space-y-4">
              <div v-for="(cert, index) in user.certifications" :key="index" class="flex items-center">
                <Icon name="heroicons:academic-cap" class="h-5 w-5 text-primary-500 mr-2" />
                <span>{{ cert }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
  layout: 'default'
});

const route = useRoute();
const userId = route.params.id;

// Check if viewing own profile (in a real app, compare with authenticated user ID)
const isOwnProfile = computed(() => userId === 'me' || userId === '1');

// Sort reviews
const reviewSort = ref('recent');

// Sample user data (in a real app, fetch from API)
const user = ref({
  id: 1,
  name: 'Sarah Johnson',
  title: 'Senior Full Stack Developer',
  avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  location: 'Toronto, Canada',
  joinDate: 'June 2020',
  rating: 4.9,
  reviewCount: 87,
  jobsCompleted: 124,
  hourlyRate: '$85',
  bio: `I'm a full-stack developer with 8+ years of experience building robust web applications. I specialize in React, Node.js, and MongoDB, with a strong focus on creating scalable, user-friendly solutions. My approach combines technical expertise with a deep understanding of business needs to deliver products that exceed expectations.

Throughout my career, I've worked with startups and established businesses across various industries, helping them transform ideas into successful digital products. I'm passionate about clean code, responsive design, and optimizing performance for exceptional user experiences.

I'm always eager to take on challenging projects that allow me to grow professionally while delivering outstanding results.`,
  skills: [
    'JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Express', 'AWS', 'Docker', 'GraphQL', 'REST API', 'Redux', 'Next.js'
  ],
  availability: 'Full-time',
  responseTime: 'Within a few hours',
  languages: ['English (Fluent)', 'French (Conversational)'],
  portfolio: [
    {
      title: 'E-commerce Platform',
      description: 'Full-stack development of a modern e-commerce site',
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Financial Dashboard',
      description: 'Interactive dashboard with data visualization',
      image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Social Media App',
      description: 'Mobile-first social platform with real-time features',
      image: 'https://images.pexels.com/photos/3312671/pexels-photo-3312671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      title: 'Learning Management System',
      description: 'Educational platform with course management',
      image: 'https://images.pexels.com/photos/5428148/pexels-photo-5428148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ],
  reviews: [
    {
      reviewer: {
        name: 'Alex Morgan',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      rating: 5,
      date: 'July 28, 2023',
      project: 'E-commerce Platform',
      comment: 'Sarah was incredible to work with! She delivered the project ahead of schedule and exceeded all our expectations. Her communication was excellent throughout the process, and she was always responsive to feedback. I would definitely hire her again.'
    },
    {
      reviewer: {
        name: 'Emily Wilson',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      rating: 5,
      date: 'June 15, 2023',
      project: 'Financial Dashboard',
      comment: 'Working with Sarah was a pleasure. She understood our requirements perfectly and delivered a high-quality solution. Her technical expertise and problem-solving skills are impressive.'
    },
    {
      reviewer: {
        name: 'Michael Brown',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
      rating: 4,
      date: 'May 3, 2023',
      project: 'Website Redesign',
      comment: 'Sarah did an excellent job with our website redesign. She was professional, met all deadlines, and provided valuable insights throughout the project. The only reason for 4 stars instead of 5 is that we needed some minor adjustments after completion.'
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
    },
    {
      title: 'Junior Developer',
      company: 'WebTech Services',
      period: '2014 - 2016'
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
  ],
  certifications: [
    'AWS Certified Solutions Architect',
    'MongoDB Certified Developer',
    'Google Cloud Professional Developer'
  ]
});

// Sort reviews based on selection
const sortedReviews = computed(() => {
  if (!user.value.reviews) return [];
  
  const reviews = [...user.value.reviews];
  
  switch (reviewSort.value) {
    case 'recent':
      // In a real app, you would sort by date
      return reviews;
    case 'highest':
      return reviews.sort((a, b) => b.rating - a.rating);
    case 'lowest':
      return reviews.sort((a, b) => a.rating - b.rating);
    default:
      return reviews;
  }
});
</script>