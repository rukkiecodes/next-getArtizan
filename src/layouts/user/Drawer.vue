<template>
  <v-navigation-drawer v-model="overview.drawer" class="pa-2">
    <template v-slot:prepend>
      <v-card class="py-10" flat>
        <v-card-text class="text-center">
          <v-avatar size="80" color="indigo">
            <v-icon v-if="!profile.user?.avatar">mdi-account</v-icon>
            <v-img v-else :src="profile.user?.avatar" cover />
          </v-avatar>
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
import { ref, onMounted } from 'vue'
import { useProfileStore } from '@/store/user/profile/profile';
import { useuserOverviewStore } from '@/store/user/overview'
import { useDisplay } from 'vuetify'

const profile = ref(useProfileStore())
const overview = ref(useuserOverviewStore())
const { name } = useDisplay()

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

onMounted(() => {
  drawerVisibility()
})

const drawerVisibility = () => {
  switch (name.value) {
    case 'xs': return overview.value.drawer = false
    case 'sm': return overview.value.drawer = false
    case 'md': return overview.value.drawer = false
    case 'lg': return overview.value.drawer = true
    case 'xl': return overview.value.drawer = true
    case 'xxl': return overview.value.drawer = true
  }
}
</script>