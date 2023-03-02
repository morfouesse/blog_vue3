
<script lang="ts">
import {defineComponent} from "vue";
import emitter from "@/events/emitter";

export default defineComponent({
  data(){
    return{
      isDeleted: false,
    }
  },
  created() {
    emitter.on(
        "isDeleted",
        (isDeleted) => (this.isDeleted = isDeleted as boolean)
    );
  }
});
</script>
<template>
<transition name="fade">
</transition>
</template>

<style scoped>

</style>