<script setup lang="ts">
import OpacityWordingAnim from "@/components/opacityWordingAnim.vue";
import {ref} from "vue";

const ABOUT = ref("Bienvenuuuue !");

</script>
<template>
  <opacity-wording-anim :text="ABOUT"></opacity-wording-anim>
</template>

<style lang="less">
</style>
