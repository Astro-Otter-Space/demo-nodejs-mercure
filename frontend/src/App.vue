<script setup>
import { RouterView } from 'vue-router'
import {defineAsyncComponent, provide, shallowRef} from "vue";

import router from "@/router";
import {layouts} from "@/layout";

const layout = shallowRef('div');
const Notifications = defineAsyncComponent(() => import('@/components/Notifications.vue'));
router.afterEach((to) => {
  layout.value = layouts[`${to.meta.layout}`]
});
provide('app:layout', layout);
</script>

<template>
  <Notifications />
  <v-app>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<style lang="scss">
</style>
