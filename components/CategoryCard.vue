<template>
  <NuxtLink :to="`/categories/${category.id}`" class="card card-hover group">
    <div class="p-6 flex items-center">
      <div class="flex-shrink-0 p-3 rounded-full mr-4" :class="category.color">
        <Icon :name="category.icon" class="h-6 w-6" />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-neutral-900 group-hover:text-primary-600">
          {{ category.name }}
        </h3>
        <p class="text-sm text-neutral-500">{{ category.count }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  category: {
    type: Object,
    required: true
  }
});
</script>