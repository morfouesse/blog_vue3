<!--<script setup lang="ts">-->
<!--import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";-->
<!--import {ref} from "vue";-->
<!--import type {Post} from "@/constants/models";-->
<!--import PostCard from "@/components/PostCard.vue";-->
<!--import {BlogService} from "@/services/blog.service";-->
<!--import {useRouter} from "vue-router";-->
<!--import {RoutePath} from "@/constants/routePath";-->
<!--import moment from "moment";-->

<!--const router = useRouter();-->
<!--const blogSvc = new BlogService();-->
<!--const pageTitle = ref("change ton post !");-->
<!--const postTitle = ref("Titre");-->
<!--const postBody = ref("Description");-->
<!--const postButton = ref("Modifier");-->

<!--const post = ref<Post>(-->
<!--    {-->
<!--      id: Number(router.currentRoute.value.params.post),-->
<!--      title: "",-->
<!--      body: "",-->
<!--      createdIn: moment().format()-->
<!--    });-->

<!--function modifyPost(): void {-->
<!--  blogSvc.putPost(post.value);-->
<!--  router.push(RoutePath.POSTS);-->
<!--}-->

<!--// function getPostById(): void{-->
<!--//    blogSvc.getPostById(Number(router.currentRoute.value.params.post)).then(-->
<!--//        post => post = post.data-->
<!--//    );-->
<!--// }-->

<!--</script>-->

<script lang="ts">
import { BlogService } from "@/services/Blog.service";
import { defineComponent, ref } from "vue";
import type { FileUi, Post } from "@/constants/Models";
import moment from "moment";
import { RoutePath } from "@/constants/RoutePath";
import PostCard from "@/components/PostCard.vue";
import { UtilsService } from "@/services/Utils.service";
import { useEvent } from "balm-ui";
import emitter from "@/events/emitter";

const blogSvc = new BlogService();
const utilsSvc = new UtilsService();
export default defineComponent({
  // necessary because keepAlive need it for "include" parameter
  name: "EditPost",
  components: { PostCard },
  data() {
    return {
      balmUI: useEvent(),
      files: ref<FileUi[]>([]).value,
      maxlengthTextField: 20,
      titleErrorMessage: "",
      bodyErrorMessage: "",
      fileText: "Télécharger",
      postTitle: "Titre *",
      postBody: "Description *",
      postButton: "Modifier",
      post: ref<Post>({
        title: "",
        body: "",
        createdIn: "",
      }).value,
    };
  },
  computed: {
    isEditPost(): boolean {
      return !!this.$router.currentRoute.value.params.post;
    },
    title(): string {
      return this.post.title;
    },
    body(): string {
      return this.post.body;
    },
  },
  watch: {
    title() {
      this.checkTitleError();
    },
    body() {
      this.checkBodyError();
    },
    files() {
      this.post.image = this.files[0].name;
    },
  },
  created() {
    if (this.isEditPost) {
      this.post = this.getPostById();
    } else {
      this.checkTitleError();
      this.checkBodyError();
    }
  },
  methods: {
    checkTitleError(): void {
      if (this.post.title.length === 0) {
        this.titleErrorMessage = "Veuillez crée un titre.";
      } else if (this.post.title.length >= this.maxlengthTextField) {
        this.titleErrorMessage = "maximum 20 caractères.";
      } else {
        this.titleErrorMessage = "";
      }
    },
    checkBodyError(): void {
      if (this.post.body.length === 0) {
        this.bodyErrorMessage = "Veuillez crée une description.";
      } else {
        this.bodyErrorMessage = "";
      }
    },
    submitPost(): void {
      this.post.createdIn = moment().format(utilsSvc.formatDateHourSecond());
      if (this.isEditPost) {
        this.post.id = Number(this.$router.currentRoute.value.params.post);
        blogSvc.putPost(this.post);
        this.$router.push(RoutePath.POSTS);
      } else {
        // Done in the OnComplete promise because the listener listen too fast, so
        // the GET is done before the POST
        blogSvc
          .postPost(this.post)
          .then()
          .catch()
          .then(() => {
            emitter.emit("isCreated", true);
          });
      }
      this.resetForm();
    },
    getPostById(): Post {
      blogSvc
        .getPostById(Number(this.$router.currentRoute.value.params.post))
        .then((post) => (this.post = post.data));
      return this.post;
    },
    resetForm(): void {
      this.post.title = "";
      this.post.body = "";
      this.post.image = "";
    },
  },
});
</script>

<template>
  <div class="row-content">
    <div class="flex-form">
      <form>
        <div class="inputs">
          <div class="input">
            <ui-textfield
              v-model="post.title"
              :maxlength="maxlengthTextField"
              outlined
            >
              {{ postTitle }}
            </ui-textfield>
            <div v-if="titleErrorMessage.length !== 0">
              {{ titleErrorMessage }}
            </div>
          </div>
          <div class="input input-description">
            <ui-textfield
              input-type="textarea"
              rows="4"
              cols="25"
              v-model="post.body"
              outlined
            >
              {{ postBody }}
            </ui-textfield>
            <div v-if="bodyErrorMessage.length !== 0">
              {{ bodyErrorMessage }}
            </div>
          </div>
          <div class="buttons">
            <div class="button-file">
              <ui-file
                accept="image/*"
                @change="balmUI.onChange('files', $event)"
                :text="fileText"
                outlined
              ></ui-file>
              {{ post.image }}
            </div>
            <ui-button
              raised
              :disabled="
                !(
                  titleErrorMessage.length === 0 &&
                  bodyErrorMessage.length === 0
                )
              "
              @click="submitPost"
            >
              <span class="button-text">
                {{ postButton }}
              </span>
            </ui-button>
          </div>
        </div>
      </form>
    </div>
    <div>
      <PostCard :post="post" :is-edit-post="isEditPost"></PostCard>
    </div>
  </div>
</template>

<style scoped lang="less">
.row-content {
  flex-direction: row;
  gap: 400px;
  display: flex;
  justify-content: space-around;

  .flex-form {
    flex-direction: column;
    display: flex;
    align-items: center;

    .inputs {
      flex-direction: column;
      display: flex;
      margin-right: 14%;
      margin-top: 5%;

      .input {
        margin-bottom: 50px;
      }

      .input-description {
        margin-top: 120px;
        position: absolute;
      }

      .buttons {
        margin-top: 100%;

        .button-file {
          margin-bottom: 80px;
        }

        .button-text {
          color: white;
        }
      }
    }
  }
}
</style>
