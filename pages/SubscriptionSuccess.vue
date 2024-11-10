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
        // Fetch self user
        try {
          await authStore.fetchUser();
          let { error } = await useFetch(`/api/users/${authStore.user.id}`,
            {
              method: "PUT",
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
      <div v-else>{{errorMessage}}</div>
    </div>
  </v-container>
</template>