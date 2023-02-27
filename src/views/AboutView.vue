<script setup lang="ts">
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import {ref} from "vue";

const ABOUT = ref("Bienvenuuuue !");

</script>
<template>
  <div class="column-page">

  <opacity-wording-anim :text="ABOUT"></opacity-wording-anim>
  </div>
</template>

<style scoped lang="less">
.column-page{
  flex-direction: column;
  display: flex;
  align-items: center;
}
</style>
