<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore()
const config = useRuntimeConfig();
const STRAPI_URL = config.public.strapiUrl;
const STRIPE_PUBLIC_KEY = config.public.stripeSPublicKey;
const stripeLoading = ref(false);
const displayStore = useDisplayStore();

const stripe = ref(null);
const elements = ref(null);
const canGooglePay = ref(false)
const canMakePayment = ref(null)
const checkingCanMake = ref(false)

useHead({ script: [{ src: 'https://js.stripe.com/v3/', async: true }] })

useSeoMeta({
  title: `Pricing | v_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
  ogtitle: `Subscribe | v_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
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
      displayStore.setSubscribeAfterSignUp(true)
      goToPath('/signup');
    }
}

// Initialize Stripe Payment Request Button
onMounted(async () => {
  if (typeof window !== 'undefined') {
    const stripeLib = await Stripe(STRIPE_PUBLIC_KEY);
    stripe.value = stripeLib;

    const paymentRequest = stripeLib.paymentRequest({
      country: displayStore.countryCode,
      currency: displayStore?.countryPrice?.currency || 'eur',
      total: {
        label: 'Libtune Premium',
        amount: displayStore?.countryPrice?.priceNumber || 5,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    elements.value = stripeLib.elements();
    const prButtonElement = elements.value.create('paymentRequestButton', {paymentRequest});

    checkingCanMake.value = true
    const result = await paymentRequest.canMakePayment();
    checkingCanMake.value = false

    console.log({canMakePayment})
    canMakePayment.value = `google : ${result.googlePay} apple: ${result.applePay}`

    if (result?.googlePay) {
      canGooglePay.value = true
      prButtonElement.mount('#payment-request-button');
    }
  }
});
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
              {{ displayStore?.countryPrice?.priceOriginalValue}}
            </p>
            <v-chip color="red">
              <p style="font-size: x-large;">-</p> {{ displayStore?.countryPrice?.priceValue }}
            </v-chip>
          </div>
          <div class="price" style="display: flex; align-items: baseline; justify-content: center; color:red"><h1>{{ displayStore?.countryPrice?.priceValue }}</h1><p style="font-size:x-small">/month</p></div>
          <h6>Billed monthly, cancel anytime</h6>
        <h6>{{ canMakePayment }}</h6>
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
            License downloaded songs
          </v-list-item>
          <v-list-item class="premium-feature">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            Commercial use allowed
          </v-list-item>
          <v-list-item class="premium-feature">
            <v-icon icon="mdi-check-outline" class="list-icon positive"></v-icon>
            No attribution required
          </v-list-item>
          <v-list-item class="premium-feature" style="display: flex; justify-content: center;font-weight:bolder">
              <v-icon icon="mdi-plus-circle" size="x-large"></v-icon>
          </v-list-item>
          <v-list-item class="premium-feature" style="display: flex; justify-content: center">
            <v-icon icon="mdi-gift-outline" class="list-icon positive"></v-icon>
            Free bundle of 20 songs 
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions v-if="!authStore?.user?.customerId" class="mb-4" style="display: flex; justify-content: center; flex-direction: column; gap:20px">
        <v-btn
          color="primary"
          variant="elevated"
          large
          :disabled="stripeLoading"
          :loading="stripeLoading"
          @click="subscribe"
          class="text-capitalize"
          style="font-family: Inter; width: 70%;"          >
          Subscribe
        </v-btn>
        <!-- Google Pay / Apple Pay Button (Stripe Payment Request Button) -->
         <!-- Loading Spinner -->
        <div v-if="checkingCanMake" class="text-caption">
            Checking Google Pay availability
          <v-progress-circular
            indeterminate
            color="primary"
            size="x-small"
          ></v-progress-circular>
        </div>
        <div id="payment-request-button" :style="{width:'70%', display: canGooglePay ? 'block': 'none'}"></div>
      </v-card-actions>
      <v-divider></v-divider>
        <v-card-actions class="mt-4" style="display: flex; justify-content: center; flex-direction: column; gap:10px">
          <v-chip size="small" dense prepend-icon="mdi-lock">
              Secured payment
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
</style>
