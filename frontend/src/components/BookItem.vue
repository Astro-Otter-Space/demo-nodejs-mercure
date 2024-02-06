<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-card
      class="mx-auto"
      max-width="400"
      :elevation="isHovering ? 10 : 1"
      v-bind="props"
    >
      <v-img
        :src="book.img"
        height="200px"
        cover
      ></v-img>
      <v-card-title>
        {{ book.title }}
      </v-card-title>
      <v-card-subtitle>
        {{ book.author }}
      </v-card-subtitle>
      <v-divider class="mx-4 mb-1"></v-divider>
      <div class="px-4">
        <div class="d-flex ga-2 mt-2">
          <v-chip
            variant="outlined"
            color="orange"
          >
            {{ book.price }} &euro;
          </v-chip>
          <v-chip
            variant="outlined"
            color="purple"
          >
            Stock: {{ book.stock }}
          </v-chip>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          size="small"
          icon="mdi-cart-plus"
          color="yellow"
          :disabled="isDisable"
          title="Buy one"
        >
        </v-btn>

        <v-btn
          size="small"
          icon="mdi-book-edit"
          color="blue"
          @click="clickEditBook"
          title="Edit book"
          aria-label="Edit book"
        >
        </v-btn>

        <v-btn
          size="small"
          icon="mdi-delete-outline"
          @click="clickDeleteBook"
          color="red"
          title="Delete book"
          aria-label="Delete book"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script setup>
import {computed, toRefs} from "vue";

const props = defineProps({
  book: {
    type: Object,
    default: null
  }
});

const { book } = toRefs(props);
const isDisable = computed(() => 0 === book.value.stock )
const emit = defineEmits(['click-edit-book' ,'click-delete-book']);
const clickEditBook = () => emit('click-edit-book');
const clickDeleteBook = () => emit('click-delete-book');

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
