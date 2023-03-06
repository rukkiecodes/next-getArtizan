<template>
  <v-app-bar order="1" flat color="indigo-lighten-5">
    <v-spacer />

    <v-chip class="bg-indigo-lighten-5 pl-1">
      <v-avatar class="mr-1">
        <v-img v-if="profile.user?.avatar" :src="profile.user?.avatar" cover />
        <v-icon v-else color="grey-darken-4">mdi-account</v-icon>
      </v-avatar>
      <span class="text-grey-darken-4 text-caption font-weight-bold">{{
        profile.user?.name
      }}</span>
    </v-chip>
  </v-app-bar>
</template>

<script setup>
import { useProfileStore } from "@/store/artisan/profile/profile";

const profile = useProfileStore();
</script>