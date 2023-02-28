<!--<script setup lang="ts">-->
<!--import {ref} from "vue";-->
<!--import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";-->
<!--import {BlogService} from "@/services/blog.service";-->
<!--import type {Post} from "@/constants/models";-->
<!--import PostCard from "@/components/PostCard.vue";-->
<!--import moment from "moment";-->

<!--const blogSvc = new BlogService();-->
<!--const postTitle = ref("Les Poooosts !");-->
<!--const posts = ref<Post[]>([]);-->
<!--let loading = true;-->

<!--getPosts();-->

<!--function getPosts(): void {-->
<!--  blogSvc.getPosts().then((response) => {-->
<!--    posts.value = response.data.sort((a, b) =>-->
<!--        moment(b.createdIn).diff(moment(a.createdIn))-->
<!--    );-->
<!--    if (posts.value) {-->
<!--      loading = false;-->
<!--    }-->
<!--  });-->
<!--}-->

<!--</script>-->

<script lang="ts">
import { defineComponent, ref } from "vue";
import { BlogService } from "@/services/Blog.service";
import type { Post } from "@/constants/Models";
import moment from "moment";
import PostCard from "@/components/PostCard.vue";
import emitter from "@/events/emitter";

export default defineComponent({
  components: { PostCard },
  data() {
    return {
      isEditPost: false,
      blogSvc: new BlogService(),
      posts: ref<Post[]>([]).value,
      postsNumber: 0,
      loading: true,
      isDeleted: false,
      isCreated: false,
    };
  },
  created() {
    // stop listening on createOrSeePosts component
    emitter.on(
      "isDeleted",
      (isDeleted) => (this.isDeleted = isDeleted as boolean)
    );
    emitter.on(
      "isCreated",
      (isCreated) => (this.isCreated = isCreated as boolean)
    );
    if (!this.isCreated && !this.isDeleted) {
      this.getPosts();
    }
  },
  watch: {
    isDeleted() {
      if (this.isDeleted) {
        this.getPosts();
      }
    },
    isCreated() {
      if (this.isCreated) {
        this.getPosts();
      }
    },
    posts(newPost: Post) {
      if (newPost) {
        emitter.emit("postsNumber", this.postsNumber);
        this.loading = false;
      }
    },
  },
  methods: {
    getPosts(): void {
      this.blogSvc.getPosts().then((response) => {
        this.postsNumber = response.data.length;
        this.posts = response.data.sort((a, b) =>
          moment(b.createdIn).diff(moment(a.createdIn))
        );
      });
    },
  },
});
</script>

<template>
  <div class="post-list">
    <div v-if="loading">
      <ui-spinner active></ui-spinner>
    </div>
    <div v-for="post in posts" :key="post.id">
      <div class="post">
        <post-card :post="post" :is-edit-post="isEditPost"></post-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.post-list {
  padding-top: 5px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;

  .post {
    margin: 10px;
  }
}
</style>
