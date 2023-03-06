<template>
  <v-sheet height="100%" color="transparent" class="d-flex align-center">
    <v-container
      :class="bookings.bookings.length <= 0 ? 'd-flex justify-center' : ''"
    >
      <div
        v-if="bookings.bookings.length <= 0"
        class="d-flex flex-column align-center"
      >
        <v-icon color="grey-darken-3" size="100">mdi-dropbox</v-icon>
        <p class="text-grey-darken-3 font-weight-bold">
          You dont have any bookings yet
        </p>
      </div>
    </v-container>
  </v-sheet>
  <v-btn
    position="fixed"
    location="bottom right"
    class="ma-5 bg-indigo rounded-xl"
    size="x-large"
  >
    <v-icon class="mr-3">mdi-plus</v-icon>
    Add Booking

    <v-dialog
      v-model="bookingsStore.dialog"
      activator="parent"
      width="420"
      persistent
    >
      <v-card>
        <v-toolbar color="transparent" density="compact">
          <v-toolbar-title>Add a new booking</v-toolbar-title>
          <v-spacer />
          <v-btn @click="bookingsStore.dialog = false" icon size="small">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="bookingsStore.title"
            label="Title"
            density="comfortable"
            variant="underlined"
            color="indigo"
          />
          <v-text-field
            v-model="bookingsStore.date"
            label="Date"
            density="comfortable"
            variant="underlined"
            color="indigo"
            type="date"
          />
          <v-text-field
            v-model="bookingsStore.time"
            label="Time"
            density="comfortable"
            variant="underlined"
            color="indigo"
            type="time"
          />
          <v-text-field
            v-model="bookingsStore.location"
            label="Location"
            density="comfortable"
            variant="underlined"
            color="indigo"
          />
          <v-text-field
            v-model="bookingsStore.budget"
            label="Budget"
            density="comfortable"
            variant="underlined"
            color="indigo"
          />
          <v-select
            v-model="bookingsStore.category"
            :items="app.categories"
            label="Category"
            density="comfortable"
            variant="underlined"
            color="indigo"
          />
          <v-text-field
            v-model="bookingsStore.jobAddress"
            label="Job Address"
            density="comfortable"
            variant="underlined"
            color="indigo"
          />
          <v-textarea
            v-model="bookingsStore.description"
            label="Description"
            density="comfortable"
            variant="underlined"
            color="indigo"
            rows="1"
            auto-grow
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="bookingsStore.addBooking"
            :loading="bookingsStore.loading"
            class="bg-indigo"
            block
            >Add booking</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup>
import { useGetBookingStore } from "@/store/user/booking/getBookings";
import { useAddBookingStore } from "@/store/user/booking/addBooking";
import { useAppStore } from "@/store/app";
import { ref } from "vue";

const bookings = ref(useGetBookingStore());
const bookingsStore = ref(useAddBookingStore());
const app = ref(useAppStore());
</script>
