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
import { UtilsService } from "@/services/Utils.service";
import { ScreenType } from "@/constants/Enums";

const utilsSvc = new UtilsService();
export default defineComponent({
  computed: {
    ScreenType() {
      return ScreenType;
    },
  },

  components: { PostCard },
  data() {
    return {
      screenType: utilsSvc.useBreakpoints(),
      diseableIcons: false,
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
    <div v-if="loading" class="loader">
      <ui-spinner active></ui-spinner>
    </div>
    <transition-group tag="div" name="list"
    class="post-list"
    :style="screenType !== ScreenType.LG ? 'padding-bottom: 100px;' : ''"
  >
      <div class="post" v-for="post in posts" :key="post.id">
          <post-card :post="post" :diseable-icons="diseableIcons"></post-card>
      </div>
    </transition-group>
</template>

<style scoped lang="less">
.loader{
  display: flex;
  justify-content: center;
}
.post-list {
  padding-top: 5px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;

  .list-enter-from{
    opacity: 0;
    transform: scale(0.6);
  }
  .list-enter-to{
    opacity: 1;
    transform: scale(1);
  }
  .list-enter-active {
    transition: all 0.4s ease;
  }

  .list-leave-from{
    opacity: 1;
    transform: scale(1);
  }
  .list-leave-to{
    opacity: 0;
    transform: scale(0.6);
  }
  .list-leave-active{
    transition: all 0.4s ease;
  }


  .post {
    margin: 10px;
  }
}
</style>
