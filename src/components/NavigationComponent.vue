<template>
  <div class="nav-container" :class="{'nav-container-slim': !expandSidebar, 'align-top': sidebarHidden}">
    <div class="accordian-container" :class="{'isopen': !sidebarHidden}">
      <div class="content">
        <div class="title-container">
          <h1 v-if="expandSidebar" class="title typewriter">marumaru otome</h1>
          <span v-if="expandSidebar" class="material-symbols-outlined title" @click="toggleSidebar()">
            arrow_back_ios_new
          </span>
          <span v-else class="material-symbols-outlined title" @click="toggleSidebar()">
            arrow_forward_ios
          </span>
        </div>
        <nav>
          <ul>
            <li @click="$router.push({name: 'home'})">
              <span class="material-symbols-outlined">
                home
              </span>
              <RouterLink v-if="expandSidebar" to="/">Home</RouterLink>
            </li>
            <li @click="$router.push({name: 'about'})">
              <span class="material-symbols-outlined">
                info
              </span>
              <RouterLink v-if="expandSidebar" to="/about">About</RouterLink>
            </li>
            <li @click="$router.push({name: 'blog'})">
              <span class="material-symbols-outlined">
                edit
              </span>
              <RouterLink v-if="expandSidebar" to="/blog">Blog</RouterLink>
            </li>
            <li>
              <span class="material-symbols-outlined">
                letter_switch
              </span>
              <RouterLink v-if="expandSidebar" to="/tl">Translations</RouterLink>
            </li>
            <div class="category" :class="{'centered': !expandSidebar}">
              <span class="material-symbols-outlined">
                stadia_controller
              </span>
              <b class="typewriter" v-if="expandSidebar">Games</b>
            </div>
            <li>
              <span class="material-symbols-outlined">
                favorite
              </span>
              <RouterLink v-if="expandSidebar" to="/all">Released games</RouterLink>
            </li>
            <li @click="$router.push({name: 'upcoming-games'})">
              <span class="material-symbols-outlined">
                schedule
              </span>
              <RouterLink v-if="expandSidebar" to="/upcoming">Upcoming releases</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="theme-container clickable" @click="toggleTheme()" :class="{'centered2': !expandSidebar}">
          <span v-if="lightMode" class="material-symbols-outlined">
            light_mode
          </span>
          <span v-else class="material-symbols-outlined">
            dark_mode
          </span>
          <p v-if="expandSidebar">Toggle theme</p>
        </div>
      </div>
      <div class="mobile-view" @click="hideSidebar()">
        <span class="material-symbols-outlined up-arrow" :class="{'down-arrow': sidebarHidden}">
            arrow_forward_ios
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
const expandSidebar = ref(true);
const lightMode = ref(true);
const sidebarHidden = ref(false)

const emit = defineEmits<{
  changeNavigationBar: [sidebarHidden: boolean]
}>()

function toggleSidebar () {
  expandSidebar.value = !expandSidebar.value;
}
function toggleTheme () {
  lightMode.value = !lightMode.value
  const theme = lightMode.value ? 'light-theme' : 'dark-theme';
  document.documentElement.className = theme;
  localStorage.setItem('theme', theme);
}

function hideSidebar() {
  sidebarHidden.value = !sidebarHidden.value;
  if (sidebarHidden.value) {
    expandSidebar.value = false;
  }
  emit('changeNavigationBar', sidebarHidden.value);
}

</script>

<style scoped lang="scss">
.title {
  font-size: 25px;
  margin: 0;
  margin-left: 2px;
  line-height: 34px;
  font-size: 24px;
  cursor: pointer;
}

.title-container .material-symbols-outlined:hover {
  color: var(--sec-c);
}

