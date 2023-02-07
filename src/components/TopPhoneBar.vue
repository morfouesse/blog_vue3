<script setup lang="ts">
import { ref } from "vue";

const items = ref([
  {
    text: "Home",
    icon: "home",
    url: "url 1",
  },
  {
    text: "posts",
    icon: "music_note",
    url: "url 2",
  },
  {
    text: "A propos",
    icon: "place",
  },
  {
    text: "Créer un post !",
    icon: "fiber_new",
  },
]);
</script>

<template>
  <div class="container">
    <!-- Content -->

    <ui-navigation-bar content-selector=".container" stacked>
      <ui-tabs
        type="textWithIcon"
        :items="items"
        stacked
      ></ui-tabs>
    </ui-navigation-bar>
  </div>
</template>

<style scoped></style>
