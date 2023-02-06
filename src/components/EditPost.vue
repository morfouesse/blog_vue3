<script setup>
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import { ref } from "vue";

const postTitle = ref("change ton post !");
</script>

<template>
  <opacity-wording-anim :text="postTitle"></opacity-wording-anim>
</template>

<style scoped></style>
