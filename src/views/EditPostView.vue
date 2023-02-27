<script lang="ts">
import EditPost from "@/components/EditPost.vue";

import {defineComponent} from "vue";
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";

export default defineComponent({
  components: { OpacityWordingAnim, EditPost },
  data(){
    return{
      pageTitle: "change ton post !",
    }
  }
});
</script>

<template>
  <div class="column-content">
    <opacity-wording-anim :text="pageTitle"></opacity-wording-anim>
      <EditPost></EditPost>
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