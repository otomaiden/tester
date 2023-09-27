<template>
  <div class="light-theme">
    <Transition name="testing">
      <div ref="pageContainer" class="page-container">
        <NavigationComponent @change-navigation-bar="changeNavigationBar"/>
        <div class="main-content test">
          <Transition>
            <RouterView />
          </Transition>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationComponent from './components/NavigationComponent.vue'
import { ref } from 'vue';

const pageContainer = ref<HTMLDivElement>();

const theme = localStorage.getItem('theme');
if (theme !== null){
  document.documentElement.className = theme;
}

function changeNavigationBar(sidebarHidden: boolean) {
  if (sidebarHidden) {
    pageContainer.value?.classList.add('page-container-sidebar-hidden');
  } else {
    pageContainer.value?.classList.remove('page-container-sidebar-hidden');
  }
}
</script>


<style lang="scss" scoped>
.page-container {
  display: flex;
  gap: 32px;
  max-width: 1500px;
  // background-color: lightblue;
  margin: 0 auto;
  padding-top: 32px;
  transition: color 0.3s;
  .main-content {
    margin: 16px 0;
  }
}

@media screen and (max-width: $max-width) {
  .page-container {
    padding-top: 0; 
  }
  .page-container-sidebar-hidden {
    display: block;
    gap: 0px;
    .main-content {
      margin: 0 16px;
    }
    .main-content {
      position: absolute;
      top: calc(50px + 16px);
      transition: margin 0.5s;
    }
  }
}
@keyframes mymove {
  from {top: 0px;}
  to {top: 200px;}
}
.test {
  animation: mymove 5s;
}


.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.testing-enter-active {
  transition: opacity 0.5s ease;
}
</style>
