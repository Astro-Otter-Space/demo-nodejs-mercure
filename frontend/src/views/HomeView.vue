<script setup>
import { onMounted, reactive, ref} from "vue";

const urlMercure = ref(process.env.VUE_APP_MERCURE_PUBLIC_URL);
const notifications = reactive([]);

const getNotifications = () => {
  const url = new URL(`${urlMercure.value}`);
  url.searchParams.append('topic', 'https://localhost/books');

  const eventSource = new EventSource(url.toString(), {withCredentials: true});
  eventSource.onmessage = (e) => {
    const response = JSON.parse(e.data);
    notifications.push(response);
  }
}

onMounted(() => {
  getNotifications();
} );
</script>

<template>
  <h1>MERCURE DEMO</h1>

  <div class="grid-container">
    <div class="grid-child">
      <h2>List books</h2>
    </div>
  </div>
</template>
