<template>
  <table>
    <thead>
      <td></td>
      <td>Title</td>
      <td>Release date</td>
    </thead>
    <tr v-for="game in otomeGames" :key="game.id">
      <td><img class="cover-img" :src="game.image.url" /></td>
      <td>{{ game.locTitle }}</td>
      <td>{{ game.locRelease }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import VndbApiService from '@/api/VndbApiService';
import type { LocalizedTitleInfoInterface } from '@/api/models/VndbGame';
console.log('hello')
let otomeGames: LocalizedTitleInfoInterface[] = [];
try {
  otomeGames = await VndbApiService.GetUpcomingLocalizations();
  console.log('hello', otomeGames[0]);
} catch (error) {
  if (error instanceof Error) {
    console.log('error', error);
  }  
}
</script>

<style>
.cover-img {
  width: 150px;
}

td {
  padding: 8px;
}
</style>