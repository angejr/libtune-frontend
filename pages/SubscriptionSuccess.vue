<script setup>
const authStore = useAuthStore();

const subscriptionOver = ref(!!authStore.user?.customerId);
const subscribed = ref(!!authStore.user?.customerId);
const errorMessage = ref("")
const route = useRoute();
const checkoutSessionId = route.query["sessionId"];

// If the user is already a customer skip the subscription process
if (!subscribed.value) {
  if (checkoutSessionId) {
    const { data, error } = await useFetch(
      `${STRAPI_URL}/strapi-stripe/retrieveCheckoutSession/${checkoutSessionId}`,
      {
        method: "GET",
      }
    );

    if (data.value) {
      let customerId = data.value.customer;

      if (customerId) {
        // Fetch self user
        try {
          await authStore.fetchUser();
        } catch (e) {
          errorMessage.value = e.message;
        }

        let { error } = await useFetch(
          `${STRAPI_API_URL}/users/${authStore.user.id}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${STRAPI_TOKEN_USER}` },
            body: {
              customerId,
            },
          }
        );

        subscriptionOver.value = true;
        if (error.value) {
          errorMessage.value = error.value.data.error.message;
        } else {
          subscribed.value = true;
        }
      } else {
        subscriptionOver.value = true;
        errorMessage.value = "No customer found";
      }
    }

    if (error.value) {
      subscriptionOver.value = true;
      errorMessage.value = error.value.data.error.message;
    }
  } else {
    subscriptionOver.value = true;
    subscribed.value = false;
  }
}
</script>

<template>
  <v-container
    fluid
    class="my-8"
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80%;
    "
  >
    <v-progress-circular
      v-if="!subscriptionOver"
      indeterminate
    ></v-progress-circular>
    <div v-else>
      <h1 v-if="subscribed">YOU'RE SUBSCRIBED !</h1>
      <h1 v-else>{{errorMessage}}</h1>
    </div>
  </v-container>
</template>