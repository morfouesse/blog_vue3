<script setup lang="ts">
import {ref} from "vue";
import {Route} from "@/constants/route";
import {useRouter} from "vue-router";
const type = ref(0);
const title = ref("wwoooooaaw");
const openDrawer = ref(false);
const router = useRouter();
function goToPosts(): void {
  router.push(Route.POSTS);
}
function goToHome(): void {
  router.push(Route.HOME);
}
function goToAbout(): void {
  router.push(Route.ABOUT);
}
</script>
<template>
  <div class="demo-container">
    <!-- App bar -->
    <ui-top-app-bar
        class="demo-app-bar"
        content-selector=".demo-content"
        :nav-icon="false"
    >
      BLOOOOOOG
    </ui-top-app-bar>
    <!-- Content -->
    <div class="demo-content">
      <!-- Drawer -->
      <ui-drawer viewport-height>
        <ui-drawer-header>
          <ui-drawer-title>Fonçez !</ui-drawer-title>
        </ui-drawer-header>
        <ui-drawer-content>
          <ui-nav>
            <ui-nav-item href="#" @click="goToHome">Home
            </ui-nav-item>
            <ui-nav-item href="#" @click="goToPosts">Les posts !
            </ui-nav-item>
            <ui-nav-item href="#" @click="goToAbout">A propos
            </ui-nav-item>
          </ui-nav>
        </ui-drawer-content>
      </ui-drawer>
    </div>
  </div>
</template>

<style scoped lang="less">
.demo-content{
  height: 250vh;
}
</style>