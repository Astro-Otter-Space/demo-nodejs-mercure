<script setup>
import {defineAsyncComponent, onMounted, reactive, ref} from "vue";
import {BooksWs} from '@/repositories/api/BooksWs'
import {notification} from "@/services/notification";
import {toast} from "vuetify-sonner";
/**
 * Variables
 */
const booksRef = reactive([]);
const isModalOpen = ref(false);
const titleModal = ref('');
const isEditing = ref(false);
const bookData = ref({
  uuid: null,
  title: '',
  author: '',
  img: '',
  stock: 0,
  price: 0
})
/**
 * Components
 */
const BookItem = defineAsyncComponent(() => import('@/components/BookItem.vue'))
const Modal = defineAsyncComponent(() => import('@/components/Modal.vue'));

/**
 * Methods
 * @returns {Promise<void>}
 */
const getBooks = async () => {
  booksRef.length = 0;
  try {
    const { dataBooks, mercureUrl } = await BooksWs.getBooks();
    const eventSource = notification(mercureUrl, null);
    dataBooks.forEach(b => {
      const eventSourceBook = notification(mercureUrl, b.uuid);
      eventSourceBook.onmessage = () => {
        console.log('Detect change for ' + b.title)
      }
      booksRef.push(b)
    });

    eventSource.onmessage = (e) => {
      const result = JSON.parse(e.data);
      toast(result.message, {
        cardProps: {
          color: result.type
        },
        prependIcon: 'mdi-check-circle'
      });
    };

    eventSource.onerror = () =>  {
      console.log("An error occurred while attempting to connect to Mercure Hub.")
      eventSource.close();
    }
  } catch (e) {
    console.log(e.message)
  }
}

const deleteBooks = async (uuid) => {
  try {
    await BooksWs.deleteBook(uuid);
  } catch (e) {
    console.log(e.message)
  }
};

const handleModalForm = async (submittedData) => {
  bookData.value = submittedData;
  try {
    if (true === isEditing.value) {
      await BooksWs.putBook(bookData.value.uuid, JSON.stringify(bookData.value));
    } else {
      delete bookData.value.uuid;
      await BooksWs.postNewBook(JSON.stringify(bookData.value));
    }
  } catch (e) {
    console.log(e.message);
  }

  closeModal();
}

/**
 * Modal
 */
const openAddModal = () => {
  titleModal.value = 'Add new book';
  isModalOpen.value = true;
  bookData.value = {
    uuid: null,
    title: '',
    author: '',
    img: '',
    stock: 0,
    price: 0
  };
  isEditing.value = false;
}

const openEditModal = (book) => {
  titleModal.value = `Edit “${book.title}”`;
  isModalOpen.value = true;
  bookData.value = { ...book };
  isEditing.value = true;
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
  <div>
    <h1 class="text-h3">MERCURE DEMO - Bookstore</h1>
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
    :bookData="bookData"
    @submit-form="handleModalForm"
    @close-modal="closeModal"
  ></Modal>
</template>
