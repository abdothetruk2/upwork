<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-primary-500 text-white py-16 lg:py-24">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find the perfect <span class="text-secondary-400">freelance</span> services for your business
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-primary-100">
              Connect with talented professionals and get your projects done quickly and efficiently.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/find-work" class="btn bg-white text-primary-600 hover:bg-primary-50 font-bold text-lg py-3 px-6 shadow-lg">
                Find Work
              </NuxtLink>
              <NuxtLink to="/find-talent" class="btn bg-secondary-500 text-white hover:bg-secondary-600 font-bold text-lg py-3 px-6 shadow-lg">
                Find Talent
              </NuxtLink>
            </div>
          </div>
          <div class="relative hidden lg:block">
            <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                 alt="People working together" 
                 class="rounded-xl shadow-2xl animate-slide-up" />
            <div class="absolute -bottom-4 -right-4 bg-primary-500 rounded-lg p-4 shadow-lg">
              <p class="text-lg font-bold">Join 20M+ professionals</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="animate-pulse-subtle">
            <p class="text-4xl font-bold text-primary-500 mb-2">20M+</p>
            <p class="text-neutral-600">Registered Users</p>
          </div>
          <div class="animate-pulse-subtle">
            <p class="text-4xl font-bold text-primary-500 mb-2">10M+</p>
            <p class="text-neutral-600">Completed Jobs</p>
          </div>
          <div class="animate-pulse-subtle">
            <p class="text-4xl font-bold text-primary-500 mb-2">$1B+</p>
            <p class="text-neutral-600">Earnings Paid</p>
          </div>
          <div class="animate-pulse-subtle">
            <p class="text-4xl font-bold text-primary-500 mb-2">95%</p>
            <p class="text-neutral-600">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Categories -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Explore Popular Categories</h2>
          <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
            Find skilled professionals in the most in-demand categories
          </p>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category" 
          />
        </div>
      </div>
    </section>

    <!-- Featured Jobs -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl font-bold mb-4">Featured Jobs</h2>
            <p class="text-lg text-neutral-600">
              Discover the latest opportunities from top clients
            </p>
          </div>
          <NuxtLink to="/find-work" class="btn btn-outline">
            View All Jobs
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 gap-6">
          <JobCard 
            v-for="job in featuredJobs" 
            :key="job.id" 
            :job="job" 
          />
        </div>
      </div>
    </section>

    <!-- Top Freelancers -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="flex justify-between items-center mb-12">
          <div>
            <h2 class="text-3xl font-bold mb-4">Top Freelancers</h2>
            <p class="text-lg text-neutral-600">
              Hire professionals with proven experience and high ratings
            </p>
          </div>
          <NuxtLink to="/find-talent" class="btn btn-outline">
            View All Freelancers
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 gap-6">
          <FreelancerCard 
            v-for="freelancer in topFreelancers" 
            :key="freelancer.id" 
            :freelancer="freelancer" 
          />
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">How UpClone Works</h2>
          <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
            Get your work done in 3 simple steps
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mx-auto mb-6">
              1
            </div>
            <h3 class="text-xl font-bold mb-4">Post a Job</h3>
            <p class="text-neutral-600">
              Create a detailed job posting specifying your requirements, budget, and timeline.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mx-auto mb-6">
              2
            </div>
            <h3 class="text-xl font-bold mb-4">Review Proposals</h3>
            <p class="text-neutral-600">
              Receive proposals from qualified freelancers and select the best match for your project.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold mx-auto mb-6">
              3
            </div>
            <h3 class="text-xl font-bold mb-4">Get Work Done</h3>
            <p class="text-neutral-600">
              Collaborate with your chosen freelancer and get quality work delivered on time.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p class="text-lg text-neutral-600 max-w-3xl mx-auto">
            Hear from businesses that have found success with UpClone
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index" 
            class="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 hover:shadow-lg transition-all duration-300"
          >
            <div class="flex items-center mb-4 text-yellow-400">
              <Icon name="heroicons:star-solid" class="h-5 w-5" v-for="i in 5" :key="i" />
            </div>
            <p class="text-neutral-700 mb-6">{{ testimonial.content }}</p>
            <div class="flex items-center">
              <img 
                :src="testimonial.avatar" 
                :alt="testimonial.name" 
                class="h-12 w-12 rounded-full mr-4"
              />
              <div>
                <h4 class="font-semibold text-neutral-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-neutral-500">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p class="text-xl mb-8 text-primary-100">
            Join thousands of clients and freelancers already using UpClone to get work done.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/signup" class="btn bg-white text-primary-600 hover:bg-primary-50 font-bold text-lg py-3 px-8 shadow-lg">
              Sign Up for Free
            </NuxtLink>
            <NuxtLink to="/how-it-works" class="btn border border-white text-white hover:bg-primary-700 font-bold text-lg py-3 px-8">
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const categories = ref([
  {
    id: 1,
    name: 'Web Development',
    icon: 'mdi:web',
    count: '10,234 freelancers',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    id: 2,
    name: 'Mobile Development',
    icon: 'mdi:cellphone',
    count: '8,532 freelancers',
    color: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    name: 'UI/UX Design',
    icon: 'mdi:palette',
    count: '7,845 freelancers',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    id: 4,
    name: 'Content Writing',
    icon: 'mdi:file-document',
    count: '9,123 freelancers',
    color: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 5,
    name: 'Digital Marketing',
    icon: 'mdi:bullhorn',
    count: '6,789 freelancers',
    color: 'bg-red-100 text-red-700'
  },
  {
    id: 6,
    name: 'Data Science',
    icon: 'mdi:chart-bar',
    count: '5,432 freelancers',
    color: 'bg-indigo-100 text-indigo-700'
  },
  {
    id: 7,
    name: 'Video & Animation',
    icon: 'mdi:video',
    count: '4,567 freelancers',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    id: 8,
    name: 'Customer Support',
    icon: 'mdi:headset',
    count: '3,876 freelancers',
    color: 'bg-teal-100 text-teal-700'
  }
]);

