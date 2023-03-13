<template>
  <v-navigation-drawer class="pa-2">
    <template v-slot:prepend>
      <v-card class="py-10" flat>
        <v-card-text class="text-center">
          <v-avatar size="80" color="indigo">
            <v-icon v-if="!profile.user?.avatar">mdi-account</v-icon>
            <v-img v-else :src="profile.user?.avatar" cover />
          </v-avatar>
        </v-card-text>

        <v-card-text class="d-flex justify-center">
          <v-chip size="small" :color="profile.user?.tier == 'not verified' ? 'red' : ''" class="text-capitalize">{{
            profile.user?.tier }}</v-chip>
        </v-card-text>

        <v-card-title class="text-center text-grey-darken-4">{{ profile.user?.name }}</v-card-title>
        <v-card-subtitle class="text-center">{{ profile.user?.email }}</v-card-subtitle>
      </v-card>
    </template>

    <v-list nav class="px-2">
      <v-list-item v-for="(route, i) in routes" :key="i" :to="route.to" class="rounded-lg mb-2" active-color="indigo">
        <template v-slot:prepend>
          <v-icon :icon="route.icon"></v-icon>
        </template>
        <v-list-item-title class="text-body-2">{{
          route.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="profile.signoutUser" block class="bg-red-lighten-4 text-capitalize text-red"
          prepend-icon="mdi-logout-variant" flat>
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useProfileStore } from "@/store/artisan/profile/profile";

const profile = useProfileStore();

const routes = [
  {
    title: "Bookings",
    icon: "mdi-calendar",
    to: "/artisanDashboard/bookings",
  },
  {
    title: "Jobs",
    icon: "mdi-briefcase",
    to: "/artisanDashboard/jobs",
  },
  {
    title: "Profile",
    icon: "mdi-account",
    to: "/artisanDashboard/profile",
  },
];
</script>