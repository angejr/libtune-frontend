<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore()
const config = useRuntimeConfig();
const STRAPI_URL = config.public.strapiUrl;
const stripeLoading = ref(false);
const displayStore = useDisplayStore();

useSeoMeta({
  title: "Pricing",
  ogtitle: "Subscribe",
  description: "Most affordable copyright free music plan, unlimited downloads and unlimited licence for commercial use, no attribution needed. Cancel anytime",
  ogDescription: "Most affordable copyright free music plan, unlimited downloads and unlimited licence for commercial use, no attribution needed. Cancel anytime",

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
      goToPath('/signup');
    }
}
</script>

<template>
  <v-container class="py-8" style="display: flex; justify-content: center">
    <v-card class="premium-plan-card" elevation="10" max-width="400">
      <v-card-title class="text-center text-h5 font-weight-bold">
          Premium Plan
        </v-card-title>
        <v-card-title class="text-center text-h6">
          <div style="display:flex; justify-content: center; gap:5px">
            <p class="text-decoration-line-through text-sm">
              {{ displayStore.countryPrice.priceOriginalValue}}
            </p>
            <v-chip color="red">
              <p style="font-size: x-large;">-</p> {{ displayStore.countryPrice.priceValue }}
            </v-chip>
          </div>
          <div class="price" style="display: flex; align-items: baseline; justify-content: center; color:red"><h1>{{ displayStore.countryPrice.priceValue}}</h1><p style="font-size:x-small">/month</p></div>
          <h6>Billed monthly, cancel anytime</h6>
        </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list dense>
          <v-list-item class="premium-feature">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            Unlimited downloads
          </v-list-item>
          <v-list-item class="premium-feature">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            License for all downloaded songs
          </v-list-item>
          <v-list-item class="premium-feature">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            Commercial use allowed
          </v-list-item>
          <v-list-item class="premium-feature">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            No attribution required
          </v-list-item>
          <v-list-item class="premium-feature">
            <v-icon icon="mdi-close-outline" class="list-icon negative"></v-icon>
            Redistribution or resale prohibited
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions style="display: flex; justify-content: center">
        <v-btn
          v-if="!authStore?.user?.customerId"
          color="purple"
          variant="elevated"
          large
          :disabled="stripeLoading"
          :loading="stripeLoading"
          @click="subscribe"
        >
          Subscribe
        </v-btn>
        <h3 v-else>You are already subscribed !</h3>
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
</style>
