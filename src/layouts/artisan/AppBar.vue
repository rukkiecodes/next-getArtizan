<template>
  <v-app-bar order="1" flat color="indigo-lighten-5">
    <v-app-bar-title>
      <v-img src="@/assets/logo.png" width="120" />
    </v-app-bar-title>
    <v-spacer />

    <v-chip v-if="profile.user" to="/artisanDashboard/profile" class="pl-1 mr--sn-2" variant="outlined" color="indigo-darken-4">
      <v-avatar class="mr-1">
        <v-img v-if="profile.user?.avatar" :src="profile.user?.avatar" cover />
        <v-icon v-else color="grey-indigo-4">mdi-account</v-icon>
      </v-avatar>
      <span class="text-grey-indigo-4 text-caption font-weight-bold">{{
        profile.user?.name
      }}</span>
    </v-chip>

    <v-btn @click="overview.drawer = true" class="hidden-lg-and-up" icon>
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useProfileStore } from "@/store/artisan/profile/profile";
import { useArtizanOverviewStore } from "@/store/artisan/overview/overview";

const profile = useProfileStore();
const overview = useArtizanOverviewStore();
</script>