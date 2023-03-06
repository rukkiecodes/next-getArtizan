<template>
  <v-app>
    <AppBar />
    <Drawer />

    <v-main class="bg-indigo-lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import AppBar from "./AppBar.vue";
import Drawer from "./Drawer.vue";
import { useProfileStore } from "@/store/profile/profile";
import { onMounted } from "vue";

const profile = useProfileStore();

onMounted(() => {
  profile.getProfile();
});
</script>
