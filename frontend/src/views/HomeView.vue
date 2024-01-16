<script setup>
import {defineAsyncComponent, onMounted, reactive, ref} from "vue";

const NotificationItem = defineAsyncComponent(() => import('@/components/NotificationItem.vue'));

const urlMercure = ref(process.env.VUE_APP_MERCURE_PUBLIC_URL);
const notifications = reactive([]);

const getNotifications = () => {
  const url = new URL(`${urlMercure.value}/.well-known/mercure`);
  url.searchParams.append('topic', 'https://localhost/books');

  const eventSource = new EventSource(url.toString(), {withCredentials: true});
  eventSource.onmessage = (e) => {
    const response = JSON.parse(e.data);
    notifications.push(response);
  }
}

const deleteItem = (index) => notifications.splice(index, 1);

onMounted(() => {
  getNotifications();
} );
</script>

<template>
  <h1>MERCURE DEMO</h1>

  <div class="grid-container">
    <div class="grid-child">
      <h2>Global notifications</h2>
      <NotificationItem
          v-for="(notification,i) in notifications"
          :notification="notification"
          v-bind:key="notification"
          @click-remove="deleteItem(i)"
      ></NotificationItem>
    </div>
  </div>
</template>
