<template>
  <NuxtLink
    :to="to"
    class="group flex items-center px-2 py-2 text-sm font-medium rounded-lg"
    :class="[
      isActive ? 'bg-primary-50 text-primary-700' : 'text-neutral-700 hover:bg-neutral-50'
    ]"
  >
    <Icon 
      :name="icon" 
      class="mr-3 h-5 w-5 flex-shrink-0" 
      :class="[isActive ? 'text-primary-500' : 'text-neutral-500 group-hover:text-neutral-700']"
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