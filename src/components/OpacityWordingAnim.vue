<script setup lang="ts">
defineProps(["text"]);
</script>
<template>
  <div>
    <h1>{{ text }}</h1>
  </div>
</template>

<style scoped lang="less">
@opacity-dur: 1000ms;

div {
  flex-direction: column;
  display: flex;
  align-items: center;
  transform-origin: left;
  animation: opacity-anim @opacity-dur;
  h1 {
    font-size: 60px;
    font-family: "Bauhaus 93", sans-serif;
  }
  @keyframes opacity-anim {
    0% {
      transform: scaleX(0);
      opacity: 0;
    }
    70% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
      transform: scaleX(1);
    }
  }
}
</style>
