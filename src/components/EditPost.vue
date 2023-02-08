<script setup lang="ts">
import OpacityWordingAnim from "@/components/OpacityWordingAnim.vue";
import {ref} from "vue";
import type {Post} from "@/constants/models";
import PostCard from "@/components/PostCard.vue";
import {BlogService} from "@/services/blog.service";
import {useRouter} from "vue-router";
import {Route} from "@/constants/route";

const router = useRouter();
const blogSvc = new BlogService();
const pageTitle = ref("change ton post !");
const postTitle = ref("Titre");
const postBody = ref("Description");
const postButton = ref("Modifier");

const post = ref<Post>(
    {
      title: "",
      body: ""
    });

function modifyPost() {
  blogSvc.putPost(post.value);
  router.push(Route.POSTS);
}

</script>

<template>
  <div class="column-content">

    <opacity-wording-anim :text="pageTitle"></opacity-wording-anim>
    <div class="row-content">
      <div class="flex-form">
        <form>
          <div class="inputs">
            <div class="input">
              <ui-textfield v-model="post.title" outlined>
                {{ postTitle }}
              </ui-textfield>
            </div>
            <div class="input input-description">
              <ui-textfield input-type="textarea" rows="4" cols="25" v-model="post.body" outlined>
                {{ postBody }}
              </ui-textfield>
            </div>
            <div class="button">
              <ui-button raised :disabled="post.title.length === 0 || post.body.length === 0">
                <span @click="modifyPost" class="button-text"> {{ postButton }} </span>
              </ui-button>
            </div>
          </div>
        </form>
      </div>
      <div>
        <PostCard :post-title="post.title" :post-body="post.body"></PostCard>
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
          margin-top: 90px;
          position: absolute;
        }

        .button {
          margin-top: 75%;

          .button-text {
            color: white;
          }
        }
      }
    }
  }
}
</style>
