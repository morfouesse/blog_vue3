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
import { defineComponent, type PropType } from "vue";
import { BlogService } from "@/services/Blog.service";
import moment from "moment";
import type { Post } from "@/constants/Models";
import emitter from "@/events/emitter";

const blogSvc = new BlogService();
export default defineComponent({
  data() {
    return {
      isDeleted: false,
    };
  },
  props: {
    post: {
      type: Object as PropType<Post>,
    },
    isEditPost: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isNewPost(): boolean {
      return !!this.post && moment(this.post.createdIn).isSame(moment(), "day");
    },
  },
  methods: {
    goToEditPost(): void {
      this.$router.push({
        name: "editPost",
        params: {
          post: this.post?.id,
        },
      });
    },
    deletePost(): void {
      if (this.post && this.post.id) {
        this.isDeleted = true;
        // Done in the OnComplete promise because the listener listen too fast, so
        // the GET is done before the DELETE
        blogSvc
          .deletePostById(this.post.id)
          .then()
          .catch()
          .then(() => {
            emitter.emit("isDeleted", { isDeleted: this.isDeleted });
          });
      }
    },
  },
});
</script>

<template>
  <ui-card class="demo-card-photo">
    <ui-card-content :class="{ 'new-post': isNewPost }">
      <div>
        <img
          :src="
            post.image
              ? '../src/assets/' + post.image
              : '../src/assets/logo.svg'
          "
          :alt="post.image"
        />
        <ui-card-media-content class="demo-card-title">
          <div class="demo-card-media-title">
            {{ post.title }}
          </div>
        </ui-card-media-content>
      </div>
      <div class="demo-card-subtitle" :class="{ 'new-post-body': isNewPost }">
        {{ post.body }}
      </div>
    </ui-card-content>
    <ui-card-actions>
      <div v-if="isNewPost">
        <ui-chip icon="info" class="new-post-chip">Nouveau post</ui-chip>
      </div>
      <ui-card-icons>
        <ui-icon-button
          :disabled="isEditPost"
          @click="goToEditPost"
          icon="edit"
        ></ui-icon-button>
        <ui-icon-button
          :disabled="isEditPost"
          @click="deletePost"
          icon="delete"
        ></ui-icon-button>
      </ui-card-icons>
    </ui-card-actions>
  </ui-card>
</template>
<style scoped lang="less">
.new-post {
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 16%,
    rgba(9, 9, 121, 1) 43%,
    rgba(50, 50, 226, 1) 68%
  );

  .new-post-chip {
    background-color: #0a00fff9;
  }
}

.demo-card-photo {
  width: 300px;
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
  background-image: linear-gradient(
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  color: white;
}
</style>
