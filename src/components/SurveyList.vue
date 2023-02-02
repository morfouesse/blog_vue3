<script setup lang="ts">
import { ref } from "vue";
import OpacityWordingAnim from "@/components/opacityWordingAnim.vue";

const SURVEY = ref("Questionnaire");
</script>

<template>
  <opacity-wording-anim :text="SURVEY"></opacity-wording-anim>
</template>

<style scoped></style>
