<script setup>
const authStore = useAuthStore();
const route = useRoute();

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
  SS_ProductCheckout(1, STRAPI_URL, authStore.user.email);
}
</script>

<template>
  <v-container>
    <h1>COUCOU</h1>
    <v-btn @click="goToStripe" color="primary"> Subscribe </v-btn>
  </v-container>
</template>