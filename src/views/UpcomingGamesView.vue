<template>
  <Suspense>
    <OtomeGamesComponent/>      
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import OtomeGamesComponent from '@/components/game/OtomeGamesComponent.vue';
</script>