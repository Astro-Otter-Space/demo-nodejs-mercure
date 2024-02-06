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

    /**
     * Event source Add element
     * @type {EventSource}
     */
    const addEventSource = notification(mercureUrl, 'add');
    addEventSource.onmessage = (e) => {
      const result = JSON.parse(e.data);
      toast(result.message, {
        cardProps: {
          color: result.type
        },
        prependIcon: 'mdi-check-circle'
      });
      booksRef.push(result.book)
    };

    addEventSource.onerror = () =>  {
      console.error(`An error occurred while attempting to connect to Mercure Hub for topic "add"`)
      addEventSource.close();
    }

    const rmEventSource = notification(mercureUrl, 'delete');
    rmEventSource.onmessage = (e) => {
      const result = JSON.parse(e.data);
      toast(result.message, {
        cardProps: {
          color: result.type
        },
        prependIcon: 'mdi-check-circle'
      });
      const indexDeleteBook = booksRef.findIndex(item => item.uuid === result.book.uuid);
      booksRef.splice(indexDeleteBook, 1);
    };

    rmEventSource.onerror = () =>  {
      console.error(`An error occurred while attempting to connect to Mercure Hub for topic "delete"`)
      rmEventSource.close();
    }

    dataBooks.forEach(b => {
      const indexBook = dataBooks.findIndex(item => item.uuid === b.uuid);
      booksRef.push(b);

      const eventSourceBook = notification(mercureUrl, `edit/${b.uuid}`);
      // eventSourceBook.onopen= (e) => console.log(`Connexion established for ${b.title}`, e);
      eventSourceBook.onmessage = (e) => {
        const result = JSON.parse(e.data);
        if (-1 !== indexBook) {
          toast(result.message, {
            cardProps: {
              color: result.type
            },
            prependIcon: 'mdi-check-circle'
          });
          booksRef[indexBook] = result.book;
        }
      };
      eventSourceBook.onerror = () =>  eventSourceBook.close();
    });
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
onMounted(() => getBooks());

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

  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="book in booksRef"
        :key="book.title"
        :cols="4"
      >
        <BookItem
          v-bind:key="book"
          :book="book"
          @click-edit-book="openEditModal(book)"
          @click-delete-book="deleteBooks(book.uuid)"
        ></BookItem>
      </v-col>
    </v-row>
  </v-container>



  <Modal
    :title="titleModal"
    :isOpen="isModalOpen"
    :bookData="bookData"
    @submit-form="handleModalForm"
    @close-modal="closeModal"
  ></Modal>
</template>
