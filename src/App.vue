<script setup lang="ts">
import TopSideNavBar from "@/components/TopSideNavBar.vue";
import TopPhoneBar from "@/components/BottomPhoneBar.vue";
import { UtilsService } from "@/services/Utils.service";
import {ScreenType} from "@/constants/Enums";

const utilsSvc = new UtilsService();
const screenType = utilsSvc.useBreakpoints();

</script>
<template>
  <div class="page">
    <div v-if="screenType === ScreenType.LG">
      <TopSideNavBar></TopSideNavBar>
    </div>
    <div v-if="screenType === ScreenType.MD || screenType === ScreenType.XS">
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
