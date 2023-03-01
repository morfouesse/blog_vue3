<script lang="ts">
import {defineComponent} from "vue";
import {RoutePath} from "@/constants/RoutePath";

export default defineComponent({
  data() {
    return {
      items: [
        {
          text: "Home",
          icon: "home",
          url: RoutePath.HOME,
        },
        {
          text: "posts",
          icon: "music_note",
          url: RoutePath.POSTS,
        },
        {
          text: "A propos",
          icon: "place",
          url: RoutePath.ABOUT,
        },
      ],
      selectedOption: 0,
    };
  },
  watch:{
    selectedOption(){
      this.$router.push(this.items[this.selectedOption].url);
    }
  }
});
</script>

<template>
  <div class="container">
    <ui-navigation-bar content-selector=".container" stacked>
      <ui-tabs    v-model="selectedOption"
                  type="textWithIcon"
                  :items="items"
                  stacked></ui-tabs>
    </ui-navigation-bar>
  </div>
</template>

<style scoped>
</style>
