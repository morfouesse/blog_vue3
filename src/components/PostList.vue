<script setup lang="ts">
import { ref } from "vue";
import OpacityWordingAnim from "@/components/opacityWordingAnim.vue";
import { BlogService } from "@/services/blog.service";
import type { Post } from "@/constants/models";

const blogSvc: BlogService = new BlogService();
const survey = ref("Les Poooosts !");
let posts: Post[];

blogSvc.posts().then((response) => {
  posts = response.data;
});
</script>

<template>
  <opacity-wording-anim :text="survey"></opacity-wording-anim>
  <div v-for="post in posts.slice(0, 5)" :key="post.id">
    titre:{{ post.title }}
  </div>

</template>

<style scoped></style>
