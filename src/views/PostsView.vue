<script lang="ts">
import PostList from "@/components/PostList.vue";
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { PostList, OpacityWordingAnim },
  data() {
    return {
      postTitle: "Les Poooosts !",
      postsNumber: 0,
    };
  },
});
</script>

<template>
  <main>
    <div class="flex-content">
      <OpacityWordingAnim :text="postTitle" :subText="postsNumber"></OpacityWordingAnim>
      <PostList @postsNumber="(number) => postsNumber = number"></PostList>
    </div>
  </main>
</template>

<style lang="less">
.flex-content {
  flex-direction: column;
  display: flex;
  align-items: center;
}
</style>
