<template>
  <div class="book-item d-flex align-center pa-5">
    <v-avatar size="40">
      <v-img :src="book.img"></v-img>
    </v-avatar>
    <div class="flex-fill mx-5">
      <div
        class="font-weight-bold"
      >
        {{ book.title }}
      </div>
      <div
        class=""
      >
        {{ book.author }}
      </div>
    </div>

    <v-btn
      size="small"
      icon="mdi-cart-plus"
      color="blue"
      class="mr-1 mt-1"
    >
    </v-btn>

    <v-btn
      size="small"
      icon="mdi-delete-outline"
      class="mr-1 mt-1"
      @click-event="deleteBook"
      color="red"
      alt="Delete book"
      aria-label="Delete book"
    ></v-btn>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  book: {
    type: Object,
    default: null
  }
});

const { book } = toRefs(props)
</script>

<style lang="scss">
.book-item {
  transition: all 0.3s;
  border-bottom: 1px solid #eee;
  &:hover {
    transition: all 0.3s;
    background-color: rgba(99, 99, 99, 0.2);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px !important;
    cursor: pointer;
  }
}
</style>
