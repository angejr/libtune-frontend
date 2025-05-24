<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore()
const config = useRuntimeConfig();
const STRAPI_URL = config.public.strapiUrl;
const stripeLoading = ref(false);
const displayStore = useDisplayStore();
const { t, locales, setLocale } = useI18n();

useSeoMeta({
  title: `${t('Subscribe.PageTitle')} | v1_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
  ogTitle: `${t('Subscribe.PageTitle')} | v1_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
  description: t("Subscribe.PageDescription"),
  ogDescription: t("Subscribe.PageDescription"),

})

async function goToStripe() {
  // for product Checkout
  try {
    stripeLoading.value = true;
    await SS_ProductCheckout(displayStore.countryPrice.priceId, STRAPI_URL, authStore.user.email);
  } catch (e) {
    errorStore.setError({ title: "Error", text: e.message });
    stripeLoading.value = false
  }
}

async function subscribe (){
  if(authStore?.userToken){
    await goToStripe();
    }
    else{
      displayStore.setSubscribeAfterSignUp(true)
      goToPath('/signup');
    }
}
</script>

<template>
  <v-container class="py-8" style="display: flex; justify-content: center">
    <v-card class="premium-plan-card" elevation="10" max-width="400">
      <v-card-title class="text-center text-h5 font-weight-bold">
        {{ $t("Landing.Subscription.plan") }}
        </v-card-title>
        <v-card-title class="text-center text-h6">
          <div style="display:flex; justify-content: center; gap:5px">
            <p class="text-decoration-line-through text-sm">
              {{ displayStore.countryPrice.priceOriginalValue}}/{{
                $t("Landing.Subscription.month")
              }}
            </p>
          </div>
          <div class="price" style="display: flex; align-items: baseline; justify-content: center; color:red"><h1>{{ displayStore.countryPrice.priceValue}}</h1><p style="font-size:x-small">/{{
                $t("Landing.Subscription.month")
              }}</p></div>
              <div v-if="displayStore.countryPrice.currency !== 'usd'" style="display: flex; align-items: center; justify-content: center; gap:5px">
                    <p class="font-inter" style="font-size: xx-small">{{$t("Subscribe.billedInDollars")}}</p>
                <div style="display: flex; align-items: baseline; justify-content: center">
                    <h6 style="font-weight: lighter;">$5.25</h6>
                    <p style="font-size:xx-small">/{{$t("Landing.Subscription.month")}}</p> 
              </div>
              </div>
          <p class="font-inter" style="font-size:xx-small">{{ $t("Landing.Subscription.billing") }}</p>
        </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list dense>
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon
              >{{ $t("Landing.Subscription.features.1") }}</v-list-item
            >
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon
              >{{ $t("Landing.Subscription.features.2") }}</v-list-item
            >
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon
              >{{ $t("Landing.Subscription.features.3") }}</v-list-item
            >
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon
              >{{ $t("Landing.Subscription.features.4") }}</v-list-item
            >
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-gift-outline"
                class="list-icon positive"
              ></v-icon
              >{{ $t("Landing.Subscription.features.5") }}</v-list-item
            >
          </v-list>
      </v-card-text>
      <v-card-actions class="mb-4" style="display: flex; justify-content: center">
        <v-btn
          v-if="!authStore?.user?.customerId"
          color="primary"
          variant="elevated"
          large
          :disabled="stripeLoading"
          :loading="stripeLoading"
          @click="subscribe"
          class="text-capitalize"
          style="font-family: Inter; width: 75%;">
          {{ $t("Landing.Subscription.subscribe") }}
        </v-btn>
        <h3 v-else>{{ $t("Landing.Subscription.alreadySubscribed") }}</h3>
      </v-card-actions>
      <v-divider></v-divider>
        <v-card-actions class="mt-4" style="display: flex; justify-content: center; flex-direction: column; gap:10px">
          <v-chip size="small" dense prepend-icon="mdi-lock">
            {{ $t("Landing.Subscription.secured") }}
            </v-chip>
          <div style="display: flex; align-items: center; justify-content: center; gap:10px">
              <v-img
                :src="`/images/payment_methods/visa.png`"
                width="35"
                height="35"
              ></v-img>
              <v-img
                :src="`/images/payment_methods/mastercard.png`"
                width="35"
                height="35"
              ></v-img>
              <v-img
              :src="`/images/payment_methods/paypal.png`"
              width="40"
              height="40"
              ></v-img>
              <v-img
                :src="`/images/payment_methods/apple_pay.png`"
                width="35"
                height="35"
              ></v-img>
              <v-img
                :src="`/images/payment_methods/google_pay.png`"
                width="40"
                height="40"
              ></v-img>
            </div>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.premium-plan-card {
  border-radius: 12px;
}
.price {
  color: black;
  font-weight: bold;
}
.premium-feature {
  font-weight:500;
  font-family: Inter;
  display: flex;
  align-items: center;
}
.list-icon {
  margin-right: 8px;
}

.positive{
  color:green
}

.negative{
  color:red
}

.font-inter {
  font-family: Inter;
}
</style>
