<script lang="ts">
import PostList from "@/components/PostList.vue";
import { defineComponent } from "vue";
import emitter from "@/events/emitter";
import EditAndCreatePost from "@/components/EditAndCreatePost.vue";
import { SelectedChips } from "@/constants/Enums";

export default defineComponent({
  components: { EditAndCreatePost, PostList },
  data() {
    return {
      selectedChips: "PostList",
      chips: [
        // we need component name because we use KeepAlive component
        { label: "La liste des posts", value: "PostList" },
        { label: "Créer un post", value: "EditAndCreatePost" },
      ],
      isCreated: false,
      postsNumber: 0,
    };
  },
  created() {
    emitter.on(
      "isCreated",
      (isCreated) => (this.isCreated = isCreated as boolean)
    );
    emitter.on(
      "postsNumber",
      (postsNumber) => (this.postsNumber = postsNumber as number)
    );
  },
  unmounted() {
    emitter.all.clear();
  },
  computed: {
    // if no value selected we have -1
    getSelectedChips(): string | number {
      return this.selectedChips;
    },
  },
  watch: {
    isCreated() {
      if (this.isCreated) {
        this.selectedChips = SelectedChips.POST_LIST;
      }
      this.isCreated = false;
    },
    selectedChips() {
      if (this.getSelectedChips === -1) {
        this.selectedChips = SelectedChips.POST_LIST;
      }
    },
  },
});
</script>
<template>
  <div class="row-page">
    <div>
      <ui-chips
        :options="chips"
        type="choice"
        v-model="selectedChips"
      ></ui-chips>
    </div>
    <div v-if="postsNumber">
      <h2>Déjà {{ postsNumber }} Pooosts !</h2>
    </div>
  </div>
  <KeepAlive include="EditAndCreatePost">
    <component :is="selectedChips"></component>
  </KeepAlive>
</template>

<style scoped>
.row-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-left: 35px;
  margin-top: 80px;
}
</style>
