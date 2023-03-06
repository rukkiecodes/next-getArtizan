<template>
  <v-container>
    <v-card flat color="transparent">
      <v-card-subtitle>Booking staus</v-card-subtitle>
      <v-row justify="space-between">
        <v-col v-for="(booking, i) in bookings" :key="i" cols="12" sm="4">
          <v-card
            class="rounded-lg"
            :color="
              booking.status == 'pending'
                ? 'amber'
                : booking.status == 'approved'
                ? 'indigo'
                : 'green'
            "
            flat
          >
            <v-toolbar density="compact" color="transparent">
              <v-toolbar-title class="text-white font-weight-bold">{{
                booking.title
              }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text
              class="text-white font-weight-bold text-right text-caption"
              >You currently have {{ booking.count }}
              {{ booking.status }} bookings</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
      <v-card-subtitle class="mt-10">Booking history</v-card-subtitle>
      <v-row justify="space-between">
        <v-col v-for="(booking, i) in bookingHistory" :key="i" cols="12" sm="4">
          <v-card class="rounded-lg" color="white" flat>
            <v-toolbar density="compact" color="transparent">
              <v-toolbar-title class="text-grey-darken-4 font-weight-bold">{{
                booking.title
              }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text
              class="text-grey-darken-4 font-weight-bold text-right text-caption"
              >You currently have {{ booking.count }}
              {{ booking.status }} bookings</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const bookings = ref([
  {
    status: "pending",
    title: "Pending",
    count: 5,
    id: 1,
  },
  {
    status: "approved",
    title: "Approved",
    count: 5,
    id: 2,
  },
  {
    status: "completed",
    title: "Completed",
    count: 5,
    id: 3,
  },
]);

const bookingHistory = ref([
  {
    status: "pending",
    title: "Pending",
    count: 5,
    id: 1,
  },
  {
    status: "approved",
    title: "Approved",
    count: 5,
    id: 2,
  },
  {
    status: "completed",
    title: "Completed",
    count: 5,
    id: 3,
  },
]);
</script>
