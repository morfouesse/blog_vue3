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
import {defineComponent, ref} from "vue";
import {BlogService} from "@/services/blog.service";
import type {Post} from "@/constants/models";
import moment from "moment";
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import PostCard from "@/components/PostCard.vue";

export default defineComponent({
  components: {PostCard, OpacityWordingAnim},
  data() {
    return {
      blogSvc: new BlogService(),
      postTitle: "Les Poooosts !",
      posts: ref<Post[]>([]).value,
      loading: true,
    }
  },
  created() {
    this.getPosts();
  },
  watch: {
    posts(newPost: Post) {
      if (newPost) {
        this.loading = false;
      }
    }
  },
  methods: {
    getPosts(): void {
      this.blogSvc.getPosts().then((response) => {
        this.posts = response.data.sort((a, b) =>
            moment(b.createdIn).diff(moment(a.createdIn))
        );
      });
    }
  }
})
</script>


<template>
  <div class="flex-content">

    <opacity-wording-anim :text="postTitle"></opacity-wording-anim>
    <div class="post-list">
      <div v-if="loading">
        <ui-spinner active></ui-spinner>
      </div>
      <div v-for="post in posts" :key="post.id">
        <div class="post">
          <post-card :post="post"></post-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.flex-content {
  flex-direction: column;
  display: flex;
  align-items: center;

  .post-list {
    padding-top: 50px;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;

    .post {
      margin: 10px;
    }
  }
}

</style>
