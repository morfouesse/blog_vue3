<script setup lang="ts">
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import {ref} from "vue";

const ABOUT = ref("Bienvenuuuue !");

</script>
<template>
  <div class="flex-content">

  <opacity-wording-anim :text="ABOUT"></opacity-wording-anim>
  </div>
</template>

<style scoped lang="less">
.flex-content{
  flex-direction: column;
  display: flex;
  align-items: center;
}
</style>
