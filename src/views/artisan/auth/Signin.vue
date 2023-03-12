<template>
  <v-sheet height="100vh" class="d-flex align-center auth">
    <div class="splat"></div>
    <img src="./assets/images/takeOff.svg" class="takeOffCOntainer" />
    <img class="cash" src="./assets/images/cash.svg" alt="" />
    <img class="hand" src="./assets/images/hand.svg" alt="" />
    <img class="check" src="./assets/images/check.svg" alt="" />
    <v-container class="mainSection d-flex justify-space-between">
      <v-card width="400" max-width="100%" flat color="transparent">
        <p class="text-h4 font-weight-bold text-grey-darken-4">
          Sign in to get get discoverd
        </p>
        <span class="text-body-1 font-weight-regular text-grey-darken-4">
          If you Don't have an account You can
          <router-link to="/artisan" class="text-decoration-none text-indigo-accent-4 font-weight-bold">Sign Up
            here</router-link></span>
      </v-card>
      <v-card elevation="0" width="400" max-width="100%" class="rounded-xl glass mt-10 mt-md-0">
        <v-card-text>
          <v-form>
            <v-text-field v-model="signin.email" label="Email" type="email" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-at" />
            <v-text-field v-model="signin.password" label="Password" type="password" variant="plain" density="comfortable"
              prepend-inner-icon="mdi-lock-outline" />

            <v-btn @click="signin.signinUser" :loading="signin.loading" color="indigo-accent-4" class="rounded-lg" block>
              Sign In
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { useSigninStore } from "@/store/artisan/auth/signin";

const signin = ref(useSigninStore());
</script>

<style scoped>
@import "./assets/style.css";
</style>