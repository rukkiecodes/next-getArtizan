<template>
    <v-container>
        <v-sheet height="50vh" class="d-flex align-center" color="transparent">
            <v-card flat color="transparent" width="700">
                <v-card-text class="font-weight-bold text-grey-darken-4 text-lg-h4" style="line-height: 1em;">
                    Looking For An Artisan in your Location?
                </v-card-text>
                <v-card-text class="text-grey-darken-4 text-body-2 font-weight-regular">
                    GetArtisan is a leading online platform to find and hire artisans globally. With thousands of qualified
                    and verified artisans, we connect you with the artisan that best fits your needs.
                </v-card-text>

                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-autocomplete :items="app.categories" v-model="artizan.specialisation" label="Find An Artizan"
                                density="comfortable" variant="underlined" />
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete :items="app.location" v-model="artizan.location" label="Location"
                                density="comfortable" variant="underlined" />
                        </v-col>
                    </v-row>
                    <v-btn @click="artizan.searchForArtizan" :loading="artizan.loading" color="indigo"
                        class="text-uppercase font-weight-bold rounded-lg" prepend-icon="mdi-magnify" flat>
                        Search
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-sheet>
        <v-row>
            <v-col cols="12" sm="6" md="3" v-for="artizan in artizan.artizans" :key="artizan.id">
                <v-card flat class="rounded-xl">
                    <v-card height="180" class="rounded-0" flat>
                        <v-img :src="artizan?.avatar" cover />
                    </v-card>

                    <v-card-title class="text-h6 text-grey-darken-3">{{ artizan?.name }}</v-card-title>
                    <v-card-subtitle class="text-caption text-grey-darken-2">specialisation</v-card-subtitle>
                    <v-card-text class="text-caption text-grey-darken-4 font-weight-bold py-0">{{ artizan?.specialisation
                    }}</v-card-text>
                    <v-card-subtitle class="text-caption text-grey-darken-2">Email</v-card-subtitle>
                    <v-card-text class="text-caption text-grey-darken-4 font-weight-bold py-0">{{ artizan?.email
                    }}</v-card-text>
                    <v-card-subtitle class="text-caption text-grey-darken-2">Phone</v-card-subtitle>
                    <v-card-text class="text-caption text-grey-darken-4 font-weight-bold py-0">{{ artizan?.phone
                    }}</v-card-text>
                    <v-card-text></v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { useArtizansStore } from '@/store/user/artizans'
import { ref } from 'vue'

const app = useAppStore();
const artizan = ref(useArtizansStore())
</script>