.nav-container {
  // margin-top: 25px;
  min-width: 250px;
  max-width: 250px;
  padding: 12px;
  transition: 0.5s, color 0s;
  flex: 1;
  // position:fixed;
}
nav {
    width: 100%;
    margin-bottom: 12px;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      border-radius: 8px;
      font-weight: 500;
      // border: var(--thin-border;
    }
    ul :first-child {
      border-radius: var(--normal-radius) var(--normal-radius) 0 0;
    }
    ul :last-child {
      border-radius: 0 0 var(--normal-radius) var(--normal-radius);
    }
    li {
      padding: 16px 12px;
      border: var(--thin-border);
      display: flex;
      gap: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: fadeIn 1s;
      a {
        color: inherit;
        text-decoration: none;
      }
      background-color: var(--bg);
    }
    li:hover {
      // background-color: rgba(var(--pri-c, 0.5);
      background-image: linear-gradient(90deg, rgba(var(--pri-c-rgb), 0.1), rgba(var(--pri-c-rgb), 0.2), rgba(var(--pri-c-rgb), 0.1));
      transition: 1s;
      cursor: pointer;
    }
    li + li {
      margin-top: 4px;
    }
    .category {
      margin: 12px 0 0;
      display: flex;
      gap: 4px;
      transition: margin 0.5s;
      align-items: center;
      b {
        font-weight: 700;
      }
    }
    .centered {
      margin-left: 12px;
      transition: 0.5s;
    }
    
  }
  .nav-container-slim {
    max-width: 50px;
    min-width: 50px;
    .title-container {
      align-items: center;
      justify-content: center;
    }
    nav {
      li {
        align-items: center;
        padding: 16px 12px;
      }
    }
  }

  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: var(--thin-border);
    padding-top: 12px;
    margin-bottom: 12px;
  }

  // https://css-tricks.com/snippets/css/typewriter-effect/
  .typewriter {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    // border-right: .15em solid orange; /* The typwriter cursor */
    white-space: nowrap; /* Keeps the content on a single line */
    // margin: 0; /* Gives that scrolling effect as the typing happens */
    letter-spacing: 0.02em; /* Adjust as needed */
    animation: 
      typing 0.7s steps(50, end),
  }

  .typewriter-fast {
    overflow: hidden; /* Ensures the content is not revealed until the animation */
    white-space: nowrap; /* Keeps the content on a single line */
    // letter-spacing: 0.02em; /* Adjust as needed */
    animation: 
      typing 0.5s steps(40, end),
  }

  /* The typing effect */
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }


// @media screen and (max-width: var(--max-width) {
//   .nav-container {
//     display: none;
//   }
//   .nav-container-slim {
//     // position: fixed;
//     height: 100vh;
//     background-color: var(--pri-c;
//     width: 48px;
//   }
// }

.theme-container {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 0 12px;
  border-bottom: var(--thin-border);
  transition: padding 0.5s;
  p {
    margin: 0;
    font-size: 12px;
    white-space: nowrap;
  }
  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 1,
    'wght' 400,
    'GRAD' 0,
    'opsz' 20;
    color: var(--pri-c);
  }
}
.category .material-symbols-outlined,
.title-container .material-symbols-outlined,
.mobile-view .material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 20;
  color: var(--pri-c);
}

.centered2 {
  padding-left: 12px;
  transition: 0.5s;
}

.mobile-view {
  display: none;
}

@media screen and (max-width: $max-width) {
  .nav-container-gone{
    min-height: 0px;
    max-height: 0px;
    transition: height 1s;
  }
  .mobile-view {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 0;
    border-bottom: var(--thin-border);
  }
  
  .up-arrow {
    // border-top: var(--thin-border);
    transform: rotate(-90deg);
  }
  .down-arrow {
    transform: rotate(90deg);
  }

  // .slide-enter-active,
  // .slide-leave-active {
  //   transition: height 0.5s ease;
  // }

  // .slide-enter-from,
  // .slide-leave-to {
  //   height: 0px;
  // }
  // .nav-container {
  //   display: grid;
  //   grid-template-rows: 1fr;
  // }
  // .nav-container > .testing {
  //   overflow: hidden;
  // }

  // .nav-container-gone {
  //   display: grid;
  //   grid-template-rows: 0fr;
  //   transition: grid-template-rows 0.5s;
  // }
  .accordian-container {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.5s;
  }
  .accordian-container.isopen {
    grid-template-rows: 1fr;
  }
  .accordian-container > .content {
    overflow: hidden;
    border-color: var(--pri-c);
  }
  
  .accordian-container > .top-border {
    border-top: var(--thin-border);
  }

  .align-top {
    padding: 0;
    border-bottom: var(--thin-border);
    // min-width: 100vw;
    display: flex;
    justify-content: flex-start;
    transition: width 0.5s;
  }
}
</style>
