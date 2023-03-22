<template>
  <v-container>
    <v-card-subtitle>Booking staus</v-card-subtitle>
    <v-card class="mt-5 rounded-xl" flat>
      <v-card-text>
        <v-row justify="space-between">
          <v-col cols="12" sm="4">
            <v-card class="d-flex justify-center" color="transparent" flat>
              <v-progress-circular :model-value="overview.pendingCount" size="150" width="15" color="amber">
                <div class="d-flex flex-column align-center">
                  <p class="text-body-1 text-center text-amber-darken-3">Pending</p>
                  <span class="font-weight-bold text-h5 text-amber-darken-3">{{ overview.pendingCount }}</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="d-flex justify-center" color="transparent" flat>
              <v-progress-circular :model-value="overview.approvedCount" size="150" width="15" color="indigo">
                <div class="d-flex flex-column align-center">
                  <p class="text-body-1 text-center text-indigo-darken-3">Approved</p>
                  <span class="font-weight-bold text-h5 text-indigo-darken-3">{{ overview.approvedCount }}</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card class="d-flex justify-center" color="transparent" flat>
              <v-progress-circular :model-value="overview.completedCount" size="150" width="15" color="green">
                <div class="d-flex flex-column align-center">
                  <p class="text-body-1 text-center text-green-darken-3">Completed</p>
                  <span class="font-weight-bold text-h5 text-green-darken-3">{{ overview.completedCount }}</span>
                </div>
              </v-progress-circular>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card-subtitle class="mt-10 mb-5">Booking History</v-card-subtitle>
    <v-table class="rounded-xl">
      <thead>
        <tr>
          <th class="text-left"> Title </th>
          <th class="text-left"> Status </th>
          <th class="text-left"> Budget </th>
          <th class="text-left"> Category </th>
          <th class="text-left"> Location </th>
          <th class="text-left"> Date </th>
          <th class="text-left"> Time </th>
          <th class="text-left"> Created on </th>
        </tr>
      </thead>
      <tbody>
        <v-hover v-for="booking in booking.bookings.slice(0, 50)" :key="booking.id">
          <template v-slot:default="{ isHovering, props }">
            <tr @click="setActiveDialog(booking)" v-bind="props" :class="isHovering ? 'bg-indigo-lighten-5' : undefined"
              style="cursor: pointer;">
              <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.title }}</td>
              <td>
                <v-chip
                  :color="booking?.status === 'pending' ? 'amber' : booking?.status === 'approved' ? 'indigo' : 'green'">
                  <span class="font-weight-bold text-caption">{{ booking?.status }}</span>
                </v-chip>
              </td>
              <td class="text-grey-darken-2 text-caption font-weight-bold">{{
                (booking?.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</td>
              <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.category }}</td>
              <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.location }}</td>
              <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.date }}</td>
              <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.time }}</td>
              <td class="text-grey-darken-2 text-caption font-weight-bold">{{ booking?.createdAt?.toDate().toDateString()
              }}
              </td>
            </tr>
          </template>
        </v-hover>
      </tbody>
    </v-table>
  </v-container>

  <v-dialog v-model="activeDialog.dialog" width="350" scrollable>
    <v-card>
      <v-toolbar density="compact" color="transparent">
        <v-spacer />
        <v-btn @click="activeDialog.dialog = false" icon size="small">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text style="max-height: 600px;" class="pa-0 ma-0">
        <v-card-text class="text-center">
          <v-avatar size="150">
            <v-img
              :src="activeDialog.photo != null ? activeDialog.photo : 'https://res.cloudinary.com/rukkiecodes/image/upload/v1678145143/takeOff_p3xuej.svg'"
              cover />
          </v-avatar>
        </v-card-text>
        <v-card-title>{{ activeDialog?.title }}</v-card-title>
        <v-card-text class="d-flex justify-space-between">
          <v-chip
            :color="activeDialog?.status == 'pending' ? 'amber' : activeDialog?.status == 'approved' ? 'indigo' : 'green'">
            <span class="font-weight-bold"
              :class="activeDialog?.status == 'pending' ? 'text-amber-darken-2' : activeDialog?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                activeDialog?.status }}</span>
          </v-chip>
          <v-chip
            :color="activeDialog?.status == 'pending' ? 'amber' : activeDialog?.status == 'approved' ? 'indigo' : 'green'">
            <v-icon
              :color="activeDialog?.status == 'pending' ? 'amber-darken-2' : activeDialog?.status == 'approved' ? 'indigo-darken-2' : 'green-darken-2'"
              class="mr-1">mdi-hand-coin</v-icon>
            <span class="font-weight-bold"
              :class="activeDialog?.status == 'pending' ? 'text-amber-darken-2' : activeDialog?.status == 'approved' ? 'text-indigo-darken-2' : 'text-green-darken-2'">{{
                activeDialog?.budget }}</span>
          </v-chip>
        </v-card-text>
        <v-card-text class="px-1">
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Category</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.category
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Location</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.location
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Date</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.date
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Time</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{ activeDialog?.time
            }}</v-list-item-title>
          </v-list-item>
          <v-list-item density="compact">
            <v-list-item-subtitle class="text-caption">Created on</v-list-item-subtitle>
            <v-list-item-title class="text-grey-darken-4 text-body-2 font-weight-bold">{{
              activeDialog?.createdAt?.toDate().toDateString()
            }}</v-list-item-title>
          </v-list-item>
        </v-card-text>

        <v-card-subtitle class="text-caption">Description</v-card-subtitle>
        <v-card-text>
          <span class="text-grey-darken-4 text-body-1">
            {{ activeDialog?.description }}
          </span>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useuserOverviewStore } from "@/store/user/overview";
import { useGetBookingStore } from "@/store/user/booking/getBookings";
import { useArtizansStore } from '@/store/user/artizans'

const overview = ref(useuserOverviewStore());
const booking = ref(useGetBookingStore());
const artizan = ref(useArtizansStore())

const activeDialog = ref({
  dialog: false
})

const setActiveDialog = (dialog) => {
  activeDialog.value = {
    dialog: true,
    ...dialog
  }
}
</script>
