<template>
  <NuxtLink
    :to="to"
    class="flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1"
    :class="[
      isActive ? 'bg-primary-600 text-white' : 'text-neutral-300 hover:bg-neutral-700'
    ]"
  >
    <Icon 
      :name="icon" 
      class="mr-3 h-5 w-5 flex-shrink-0" 
    />
    <span class="truncate">
      <slot></slot>
    </span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});

const route = useRoute();
const isActive = computed(() => route.path === props.to);
</script>