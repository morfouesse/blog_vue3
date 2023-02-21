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
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import { BlogService } from "@/services/Blog.service";
import { defineComponent, ref } from "vue";
import type { Post } from "@/constants/Models";
import moment from "moment";
import { RoutePath } from "@/constants/RoutePath";
import PostCard from "@/components/PostCard.vue";
import { UtilsService } from "@/services/Utils.service";

const blogSvc = new BlogService();
const utilsSvc = new UtilsService();
export default defineComponent({
  components: { PostCard, OpacityWordingAnim },
  data() {
    return {
      maxlengthTextField: 20,
      titleErrorMessage: "",
      bodyErrorMessage: "",
      isEditPost: true,
      pageTitle: "change ton post !",
      postTitle: "Titre",
      postBody: "Description",
      postButton: "Modifier",
      post: ref<Post>({
        id: Number(this.$router.currentRoute.value.params.post),
        title: "",
        body: "",
        createdIn: "",
      }).value,
    };
  },
  computed: {
    title(): string {
      return this.post.title;
    },
    body(): string {
      return this.post.body;
    },
  },
  watch: {
    title() {
      if (this.post.title.length === 0) {
        this.titleErrorMessage = "Veuillez crée un titre.";
      } else if(this.post.title.length >= this.maxlengthTextField){
        this.titleErrorMessage = "maximum 20 caractères.";
      }
      else {
        this.titleErrorMessage = "";
      }
    },
    body() {
      if (this.post.body.length === 0) {
        this.bodyErrorMessage = "Veuillez crée une description.";
      } else {
        this.bodyErrorMessage = "";
      }
    },
  },
  created() {
    this.post = this.getPostById();
  },
  methods: {
    modifyPost() {
      this.post.createdIn = moment().format(utilsSvc.formatDateHourSecond());
      blogSvc.putPost(this.post);
      this.$router.push(RoutePath.POSTS);
    },
    getPostById(): Post {
      blogSvc
        .getPostById(Number(this.$router.currentRoute.value.params.post))
        .then((post) => (this.post = post.data));
      return this.post;
    },
  },
});
</script>

<template>
  <div class="column-content">
    <opacity-wording-anim :text="pageTitle"></opacity-wording-anim>
    <div class="row-content" v-if="post">
      <div class="flex-form">
        <form>
          <div class="inputs">
            <div class="input">
              <ui-textfield v-model="post.title" :maxlength="maxlengthTextField" outlined>
                {{ postTitle }}
              </ui-textfield>
          <div v-if="titleErrorMessage.length !== 0" >
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
            <div class="button">
              <ui-button
                raised
                :disabled="
                  !(
                    titleErrorMessage.length === 0 &&
                    bodyErrorMessage.length === 0
                  )
                "
                @click="modifyPost"
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
  </div>
</template>

<style scoped lang="less">
.column-content {
  gap: 150px;
  flex-direction: column;
  display: flex;
  align-items: center;

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

        .button {
          margin-top: 100%;

          .button-text {
            color: white;
          }
        }
      }
    }
  }
}
</style>
