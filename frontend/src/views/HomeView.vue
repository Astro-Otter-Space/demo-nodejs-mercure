<script setup>
import {defineAsyncComponent, onMounted, reactive} from "vue";
import { BooksWs  } from '@/repositories/api/BooksWs'
const booksRef = reactive([]);

const BookItem = defineAsyncComponent(() => import('@/components/BookItem.vue'))

const getBooks = async () => {
  try {
    const wsBooks = await BooksWs.getBooks();
    wsBooks.forEach(b => booksRef.push(b));
  } catch (e) {
    console.log(e.message)
  }
}

onMounted(() => getBooks())

</script>

<template>
  <h1 class="text-align">MERCURE DEMO</h1>

  <h2>List books</h2>

  <BookItem
    v-for="book in booksRef"
    v-bind:key="book"
    :book="book"
  ></BookItem>

  <v-btn
    size="large"
    color="green"
    class="mr-5 mt-5"
    text-align="center"
  >Add book</v-btn>

</template>
