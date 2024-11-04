<script setup>
const authStore = useAuthStore();

const params = new URLSearchParams(document.location.search);

const subscriptionOver = ref(false);
const subscribed = ref(false);

const checkoutSessionId = params.get("sessionId");

// If the user is already a customer skip the subscription process
if (authStore.user.customerId){
    subscriptionOver.value = true;
    subscribed.value = true;

}
else{
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
          await authStore.fetchUser();
    
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
            alert(error.value.data.error.message);
          } 
          else {
            subscribed.value = true;
          }
        } 
        else {
          subscriptionOver.value = true;
          alert("No customer found");
        }
      }
    
      if (error.value) {
        subscriptionOver.value = true;
        alert(error.value.data.error.message);
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
      <h1 v-else>Problem while subscribing</h1>
    </div>
  </v-container>
</template>