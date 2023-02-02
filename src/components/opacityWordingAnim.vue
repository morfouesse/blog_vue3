<script setup lang="ts">
defineProps(["text"]);
</script>
<template>
  <div class="opacity-wording-anim">
   <h1>{{ text }}</h1>
  </div>
</template>

<style lang="less">
@opacity-dur: 1000ms;
.opacity-wording-anim {
  @media (min-width: 1024px) {
    transform-origin: left;
    animation: opacity-anim @opacity-dur;
    min-height: 100vh;
    display: flex;
    align-items: center;

    h1 {
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
}
</style>
