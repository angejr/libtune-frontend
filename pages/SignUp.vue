<template>
  <v-container class="signup-container" max-width="500">
    <v-card v-if="!authStore?.userToken" class="signup-card" elevation="10">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Sign Up
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="text-center mt-4 mb-4">
            Already have an account ? 
            <NuxtLink to="/login" class="terms-link">
              Login
            </NuxtLink>
        </p>
        <v-form
          v-model="isFormValid"
          ref="formRef"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            :rules="[validationRules.required, validationRules.safe, validationRules.max(60)]"
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="Email"
            variant="outlined"
            :rules="[validationRules.required, validationRules.email, validationRules.safe, validationRules.max(60)]"
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            variant="outlined"
            :rules="[validationRules.required, validationRules.min(8), validationRules.safe, validationRules.max(30)]"
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            :rules="[validationRules.required, matchPassword, validationRules.safe, validationRules.max(30)]"
            dense
            class="mt-4"
          ></v-text-field>

          <p class="text-center mt-4 mb-4">
            By signing up, you agree to the
            <NuxtLink to="/terms" class="terms-link">
              Terms and Conditions
            </NuxtLink>
          </p>

          <v-btn
            :disabled="!isFormValid || signUpLoading"
            @click="submitForm"
            color="primary"
            block
            large
            :loading="signUpLoading"
          >
            Sign Up
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- Subscription Confirmation -->
    <v-card v-else class="signup-card" elevation="4">
      <v-card-title class="headline text-center">
        <v-icon large color="green" class="mr-3">mdi-check-circle</v-icon>
        You're Signed-Up!
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="text-center">
          Thank you for signing-up to <strong>Libtune</strong>.
        </p>
        <p class="text-center">
          You now have access to our library of
          <strong> 100% royalty-free music! </strong>
        </p>
        <br />
        <p class="text-left">
          <strong>Next Steps:</strong>
        </p>
        <ul class="subscription-steps">
          <li>Browse our extensive collection of music.</li>
        </ul>

        <v-spacer></v-spacer>
        <p class="text-left">
          <strong> Upgrade to Libtune Premium to be able to:</strong>
        </p>
        <ul class="subscription-steps">
          <li>Download tracks with no limitations.</li>
          <li>Use music for both recreational and commercial projects.</li>
        </ul>
      </v-card-text>
      <v-card-actions class="justify-space-evenly">
        <v-btn color="primary" variant="elevated" large @click="goToPath('/')">
          Browse
        </v-btn>
        <v-btn
            v-if="!authStore?.user?.customerId"
            color="purple"
            variant="elevated"
            large
            style="font-family: Inter"
            @click="
              if (authStore?.userToken) {
                goToStripe();
              } else {
                goToPath('/signup');
              }
            "
          >
          Subscribe
          </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();
const route = useRoute()
const subscribe = ref(route.query.subscribe)

const isFormValid = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const config = useRuntimeConfig()
const STRAPI_URL = config.public.strapiUrl
const signUpLoading = ref(false);

useSeoMeta({
  title: "Sign-Up",
  ogTitle: "Sign-Up",
  robots: {
    noindex: true,
    nofollow: true
  }
})

function goToStripe() {
  // for product Checkout
  try {
    SS_ProductCheckout(2, STRAPI_URL, authStore.user.email);
  } catch (e) {
    errorStore.setError({ title: "Error", text: e.message });
  }
}

const matchPassword = (value) =>
  value === password.value || "Passwords must match.";

const formRef = ref(null);

const submitForm = async () => {
  signUpLoading.value = true
  if (formRef.value && formRef.value.validate()) {
    try {
      await authStore.register(username.value, email.value, password.value);
      if(authStore?.userToken && subscribe.value === "true" ){
          goToStripe();
        }
    } catch (e) {
      errorStore.setError({title: "Sign-Up Error", text: e.message})
    }
  }
  signUpLoading.value= false
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.signup-card {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  border-radius: 12px;
  background-color: white;
}

.terms-link {
  color: #4a148c;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}
</style>
