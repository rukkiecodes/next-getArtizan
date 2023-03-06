<template>
  <v-navigation-drawer class="pa-2">
    <v-list nav class="px-2">
      <v-list-item
        v-for="(route, i) in routes"
        :key="i"
        :to="route.to"
        class="rounded-lg mb-2"
        active-color="indigo-accent-4"
      >
        <template v-slot:prepend>
          <v-icon :icon="route.icon"></v-icon>
        </template>
        <v-list-item-title class="text-body-2">{{
          route.title
        }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const routes = [
  {
    title: "Overview",
    icon: "mdi-view-dashboard",
    to: "/dashboard/overview",
  },
  {
    title: "Bookings",
    icon: "mdi-calendar",
    to: "/dashboard/bookings",
  },
  {
    title: "Profile",
    icon: "mdi-account",
    to: "/dashboard/profile",
  },
];
</script>