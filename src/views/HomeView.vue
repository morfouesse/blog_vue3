<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: { HelloWorld },
});
</script>
<!--<script setup lang="ts">-->
<!--import HelloWorld from "@/components/HelloWorld.vue";-->
<!--import {useRouter} from "vue-router";-->
<!--import {RoutePath} from "@/constants/routePath";-->

<!--</script>-->
<template>
  <main>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </main>
</template>

<style scoped lang="less">
main {
  flex-wrap: wrap;
  flex-direction: row;
  gap: 20px;
  display: flex;
  justify-content: center;
  line-height: 1.5;

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  nav {
    width: 100%;
    font-size: 12px;
    text-align: center;
    margin-top: 2rem;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    cursor: pointer;
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  nav a:first-of-type {
    border: 0;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    nav {
      text-align: left;
      margin-left: -1rem;
      font-size: 1rem;

      padding: 1rem 0;
      margin-top: 1rem;
    }
  }
}
</style>