const featuredJobs = ref([
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
      avatar: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    postedAt: '2 days ago',
    proposals: 18
  },
  {
    id: 2,
    title: 'WordPress Website Redesign and Development',
    type: 'Fixed-price',
    level: 'Intermediate',
    budget: '$1,500 - $3,000',
    description: 'We need to redesign our existing WordPress website to improve UX/UI and overall performance. We are looking for someone who can create a modern, responsive design and implement it with clean code.',
    skills: ['WordPress', 'PHP', 'CSS', 'JavaScript', 'UI/UX Design'],
    client: {
      name: 'Creative Agency LLC',
      location: 'New York, NY',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    postedAt: '5 days ago',
    proposals: 27
  }
]);

const topFreelancers = ref([
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Full Stack Developer',
    rating: 4.9,
    reviewCount: 187,
    hourlyRate: 85,
    location: 'Toronto, Canada',
    bio: 'Experienced full stack developer with over 8 years of experience building web applications using React, Node.js, and MongoDB. Specialized in creating scalable and high-performance web solutions.',
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'AWS'],
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'UI/UX Designer & Frontend Developer',
    rating: 4.8,
    reviewCount: 143,
    hourlyRate: 75,
    location: 'Berlin, Germany',
    bio: 'Creative designer and developer with a passion for creating beautiful, user-centered digital experiences. I specialize in Figma, Adobe XD, and implementing designs with clean HTML/CSS and React.',
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'HTML/CSS', 'React'],
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]);

const testimonials = ref([
  {
    name: 'Emma Wilson',
    position: 'CEO at TechStart',
    content: 'UpClone helped us find talented developers quickly when we needed to scale our team. The quality of freelancers on this platform is outstanding!',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'James Rodriguez',
    position: 'Marketing Director',
    content: 'We\'ve completed over 20 projects with freelancers from UpClone, and the experience has been consistently excellent. Highly recommended!',
    avatar: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: 'Sophia Chen',
    position: 'Founder of DesignHub',
    content: 'As a small business owner, finding reliable talent was always a challenge until I discovered UpClone. The platform is intuitive and the talent pool is exceptional.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]);
</script>