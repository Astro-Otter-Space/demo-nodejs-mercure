<script setup>
import { onMounted, reactive} from "vue";
import { BooksWs  } from '@/repositories/api/BooksWs'
const booksRef = reactive([]);

const getBooks = async () => {
  try {
    booksRef.value = await BooksWs.getBooks();
  } catch (e) {
    console.log(e.message)
  }
}

onMounted(() => getBooks())

</script>

<template>
  <h1>MERCURE DEMO</h1>

  <div class="grid-container">
    <div class="grid-child">
      <h2>List books</h2>

      <div v-for="book in booksRef" v-bind:key="book">
        <p>{{ book.uuid }}</p>
        <p>{{ book.title }}</p>
        <p>{{ book.author }}</p>
      </div>
    </div>
  </div>
</template>
