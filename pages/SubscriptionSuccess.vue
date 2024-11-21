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
    const { data, error } = await useFetch(`/api/checkoutsessions/${checkoutSessionId}`);

    if (data.value) {
      let customerId = data.value.customer;

      if (customerId) {
        try {
          let { error } = await useFetch(`/api/users/me`,
            {
              method: "PUT",
              headers: { Authorization: `Bearer ${authStore.userToken}` },
              body: {
                customerId,
              }
            }
          );
  
          subscriptionOver.value = true;
          if (error.value) {
            errorMessage.value = error.value.message;
          } else {
            subscribed.value = true;
          }

          // Refetch User 
          await authStore.fetchUser();
        } catch (e) {
          errorMessage.value = e.message;
        }

      } else {
        subscriptionOver.value = true;
        errorMessage.value = "No customer found";
      }
    }

    if (error.value) {
      subscriptionOver.value = true;
      errorMessage.value = error.value.message;
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
    class="subscription-landing-container"
  >
    <!-- Loading Spinner -->
    <v-progress-circular
      v-if="!subscriptionOver"
      indeterminate
      color="primary"
      size="70"
    ></v-progress-circular>

    <!-- Subscription Confirmation -->
    <v-card
      v-else
      class="subscription-card"
      elevation="4"
    >
      <v-card-title class="headline text-center">
        <v-icon large color="green" class="mr-3">mdi-check-circle</v-icon>
        You're Subscribed!
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="text-center">
          Thank you for subscribing to <strong>Libtune Premium</strong>. 
        </p>
        <p class="text-left">
          You now have unlimited access to our library of <strong> 100% royalty-free music! </strong>
        </p>
        <br>
        <p class="text-left">
          <strong>Next Steps:</strong>
        </p>
        <ul class="subscription-steps">
          <li>Browse our extensive collection of music.</li>
          <li>Download tracks with no limitations.</li>
          <li>Use music for both recreational and commercial projects.</li>
        </ul>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          color="primary"
          variant="elevated"
          large
          @click="goToPath('/')"
        >
          Explore Music Library
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Error Message -->
    <v-alert
      v-if="subscriptionOver && !subscribed"
      type="error"
      class="error-message mt-4"
      dismissible
    >
      <v-icon left color="red">mdi-alert</v-icon>
      {{ errorMessage }}
    </v-alert>
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