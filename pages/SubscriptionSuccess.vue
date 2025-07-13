<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();
const displayStore = useDisplayStore();
const { t, locales, setLocale } = useI18n();

useSeoMeta({
  title: `${t("SubscriptionSuccess.PageTitle")} | v1_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
  ogTitle: `${t("SubscriptionSuccess.PageTitle")} | v1_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
  robots: {
    noindex: true,
    nofollow: true
  }
})


// Redirect when trying to access a page only accessible when logged in
if (!authStore?.userToken){
  goToPath('/login')
}

const subscriptionOver = ref(!!authStore.user?.customerId);
const subscribed = ref(!!authStore.user?.customerId);
const route = useRoute();
const checkoutSessionId = route.query["sessionId"];

// If the user is already a customer skip the subscription process
if (!subscribed.value) {
  if (checkoutSessionId) {
    const { data, error } = await useFetch(
      `/api/checkoutsessions/${checkoutSessionId}`,
      {
        headers: { Authorization: `Bearer ${authStore.userToken}` },
      }
    );

    if (data.value) {
      // Refetch User
      await authStore.fetchUser();
      subscriptionOver.value = true;
      subscribed.value = true;
    }

    if (error.value) {
      subscriptionOver.value = true;
      errorStore.setError({ title: "Error", text: error.value.message });
    }
  } else {
    subscriptionOver.value = true;
    subscribed.value = false;
  }
}
</script>

<template>
  <v-container fluid class="subscription-landing-container">
    <!-- Loading Spinner -->
    <v-progress-circular
      v-if="!subscriptionOver"
      indeterminate
      color="primary"
      size="70"
    ></v-progress-circular>

    <!-- Subscription Confirmation -->
    <v-card v-if="subscribed" class="subscription-card" elevation="4">
      <v-card-title class="headline text-center">
        <v-icon large color="green" class="mr-3">mdi-check-circle</v-icon>
        {{ $t('SubscriptionSuccess.subscribed') }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="text-center">
          {{ $t('SubscriptionSuccess.thankYou') }} <strong>Libtune Premium</strong>.
        </p>
        <p class="text-left">
          {{ $t('SubscriptionSuccess.nowUnlimitedAccess') }}
          <strong> {{ $t('SignUp.100PrctRoyaltyFree') }} </strong>
        </p>
        <br />
        <p class="text-left">
          <strong>{{ $t('SignUp.nextSteps') }}:</strong>
        </p>
        <ul class="subscription-steps">
          <li>{{ $t('SubscriptionSuccess.subscriptionSteps.1') }}</li>
          <li>{{ $t('SubscriptionSuccess.subscriptionSteps.2') }}</li>
          <li>{{ $t('SubscriptionSuccess.subscriptionSteps.3') }}</li>
        </ul>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" variant="elevated" large @click="goToPath('/browse')">
          {{ $t('SubscriptionSuccess.browse') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.subscription-landing-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
  text-align: center;
}

.subscription-card {
  max-width: 600px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
}

.subscription-steps {
  text-align: left;
  padding: 0 20px;
  list-style-type: disc;
  margin-top: 10px;
}

.subscription-steps li {
  margin-bottom: 8px;
}

.error-message {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
  font-size: 16px;
}
</style>