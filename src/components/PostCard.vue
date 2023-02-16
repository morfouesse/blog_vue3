<script setup lang="ts">
import { RoutePath } from "@/constants/routePath";
import { useRoute, useRouter } from "vue-router";
import {BlogService} from "@/services/blog.service";

const props = defineProps(["post"]);
const router = useRouter();
const blogSvc = new BlogService();
function goToEditPost(): void {
  router.push({
    name: "editPost",
    params: {
      post: props.post.id,
    },
  });
}

function goToDeletePost(): void {
 blogSvc.deletePostById(props.post.id);
location.reload();
}
</script>
<template>
  <ui-card class="demo-card-photo">
    <ui-card-content>
      <ui-card-media square class="demo-card-media">
        <ui-card-media-content class="demo-card-title">
          <div class="demo-card-media-title">
            {{ post.title }}
          </div>
        </ui-card-media-content>
      </ui-card-media>
      <div class="demo-card-subtitle">
        {{ post.body }}
      </div>
    </ui-card-content>
    <ui-card-actions>
      <ui-card-icons>
        <ui-icon-button @click="goToEditPost" icon="edit"></ui-icon-button>
        <ui-icon-button @click="goToDeletePost" icon="delete"></ui-icon-button>
      </ui-card-icons>
    </ui-card-actions>
  </ui-card>
</template>
<style scoped lang="less">
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

.demo-card-subtitle {
  margin: 10px;
  overflow: hidden;
  height: 50px;
}

.demo-card-media-title {
  font-size: 20px;
  padding: 20px 16px;
  background-image: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  color: white;
}
</style>
