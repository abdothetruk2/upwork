<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-primary-500 text-white py-12 lg:py-16">
      <div class="container-custom">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl font-bold mb-6">Why Choose UpClone</h1>
          <p class="text-xl text-primary-100">
            UpClone is the world's most trusted platform connecting talented freelancers with businesses of all sizes.
            Discover why millions choose us for their work needs.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6 border border-neutral-200 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:shield-check" class="h-8 w-8" />
            </div>
            <h3 class="text-xl font-bold mb-3">Trusted Platform</h3>
            <p class="text-neutral-600">
              Our secure payment protection and identity verification system ensures you can work with confidence.
            </p>
          </div>

          <div class="text-center p-6 border border-neutral-200 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:user-group" class="h-8 w-8" />
            </div>
            <h3 class="text-xl font-bold mb-3">Global Talent</h3>
            <p class="text-neutral-600">
              Access a diverse pool of skilled professionals from over 180 countries with expertise in thousands of skills.
            </p>
          </div>

          <div class="text-center p-6 border border-neutral-200 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:star" class="h-8 w-8" />
            </div>
            <h3 class="text-xl font-bold mb-3">Quality Work</h3>
            <p class="text-neutral-600">
              Our rating system and reviews help you find top-rated talent who consistently deliver excellent results.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- For Clients Section -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">For Clients</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Find the perfect freelancer for your project and get work done efficiently.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Client working with freelancers" 
              class="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <ul class="space-y-6">
              <li class="flex">
                <div class="flex-shrink-0 h-8 w-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:check" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold mb-1">Post a job for free</h3>
                  <p class="text-neutral-600">
                    Describe your project and receive proposals from qualified freelancers within minutes.
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 h-8 w-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:check" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold mb-1">Flexible hiring options</h3>
                  <p class="text-neutral-600">
                    Choose between hourly or fixed price contracts based on your project needs.
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 h-8 w-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:check" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold mb-1">Secure payments</h3>
                  <p class="text-neutral-600">
                    Only pay for work you authorize through our secure payment system.
                  </p>
                </div>
              </li>
            </ul>
            <div class="mt-8">
              <NuxtLink to="/signup" class="btn btn-primary">
                Start Hiring
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- For Freelancers Section -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">For Freelancers</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Find work that matches your skills and grow your independent career.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <ul class="space-y-6">
              <li class="flex">
                <div class="flex-shrink-0 h-8 w-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:check" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold mb-1">Find quality clients</h3>
                  <p class="text-neutral-600">
                    Connect with clients looking for your specific skills, expertise, and experience.
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 h-8 w-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:check" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold mb-1">Set your own rates</h3>
                  <p class="text-neutral-600">
                    Work on your terms and choose projects that match your desired pay rate.
                  </p>
                </div>
              </li>
              <li class="flex">
                <div class="flex-shrink-0 h-8 w-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                  <Icon name="heroicons:check" class="h-5 w-5" />
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold mb-1">Reliable payments</h3>
                  <p class="text-neutral-600">
                    Get paid on time, every time through our secure payment protection system.
                  </p>
                </div>
              </li>
            </ul>
            <div class="mt-8">
              <NuxtLink to="/signup" class="btn btn-primary">
                Start Freelancing
              </NuxtLink>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <img 
              src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Freelancer working remotely" 
              class="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-primary-500 text-white">
      <div class="container-custom">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">UpClone by the Numbers</h2>
          <p class="text-xl text-primary-100 max-w-2xl mx-auto">
            Our platform connects millions of businesses with independent talent around the world.
          </p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <p class="text-5xl font-bold mb-2">20M+</p>
            <p class="text-primary-100 text-lg">Registered Users</p>
          </div>
          <div class="text-center">
            <p class="text-5xl font-bold mb-2">$5B+</p>
            <p class="text-primary-100 text-lg">Earnings Paid</p>
          </div>
          <div class="text-center">
            <p class="text-5xl font-bold mb-2">10K+</p>
            <p class="text-primary-100 text-lg">Skills Available</p>
          </div>
          <div class="text-center">
            <p class="text-5xl font-bold mb-2">180+</p>
            <p class="text-primary-100 text-lg">Countries Represented</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-white">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">Success Stories</h2>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Hear from businesses and freelancers who have found success on UpClone.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="p-6 border border-neutral-200 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4 text-yellow-400">
              <Icon name="heroicons:star-solid" class="h-5 w-5" v-for="i in 5" :key="i" />
            </div>
            <p class="text-neutral-700 mb-6 italic">
              "UpClone transformed how we build our products. We found amazing developers who helped us launch our MVP in half the time we expected. The quality of talent is exceptional."
            </p>
            <div class="flex items-center">
              <img 
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Client testimonial" 
                class="h-12 w-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 class="font-semibold text-neutral-900">Michael Johnson</h4>
                <p class="text-sm text-neutral-500">CEO, TechStartup Inc.</p>
              </div>
            </div>
          </div>

          <div class="p-6 border border-neutral-200 rounded-xl hover:shadow-lg transition-all duration-300">
            <div class="flex items-center mb-4 text-yellow-400">
              <Icon name="heroicons:star-solid" class="h-5 w-5" v-for="i in 5" :key="i" />
            </div>
            <p class="text-neutral-700 mb-6 italic">
              "As a freelance designer, UpClone has been a game-changer for my career. I've connected with clients from around the world and built a sustainable business doing what I love."
            </p>
            <div class="flex items-center">
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Freelancer testimonial" 
                class="h-12 w-12 rounded-full mr-4 object-cover"
              />
              <div>
                <h4 class="font-semibold text-neutral-900">Sarah Martinez</h4>
                <p class="text-sm text-neutral-500">UX/UI Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-neutral-50">
      <div class="container-custom text-center">
        <h2 class="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p class="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
          Join UpClone today and discover the future of work.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/signup" class="btn btn-primary px-8 py-3 text-lg">
            Sign Up Free
          </NuxtLink>
          <NuxtLink to="/find-talent" class="btn btn-outline px-8 py-3 text-lg">
            Browse Talent
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
});
</script>