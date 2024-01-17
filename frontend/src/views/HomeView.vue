<script setup>
import {defineAsyncComponent, onMounted, reactive, ref} from "vue";
import { BooksWs  } from '@/repositories/api/BooksWs'

const booksRef = reactive([]);
const isModalOpen = ref(false);
const titleModal = ref('');
const formBook = ref({
  title: '',
  author: '',
  img: '',
  stock: 0,
  price: 0
});

const BookItem = defineAsyncComponent(() => import('@/components/BookItem.vue'))
const Modal = defineAsyncComponent(() => import('@/components/Modal.vue'));


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
};

const handleModalForm = (submitData) => {
  formBook.value = submitData;
}

/**
 * Modal
 */
const openAddModal = () => {
  titleModal.value = 'Add new book';
  isModalOpen.value = true;
  formBook.value = {
    title: '',
    author: '',
    img: '',
    stock: 0,
    price: 0
  };
}

const openEditModal = (book) => {
  titleModal.value = `Edit book '${book.title}'`;
  isModalOpen.value = true;
  formBook.value = book;
}

const closeModal = () => {
  isModalOpen.value = false;
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
  <div>
    <h2>List books</h2>
    <v-spacer></v-spacer>
    <v-btn
      size="large"
      color="green"
      class="mr-5 mt-5"
      text-align="center"
      @click="openAddModal"
    > Add book </v-btn>
  </div>

  <BookItem
    v-for="book in booksRef"
    v-bind:key="book"
    :book="book"
    @click-edit-book="openEditModal(book)"
    @click-delete-book="deleteBooks(book.uuid)"
  ></BookItem>

  <Modal
    :title="titleModal"
    :isOpen="isModalOpen"
    :formData="formBook"
    @submit-form="handleModalForm"
    @close-modal="closeModal"
  ></Modal>
</template>
