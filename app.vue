<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();
const route = useRoute()
const displayStore = useDisplayStore()
const landingDialog = ref(displayStore.getLandingDialog())
const email = ref('')
const isFormValid = ref(false)
const formRef = ref(null);
const leadLoading = ref(false);
const leadSuccess = ref(false);
const { locale } = useI18n();

useSeoMeta({
  ogSiteName: "Libtune"
});

// Fetch user on load
if (authStore.userToken) {
  try {
    await authStore.fetchUser();
  } catch (e) {
    errorStore.setError({
      title: "Could not fetch user",
      text: e.message,
    });
  }
}

const submitForm = async () => {
  if (formRef.value && formRef.value.validate()) {
    leadLoading.value = true
    try {
      await authStore.postLead(email.value, locale.value);
      leadSuccess.value = true
      displayStore.setLandingDialog(false)

    } catch (e) {
      errorStore.setError({title: "Lead Error:", text: e.message})
    }
    leadLoading.value= false
  }
}
</script>


<template>
  <v-app>
    <AppBar> </AppBar>
    <v-main :class="route.path.includes('landing') ? 'landing' : 'classic'">
      <!-- Error dialog -->
      <v-dialog v-model="errorStore.error" max-width="500">
        <v-card>
          <v-alert
            :title="errorStore.error.title"
            :text="errorStore.error.text"
            type="error"
          >
          </v-alert>
        </v-card>
      </v-dialog>
    <!-- Landing Dialog -->
    <v-dialog v-model="landingDialog" max-width="500px">
      <v-card>
        <v-card-title style="text-align: center; font-weight: bold;" class="font-inter"> 🎁 {{ $t('app.FreeMusicPackage') }} 🎁 </v-card-title>
        <v-card-text v-if="!leadSuccess" style="display: flex; flex-direction: column; gap: 10px">
          <p class="text-justify font-inter">
            {{ $t('app.GetFreeBundle') }}
          </p>

          <v-form
          v-model="isFormValid"
          ref="formRef"
          lazy-validation
        >
          <v-text-field
            v-model="email"
            :label="$t('SignUp.email')"
            variant="outlined"
            :rules="[validationRules.required, validationRules.email, validationRules.safe, validationRules.max(60)]"
            dense
            class="mt-4"
          ></v-text-field>
          <v-btn
            :disabled="!isFormValid"
            @click="submitForm"
            :color="!isFormValid ? 'grey' : 'primary'"
            block
            size="large"
            class="text-capitalize font-inter"
            :loading="leadLoading"
          >
          {{ $t('app.GetFreeSongs') }}
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-text v-else  style="display: flex; justify-content: center;">
        <v-icon large color="green" class="mr-3">mdi-check-circle</v-icon>
        <p class="font-inter font-weight-medium">
          {{ $t('app.RequestSent') }}
        </p>
          
      </v-card-text>
      </v-card>
    </v-dialog>
      <NuxtPage></NuxtPage>
    </v-main>
  </v-app>
</template>

<style>
.landing {
  background-color: #f1f0eb;
}

.classic {
  background-color: lightgrey;
}
.font-inter {
  font-family: Inter;
}
</style>