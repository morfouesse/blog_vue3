<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
</script>

<style scoped lang="less">
.page{
  display: flex;
  flex-direction: row;
  .space{
    flex: 1;
    padding-top: 120px;
  }
}
</style>

<template>
  <div class="page">
  <navBar></navBar>
  <RouterView class="space"></RouterView>
  </div>
</template>
