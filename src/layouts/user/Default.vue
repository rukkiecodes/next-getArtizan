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
import { useProfileStore } from "@/store/user/profile/profile";
import { useGetBookingStore } from "@/store/user/booking/getBookings";
import { useuserOverviewStore } from "@/store/user/overview";
import { onMounted, ref } from "vue";

const profile = ref(useProfileStore());
const booking = useGetBookingStore();
const count = useuserOverviewStore();

onMounted(() => {
  profile.value.getProfile();
  booking.getBookings()
  count.countPendingStates();
  count.countApprovedStates();
  count.countCompletedStates();
});
</script>
