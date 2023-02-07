<script setup lang="ts">
import TopSideNavBar from "@/components/TopSideNavBar.vue";
import TopPhoneBar from "@/components/TopPhoneBar.vue";
import { UtilsService } from "@/services/utils.service";

const utilsSvc = new UtilsService();
const type = utilsSvc.useBreakpoints();

</script>
<template>
  <div class="page">
    <div v-if="type === 'lg'">
      <TopSideNavBar></TopSideNavBar>
    </div>
    <div v-if="type === 'md' || type === 'xs'">
      <TopPhoneBar></TopPhoneBar>
    </div>
    <RouterView class="space"></RouterView>
  </div>
</template>

<style scoped lang="less">
.page {
  display: flex;
  flex-direction: row;
  .space {
    flex: 1;
    padding-top: 120px;
  }
}
</style>
