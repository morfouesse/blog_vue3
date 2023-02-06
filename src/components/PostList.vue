<script setup lang="ts">
import {ref} from "vue";
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import {BlogService} from "@/services/blog.service";
import type {Post} from "@/constants/models";
import PostCard from "@/components/PostCard.vue";

const blogSvc: BlogService = new BlogService();
const postTitle = ref("Les Poooosts !");
const posts = ref<Post[]>([]);
const postsNumber = ref(0);
defineExpose(postsNumber);
let loading = true;

getPosts();

async function getPosts(): Promise<void> {
  await blogSvc.posts().then((response) => {
    postsNumber.value = response.data.length;
    // je simule une requete lourde
    setTimeout(() => {
      posts.value = response.data;
    }, 1500);
  });
  if (posts.value) {
    loading = false;
  }
}

</script>

<template>
    <opacity-wording-anim :text="postTitle"></opacity-wording-anim>
    <div class="post-list">
    <div v-if="loading">...Loading</div>
      <div v-for="post in posts.slice(0, 6)" :key="post.id">
        <div class="post">
        <post-card :title="post.title"></post-card>
        </div>
      </div>
    </div>
</template>

<style scoped lang="less">

  .post-list {
  padding-top: 50px;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    .post{
      margin: 10px;
    }
  }

</style>
