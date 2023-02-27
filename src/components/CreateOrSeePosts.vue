<script lang="ts">
import PostList from "@/components/PostList.vue";
import {defineComponent} from "vue";
import emitter from "@/events/emitter";
import EditPost from "@/components/EditPost.vue";

export default defineComponent({
  components: {EditPost, PostList},
  data() {
    return {
      selectedChips: "PostList",
      chips: [
        {label: "La liste des posts", value: "PostList"},
        {label: "Créer un post", value: "EditPost"},
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
    )
  },
  unmounted() {
    emitter.all.clear();
  },
  computed: {
    getSelectedChips(): string | number{
      return this.selectedChips;
    }
  },
  watch: {
    isCreated() {
      if (this.isCreated) {
        this.selectedChips = "PostList";
      }
      this.isCreated = false;
    },
    selectedChips() {
      if (this.getSelectedChips === -1) {
        this.selectedChips = "PostList";
      }
    }
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
  <KeepAlive include="EditPost">
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
