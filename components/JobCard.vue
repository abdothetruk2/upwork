<template>
  <div class="card card-hover">
    <div class="p-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-lg font-semibold text-neutral-900 hover:text-primary-600">
            <NuxtLink :to="`/jobs/${job.id}`">{{ job.title }}</NuxtLink>
          </h3>
          <p class="mt-1 text-neutral-500">
            {{ job.type }} - {{ job.level }} - Est. Budget: {{ job.budget }}
          </p>
        </div>
        <div>
          <button 
            class="text-neutral-400 hover:text-neutral-500" 
            @click="toggleSaved"
            aria-label="Save job"
          >
            <Icon 
              :name="isSaved ? 'heroicons:heart-solid' : 'heroicons:heart'" 
              class="h-6 w-6"
              :class="{ 'text-secondary-500': isSaved }"
            />
          </button>
        </div>
      </div>
      
      <p class="mt-3 text-neutral-700 line-clamp-2">{{ job.description }}</p>
      
      <div class="mt-4 flex flex-wrap gap-2">
        <span 
          v-for="skill in job.skills" 
          :key="skill" 
          class="badge badge-primary"
        >
          {{ skill }}
        </span>
      </div>
      
      <div class="mt-6 flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img 
              :src="job.client.avatar || 'https://via.placeholder.com/40'" 
              alt="" 
              class="h-8 w-8 rounded-full bg-neutral-200"
            />
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-neutral-900">
              {{ job.client.name }}
            </p>
            <div class="flex items-center text-xs text-neutral-500">
              <Icon name="heroicons:map-pin" class="h-3 w-3 mr-1" />
              <span>{{ job.client.location }}</span>
            </div>
          </div>
        </div>
        <div class="text-sm text-neutral-500">
          Posted {{ job.postedAt }}
        </div>
      </div>
    </div>
    
    <div class="bg-neutral-50 px-6 py-4 flex justify-between items-center border-t border-neutral-200">
      <div class="flex items-center text-sm text-neutral-500">
        <Icon name="heroicons:user-group" class="h-4 w-4 mr-1" />
        <span>{{ job.proposals }} proposals</span>
      </div>
      <NuxtLink :to="`/jobs/${job.id}`" class="btn btn-primary">
        Apply Now
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});

const isSaved = ref(false);

function toggleSaved() {
  isSaved.value = !isSaved.value;
}
</script>