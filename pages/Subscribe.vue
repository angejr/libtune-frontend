<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore()
const config = useRuntimeConfig()
const STRAPI_URL = config.public.strapiUrl

useSeoMeta({
  title: "Pricing",
  ogtitle: "Subscribe",
  description: "Most affordable copyright free music plan, unlimited downloads and unlimited licence for commercial use, no attribution needed. Cancel anytime",
  ogDescription: "Most affordable copyright free music plan, unlimited downloads and unlimited licence for commercial use, no attribution needed. Cancel anytime",

})


function SS_ProductCheckout(productId, baseUrl, userEmail) {
  localStorage.setItem("strapiStripeUrl", baseUrl);
  const getRedirectUrl =
    baseUrl + "/strapi-stripe/getRedirectUrl/" + productId + "/" + userEmail;

  fetch(getRedirectUrl, {
    method: "get",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.url) {
        const url = response.url;
        navigateTo(url, { external: true });

        // ADDED SS_GetProductPaymentDetails

        const checkoutSessionId = url
          .split("/")
          [url.split("/").length - 1].split("#")[0];

        const baseUrl = localStorage.getItem("strapiStripeUrl");
        const retrieveCheckoutSessionUrl =
          baseUrl +
          "/strapi-stripe/retrieveCheckoutSession/" +
          checkoutSessionId;

        if (
          window.performance
            .getEntriesByType("navigation")
            .map((nav) => nav.type)
            .includes("reload")
        ) {
          console.info("website reloded");
        } else {
          fetch(retrieveCheckoutSessionUrl, {
            method: "get",
            mode: "cors",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
        }
      }
    });
}

// Define the URL as a ref or computed property

function goToStripe() {
  // for product Checkout
  try {
    SS_ProductCheckout(2, STRAPI_URL, authStore.user.email);
  } catch (e) {
    errorStore.setError({ title: "Error", text: e.message });
  }
}
</script>

<template>
  <v-container class="py-8" style="display: flex; justify-content: center">
    <v-card class="premium-plan-card" elevation="10" max-width="400">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Premium Plan
      </v-card-title>
      <v-card-subtitle class="text-center text-h6">
        <h2 class="price">$5.25/month</h2>
        <h6>Billed monthly, cancel anytime</h6>
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <v-list dense>
          <v-list-item class="included">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            Unlimited downloads
          </v-list-item>
          <v-list-item class="included">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            License for all downloaded songs
          </v-list-item>
          <v-list-item class="included">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            Commercial use allowed
          </v-list-item>
          <v-list-item class="included">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            No attribution required
          </v-list-item>
          <v-list-item class="excluded">
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
          @click="
            if(authStore?.userToken){
            goToStripe();
            }
            else{
              goToPath('/login');
            }"
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
.included {
  font-weight:500;
  display: flex;
  align-items: center;
}
.excluded {
  font-weight:500;
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
