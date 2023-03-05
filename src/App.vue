<template>
  <router-view />

  <v-snackbar v-model="app.snackbar" :color="app.snackbarColor" location="top right">
    {{ app.snackbarText }}
  </v-snackbar>
</template>

<script setup>
import { ref } from "vue";
import { useAppStore } from "./store/app";

const app = ref(useAppStore());
</script>
