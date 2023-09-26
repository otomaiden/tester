<template>
  <div class="about">
    <Suspense>
      <OtomeGamesComponent/>      
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import OtomeGamesComponent from '@/components/OtomeGamesComponent.vue'
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
