<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { onMounted } from "vue";

const app = useAppStore()

onMounted(() => {
  app.getCategories()
  app.getLocation()
})
</script>