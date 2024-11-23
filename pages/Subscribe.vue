<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();

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
  try{
    SS_ProductCheckout(1, STRAPI_URL, authStore.user.email);
  }
  catch(e){
    errorStore.setError({title: "Error", text: e.message})
  }
}
</script>

<template>
  <v-container class="py-8" style="display: flex; justify-content: center">
    <v-card class="premium-plan-card" elevation="10" max-width="400">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Premium Plan
      </v-card-title>
      <v-card-subtitle class="text-center text-h6 font-weight-medium">
        <h3 class="price">€5/month</h3>
        <p>Billed monthly, cancel anytime</p>
      </v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <v-list dense>
          <v-list-item class="included">
            <v-icon icon="mdi-check-circle-outline" class="list-icon"></v-icon>
            Unlimited downloads of high-quality music
          </v-list-item>
          <v-list-item class="included">
            <v-icon icon="mdi-check-circle-outline" class="list-icon"></v-icon>
            Royalty-free license for all downloaded music
          </v-list-item>
          <v-list-item class="included">
            <v-icon icon="mdi-check-circle-outline" class="list-icon"></v-icon>
            Use in recreational and personal projects
          </v-list-item>
          <v-list-item class="included">
            <v-icon icon="mdi-check-circle-outline" class="list-icon"></v-icon>
            Monetized commercial use (e.g., YouTube, podcasts)
          </v-list-item>
          <v-list-item class="included">
            <v-icon icon="mdi-check-circle-outline" class="list-icon"></v-icon>
            No attribution required
          </v-list-item>
          <v-list-item class="excluded">
            <v-icon icon="mdi-close-circle-outline" class="list-icon"></v-icon>
            Redistribution or resale prohibited
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions style="display: flex; justify-content: center">
        <v-btn color="primary" variant="elevated" large @click="goToStripe">
          Get Premium
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.premium-plan-card {
  border-radius: 12px;
}
.price {
  color: #4a148c;
  font-weight: bold;
}
.included {
  color: #4caf50;
  display: flex;
  align-items: center;
}
.excluded {
  color: #f44336;
  display: flex;
  align-items: center;
}
.list-icon {
  margin-right: 8px;
}
</style>
