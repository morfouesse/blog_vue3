<script lang="ts">
import EditAndCreatePost from "@/components/EditAndCreatePost.vue";
import { defineComponent } from "vue";
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";

export default defineComponent({
  components: { OpacityWordingAnim, EditAndCreatePost },
  data() {
    return {
      pageTitle: "change ton post !",
    };
  },
});
</script>

<template>
  <div class="column-content">
    <opacity-wording-anim :text="pageTitle"></opacity-wording-anim>
    <EditAndCreatePost></EditAndCreatePost>
  </div>
</template>

<style scoped lang="less">
.column-content {
  gap: 150px;
  flex-direction: column;
  display: flex;
  align-items: center;
}
</style>
