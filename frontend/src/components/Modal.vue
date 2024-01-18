<script setup>
import {reactive, toRefs, watch} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  bookData: {
    type: Object,
    default: null
  }
});
const { title, isOpen, bookData } = toRefs(props);
const stateBook = reactive(bookData);
watch(() => bookData, (newBookData) => {
  stateBook.value = newBookData;
})

const emit = defineEmits(['submit-form', 'close-modal']);
const handleSubmitForm = async () => emit('submit-form', stateBook.value /*{...stateBook}*/);

const closeModal = () => emit('close-modal');
</script>

<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay">
      <v-form class="form" @submit.prevent="handleSubmitForm">
        <v-card class="ma-5" elevation="10" width="500">
          <v-card-title class="text-center text-h5 ">
            <span class="text-h5">{{ title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    required
                    rounded
                    clearable
                    variant="outlined"
                    v-model="stateBook.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Author"
                    type="text"
                    required
                    rounded
                    clearable
                    variant="outlined"
                    v-model="stateBook.author"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Image path"
                    required
                    rounded
                    clearable
                    variant="outlined"
                    v-model="stateBook.img"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Stock"
                    type="number"
                    min="0"
                    required
                    rounded
                    clearable
                    variant="outlined"
                    v-model="stateBook.stock"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Price"
                    type="number"
                    min="0"
                    required
                    rounded
                    clearable
                    variant="outlined"
                    prefix="€"
                    v-model="stateBook.price"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="closeModal"
            >
              Close
            </v-btn>
            <v-btn
              color="blue-darken-1"
              variant="text"
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
