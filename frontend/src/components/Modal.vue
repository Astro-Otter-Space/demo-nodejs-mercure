<script setup>
import { toRefs } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  isOpen: {
    type: Boolean,
    default: false
  },
  formData: {
    type: Object,
    default: null
  }
});

const { title, isOpen, formData } = toRefs(props);

const emit = defineEmits(['submit-form', 'close-modal']);
const submitForm = () => emit('submit-form', {...formData});

const closeModal = () => emit('close-modal')
</script>

<template>
  <transition name="modal-fade">
    <div v-if="isOpen" class="modal-overlay">

      <v-card class="ma-5" elevation="10" width="500">
        <v-card-title class="text-center text-h5 ">
          <span class="text-h5">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form class="form" @submit.prevent="submitForm">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    required
                    variant="outlined"
                    v-model="formData.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Author"
                    type="text"
                    required
                    variant="outlined"
                    v-model="formData.author"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Image path"
                    required
                    variant="outlined"
                    v-model="formData.img"
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
                    variant="outlined"
                    v-model="formData.stock"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Price"
                    type="number"
                    min="0"
                    required
                    variant="outlined"
                    prefix="€"
                    v-model="formData.price"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>

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
