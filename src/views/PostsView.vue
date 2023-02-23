<script lang="ts">
import PostList from "@/components/PostList.vue";
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import { defineComponent } from "vue";
import emitter from "@/events/emitter";

export default defineComponent({
  components: { PostList, OpacityWordingAnim },
  data() {
    return {
      resetComponent: 0,
      postTitle: "Les Poooosts !",
      isDeleted: false,
      postsNumber: 0,
    };
  },
  created() {
    emitter.on(
      "isDeleted",
      (isDeleted) => (this.isDeleted = isDeleted as boolean)
    );
  },
  unmounted() {
    emitter.all.delete("isDeleted");
  },
  computed: {
    isPostDeleted(): boolean {
      return this.isDeleted;
    },
  },
  watch: {
    isPostDeleted() {
      if (this.isDeleted) {
        this.resetComponent += 1;
      }
    },
  },
});
</script>

<template>
  <main>
    <div class="flex-content">
      <OpacityWordingAnim
        :text="postTitle"
        :subText="postsNumber"
      ></OpacityWordingAnim>
      <PostList
        :key="resetComponent"
        @postsNumber="(number) => (postsNumber = number.postsNumber)"
      ></PostList>
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
