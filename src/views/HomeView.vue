<script setup>
import {defineAsyncComponent, onMounted, reactive, ref, watch} from "vue";
const NotificationItem = defineAsyncComponent(() => import('@/components/NotificationItem.vue'));

const urlMercure = ref('https://mercure.astro-otter.space/.well-known/mercure');

const userName = ref(null);
const notifications = reactive([]);
const usersNotifications = reactive([]);

const getNotifications = () => {
  const url = new URL(urlMercure.value);
  url.searchParams.append('topic', 'demo');

  const eventSource = new EventSource(url.toString(), {withCredentials: true});
  eventSource.onmessage = (e) => {
    const response = JSON.parse(e.data);
    notifications.push(response);
  }
}

const getNotificationsForUser = () => {
  usersNotifications.length = 0;
  const urlByUser = new URL(urlMercure.value);
  urlByUser.searchParams.append('topic', `demo-user/${userName.value}`);

  const eventSource = new EventSource(urlByUser.toString(), { withCredentials: true});
  eventSource.onmessage = (e) => {
    const response = JSON.parse(e.data);
    usersNotifications.push(response);
  }
};

const deleteItem = (index) => notifications.splice(index, 1);
const deleteUserItem = (index) => usersNotifications.splice(index, 1);

onMounted(() => getNotifications());
watch(userName, () => getNotificationsForUser());


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

    <div class="grid-child">
      <div>
        <h2>Notification for user {{ userName }}</h2>
        <input type="text"
          v-model="userName"
          variant="outlined"
          color="white"
          clearable
        />
      </div>
      <hr />
      <NotificationItem
          v-for="(uNotification,i) in usersNotifications"
          :notification="uNotification"
          v-bind:key="uNotification"
          @click-remove="deleteUserItem(i)"
      ></NotificationItem>
    </div>
  </div>
</template>