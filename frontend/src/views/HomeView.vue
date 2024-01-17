<script setup>
import {defineAsyncComponent, onMounted, reactive} from "vue";
import { BooksWs  } from '@/repositories/api/BooksWs'

const booksRef = reactive([]);

const BookItem = defineAsyncComponent(() => import('@/components/BookItem.vue'))

/**
 * Methods
 * @returns {Promise<void>}
 */
const getBooks = async () => {
  booksRef.length = 0;
  try {
    const wsBooks = await BooksWs.getBooks();
    wsBooks.forEach(b => booksRef.push(b));
  } catch (e) {
    console.log(e.message)
  }
}

const deleteBooks = async (uuid) => {
  try {
    const wsBooks = await BooksWs.deleteBook(uuid);
    if (true === wsBooks) {
      console.log('todo: refresh list')
    }
  } catch (e) {
    console.log(e.message)
  }
}

/**
 * On MOUNT
 */
onMounted(() => getBooks())

/**
 * EMIT
 */

</script>

<template>
  <h1 class="text-align">MERCURE DEMO</h1>

  <h2>List books</h2>

  <BookItem
    v-for="book in booksRef"
    v-bind:key="book"
    :book="book"
    @click-delete-book="deleteBooks(book.uuid)"
  ></BookItem>

  <v-btn
    size="large"
    color="green"
    class="mr-5 mt-5"
    text-align="center"
  > Add book </v-btn>

</template>
