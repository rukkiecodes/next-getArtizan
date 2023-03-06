<template>
  <v-container>
    <v-card flat color="transparent">
      <v-card-text class="text-center">
        <v-avatar color="indigo" size="80">
          <v-img
            v-if="profile.user?.avatar"
            :src="profile.user?.avatar"
            cover
          />
          <v-icon v-else size="30">mdi-account</v-icon>
        </v-avatar>
      </v-card-text>
    </v-card>
  </v-container>

  <v-navigation-drawer
    location="right"
    width="350"
    border="0"
    color="indigo-lighten-5"
  >
    <v-card class="ma-4 rounded-lg" elevation="5">
      <v-card-title class="text-grey-darken-4 text-body-1"
        >Edit your profile</v-card-title
      >
      <v-card-text class="text-center my-4">
        <v-avatar @click="clickOnInput" color="indigo" size="80">
          <v-img
            v-if="profile.user?.avatar"
            :src="profile.user?.avatar"
            cover
          />
          <v-icon v-else size="30">mdi-account</v-icon>
        </v-avatar>
      </v-card-text>
      <input
        type="file"
        id="avatarInput"
        style="display: none"
        @change="setAvatar"
      />

      <v-card-text>
        <v-select
          label="Gender"
          :items="['Male', 'Female']"
          density="compact"
          variant="underlined"
          color="indigo-accent-4"
        />
        <v-text-field
          label="State of residence"
          density="compact"
          variant="underlined"
          color="indigo-accent-4"
        />
        <v-text-field
          label="Local government of residence"
          density="compact"
          variant="underlined"
          color="indigo-accent-4"
        />
        <v-text-field
          label="Area Of specialisation"
          density="compact"
          variant="underlined"
          color="indigo-accent-4"
        />

        <v-card-subtitle class="mb-2 mt-5 pl-0"
          >Guarantor Details</v-card-subtitle
        >

        <v-text-field
          label="Name"
          density="compact"
          variant="underlined"
          color="indigo-accent-4"
        />
        <v-text-field
          label="Phone number"
          density="compact"
          variant="underlined"
          color="indigo-accent-4"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn class="bg-indigo" block>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useProfileStore } from "@/store/profile/profile";

const profile = ref(useProfileStore());

const clickOnInput = () => {
  document.querySelector("#avatarInput").click();
};

// console.log({...profile.value.updateAvatar()})

profile.value.updateAvatar();

const setAvatar = (e) => {
  profile.value.file = e;
  profile.value.updateAvatar();
  // profile.updateAvatar()
};
</script>
