<script lang="ts">
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import {defineComponent} from "vue";
import CreateOrSeePosts from "@/components/CreateOrSeePosts.vue";

export default defineComponent({
  components: {CreateOrSeePosts, OpacityWordingAnim},
  data() {
    return {
      postTitle: "Les Poooosts !",
    };
  },
});
</script>

<template>
  <main>
    <div class="column-page">
      <OpacityWordingAnim
          :text="postTitle"
      ></OpacityWordingAnim>
     <CreateOrSeePosts></CreateOrSeePosts>
    </div>
  </main>
</template>

<style lang="less">
.column-page {
  flex-direction: column;
  display: flex;
}
</style>
