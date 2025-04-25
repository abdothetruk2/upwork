<template>
  <div class="card card-hover">
    <div class="p-6">
      <div class="flex items-start">
        <div class="mr-4 flex-shrink-0">
          <img 
            :src="freelancer.avatar || 'https://via.placeholder.com/80'" 
            alt=""
            class="h-16 w-16 rounded-full object-cover"
          />
        </div>
        <div class="flex-1">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-neutral-900 hover:text-primary-600">
              <NuxtLink :to="`/freelancers/${freelancer.id}`">{{ freelancer.name }}</NuxtLink>
            </h3>
            <div class="flex items-center">
              <div class="flex items-center text-yellow-400">
                <Icon name="heroicons:star-solid" class="h-4 w-4" />
                <span class="ml-1 text-sm font-medium text-neutral-700">{{ freelancer.rating }}</span>
              </div>
              <span class="mx-2 text-neutral-300">•</span>
              <span class="text-sm text-neutral-500">{{ freelancer.reviewCount }} reviews</span>
            </div>
          </div>
          
          <h4 class="mt-1 text-base font-medium text-neutral-700">{{ freelancer.title }}</h4>
          
          <div class="mt-2 flex items-center text-sm text-neutral-500">
            <Icon name="heroicons:map-pin" class="h-4 w-4 mr-1" />
            <span>{{ freelancer.location }}</span>
            <span class="mx-2">•</span>
            <span>${{ freelancer.hourlyRate }}/hr</span>
          </div>
          
          <p class="mt-3 text-neutral-700 line-clamp-2">{{ freelancer.bio }}</p>
          
          <div class="mt-4 flex flex-wrap gap-2">
            <span 
              v-for="skill in freelancer.skills" 
              :key="skill" 
              class="badge badge-primary"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-neutral-50 px-6 py-4 flex justify-end items-center border-t border-neutral-200">
      <button class="btn btn-outline mr-3">
        Save
      </button>
      <NuxtLink :to="`/freelancers/${freelancer.id}`" class="btn btn-primary">
        View Profile
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  freelancer: {
    type: Object,
    required: true
  }
});
</script>