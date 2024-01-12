<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import Notification from "@/components/Notification.vue";

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

onMounted(() => {
  getNotifications();
});

watch(userName, () => getNotificationsForUser());
</script>

<template>
  <main>
    <h1>MERCURE DEMO</h1>
    <div class="grid-container">
      <div class="grid-child">
        <h2>Global notifications</h2>
        <Notification v-for="(notification,i) in notifications" :notification="notification" :index="i" v-bind:key="notification"></Notification>
      </div>

      <div class="grid-child">
        <div>
          <h2>Notification for user {{ userName }}</h2>
          <v-text-field
            v-model="userName"
            variant="outlined"
            color="white"
            clearable
          >
          </v-text-field>
        </div>
        <hr />
        <Notification v-for="(uNotification,i) in usersNotifications" :notification="uNotification" :index="i" v-bind:key="uNotification"></Notification>
    </div>
  </main>
</template>
