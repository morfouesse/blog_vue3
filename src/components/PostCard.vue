<!--<script setup lang="ts">-->
<!--import { RoutePath } from "@/constants/routePath";-->
<!--import { useRoute, useRouter } from "vue-router";-->
<!--import {BlogService} from "@/services/blog.service";-->

<!--const props = defineProps(["post"]);-->
<!--const router = useRouter();-->
<!--const blogSvc = new BlogService();-->
<!--function goToEditPost(): void {-->
<!--  router.push({-->
<!--    name: "editPost",-->
<!--    params: {-->
<!--      post: props.post.id,-->
<!--    },-->
<!--  });-->
<!--}-->

<!--function goToDeletePost(): void {-->
<!-- blogSvc.deletePostById(props.post.id);-->
<!--location.reload();-->
<!--}-->
<!--</script>-->

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {BlogService} from "@/services/blog.service";
import moment from "moment";

export default defineComponent({
  data() {
    return {
      router: useRouter(),
      blogSvc: new BlogService(),
    }
  },
  props: ["post"],
  computed:{
    isNewPost(): boolean{
      if(moment(this.post.createdIn).day() === moment().day()){
        return true;
      }
      return false;
    }
  },
  methods: {
    goToEditPost(): void {
      this.router.push({
        name: "editPost",
        params: {
          post: this.$props.post.id,
        },
      });
    },
    goToDeletePost(): void {
      this.blogSvc.deletePostById(this.$props.post.id);
      location.reload();
    }
  }
})
</script>

<template>
  <ui-card class="demo-card-photo">
    <ui-card-content :class="{ 'new-post': isNewPost }">
      <ui-card-media square class="demo-card-media">
        <ui-card-media-content class="demo-card-title">
          <div class="demo-card-media-title">
            {{ post.title }}
          </div>
        </ui-card-media-content>
      </ui-card-media>
      <div class="demo-card-subtitle" :class="{'new-post-body': isNewPost}">
        {{ post.body }}
      </div>
    </ui-card-content>
    <ui-card-actions>
      <div v-if="isNewPost">
        <ui-chip icon="info" class="new-post-chip">Nouveau post</ui-chip>
      </div>
      <ui-card-icons>
        <ui-icon-button @click="goToEditPost" icon="edit"></ui-icon-button>
        <ui-icon-button @click="goToDeletePost" icon="delete"></ui-icon-button>
      </ui-card-icons>
    </ui-card-actions>
  </ui-card>
</template>
<style scoped lang="less">

.new-post {
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 16%, rgba(9, 9, 121, 1) 43%, rgba(50, 50, 226, 1) 68%);

  .new-post-chip {
    background-color: #0A00FFF9;

  }
}

.demo-card-photo {
  width: 300px;

}

.demo-card-media {
  background-image: url("../assets/logo.svg");
}

.demo-card-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.new-post-body {
  color: white;
}

.demo-card-subtitle {
  margin: 10px;
  overflow: hidden;
  height: 50px;
}

.demo-card-media-title {
  font-size: 20px;
  padding: 20px 16px;
  background-image: linear-gradient(rgba(0, 0, 0, 0) 0%,
  rgba(0, 0, 0, 0.6) 100%);
  color: white;
}
</style>
