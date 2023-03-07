<template>
    <v-card flat color="transparent" width="400" max-width="100%" class="mx-auto">
        <v-card-text class="text-center">
            <v-avatar color="indigo" size="80">
                <v-img v-if="profile?.avatar" :src="profile?.avatar" cover>
                    <v-dialog v-model="photoDialog" activator="parent" width="700">
                        <v-card>
                            <v-toolbar floating density="compact" color="transparent">
                                <v-spacer />
                                <v-btn color="grey-darken-3" @click="photoDialog = false" icon size="small">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-toolbar>
                            <v-img :src="profile?.avatar" cover />
                        </v-card>
                    </v-dialog>
                </v-img>
                <v-icon v-else size="30">mdi-account</v-icon>
            </v-avatar>
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-title class="text-h5 text-grey-darken-4">
                {{ profile?.name }}
            </v-card-title>
            <v-card-subtitle class="text-body-2 text-grey-darken-4">
                <a :href="`mailto://${profile?.email}`" class="text-grey-darken-3">{{ profile?.email }}</a>
            </v-card-subtitle>
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-subtitle class="px-0 text-caption">Gender</v-card-subtitle>
            {{ profile?.gender }}
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-subtitle class="px-0 text-caption">State Of Residence</v-card-subtitle>
            {{ profile?.stateOfResidence }}
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-subtitle class="px-0 text-caption">Local Government Area</v-card-subtitle>
            {{ profile?.LGA }}
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-subtitle class="px-0 text-caption">Phone</v-card-subtitle>
            <a :href="`tel://${profile?.phone}`" class="text-grey-darken-3">{{ profile?.phone }}</a>
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-subtitle class="px-0 text-caption">Guarantor Name</v-card-subtitle>
            {{ profile?.guarantorName }}
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-subtitle class="px-0 text-caption">Guarantor Phone</v-card-subtitle>
            {{ profile?.guarantorPhone }}
        </v-card-text>
        <v-card-text class="text-center">
            <v-card-subtitle class="px-0 text-caption">Guarantor Address</v-card-subtitle>
            {{ profile?.guarantorAddress }}
        </v-card-text>

        <v-card-actions>
            <v-btn block @click="drawer = true" class="ma-4 text-caption rounded-lg bg-indigo mx-auto hidden-lg-and-up">
                Edit Profile
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { db } from '@/plugins/firebase';
import { doc, getDoc } from '@firebase/firestore';
import { onMounted, ref } from 'vue';

const profile = ref(null)
const photoDialog = ref(null)

const props = defineProps({
    user: {
        type: Object,
        required: true
    }
})

onMounted(async () => {
    const user = await getDoc(doc(db, "user", props.user.customer))

    profile.value = user.data()
})
</script>