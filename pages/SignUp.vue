<template>
  <v-container class="signup-container" max-width="500">
    <v-card v-if="!authStore?.userToken" class="signup-card" elevation="10">
      <v-card-title class="text-center text-h5 font-weight-bold">
        {{$t("AppBar.signup")}}
      </v-card-title>
      <v-divider></v-divider>
      <p class="text-center mt-4 mb-4">
        {{$t('SignUp.haveAccount')}} 
        <NuxtLink :to="localePath('/login')" class="terms-link">
          {{$t("AppBar.login")}}

        </NuxtLink>
      </p>

      <div style="padding: 1rem;">
        <v-btn
            :disabled="signUpLoading"
            @click="registerGoogle"
            :variant="signUpLoading ? 'elevated' : 'outlined'"
            block
            large
            :loading="signUpLoading"
            class="text-none"
          >
          <img
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt="Google"
        class="me-2"
        width="20"
        height="20"
      />
      {{$t('SignUp.continueGoogle')}}
          </v-btn>
      </div>
      <div class="px-6 pt-4">
        <v-divider>{{$t('SignUp.or')}}</v-divider>
      </div>
      <v-card-text>
        <v-form
          v-model="isFormValid"
          ref="formRef"
          lazy-validation
        >
          <v-text-field
            v-model="username"
            :label="$t('SignUp.username')"
            variant="outlined"
            :rules="[validationRules.required, validationRules.safe, validationRules.max(60)]"
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :label="$t('SignUp.email')"
            variant="outlined"
            :rules="[validationRules.required, validationRules.email, validationRules.safe, validationRules.max(60)]"
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :label="$t('SignUp.password')"
            type="password"
            variant="outlined"
            :rules="[validationRules.required, validationRules.min(8), validationRules.safe, validationRules.max(30)]"
            dense
            class="mt-4"
          ></v-text-field>

          <v-text-field
            v-model="confirmPassword"
            :label="$t('SignUp.confirmPassword')"
            type="password"
            variant="outlined"
            :rules="[validationRules.required, matchPassword, validationRules.safe, validationRules.max(30)]"
            dense
            class="mt-4"
          ></v-text-field>

          <p class="text-center mt-4 mb-4">
            {{$t('SignUp.agreement')}}
            <NuxtLink :to="localePath('/terms')" class="terms-link">
              {{$t("AppBar.termsAndConditions")}}

            </NuxtLink>
          </p>

          <v-btn
            :disabled="!isFormValid || signUpLoading"
            @click="submitForm"
            :color="!isFormValid || signUpLoading ? 'grey' : 'primary'"
            block
            large
            :loading="signUpLoading"
            class="text-capitalize font-inter"
          >
          {{$t("AppBar.signup")}}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- Subscription Confirmation -->
    <v-card v-else class="signup-card" elevation="4">
      <v-card-title class="headline text-center">
        <v-icon large color="green" class="mr-3">mdi-check-circle</v-icon>
        {{$t("SignUp.signedUp")}}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="text-center">
          {{$t("SignUp.thankYou")}} <strong>Libtune</strong>.
        </p>
        <p class="text-center">
          {{$t("SignUp.nowAccess")}}
          <strong> {{$t("SignUp.100PrctRoyaltyFree")}} </strong>
        </p>
        <br />
        <p class="text-left">
          <strong>{{$t("SignUp.nextSteps")}}:</strong>
        </p>
        <ul class="subscription-steps">
          <li>{{$t("SignUp.subscriptionSteps.1")}}</li>
        </ul>

        <v-spacer></v-spacer>
        <p class="text-left">
          <strong> {{$t("SignUp.subscriptionSteps.2")}}</strong>
        </p>
        <ul class="subscription-steps">
          <li>{{$t("SignUp.subscriptionSteps.3")}}</li>
          <li>{{$t("SignUp.subscriptionSteps.4")}}</li>
        </ul>
      </v-card-text>
      <v-card-actions class="justify-space-evenly">
        <v-btn color="primary" class="font-inter text-capitalize"
        variant="elevated" large @click="goToPath('/browse')" >
        {{$t("SignUp.browse")}}
        </v-btn>
        <v-btn
            v-if="!authStore?.user?.customerId"
            color="purple"
            variant="elevated"
            large
            class="font-inter text-capitalize"
            :disabled="stripeLoading"
            :loading="stripeLoading"
            @click="subscribeAction()"
          >
          {{$t("SignUp.subscribe")}}
          </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();
const route = useRoute()
const accessToken = ref(route.query.access_token)
const idToken = ref(route.query.id_token)

const isFormValid = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const config = useRuntimeConfig()
const STRAPI_URL = config.public.strapiUrl
const signUpLoading = ref(!!idToken.value && !!accessToken.value);
const stripeLoading = ref(false);
const displayStore = useDisplayStore()
const { t, locales, setLocale } = useI18n();
const localePath = useLocalePath();

useSeoMeta({
  title: `${t('SignUp.PageTitle')} | v1_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
  ogTitle: `${t('SignUp.PageTitle')} | v1_${displayStore.titleVersion}_${displayStore.subtitleVersion}`,
  robots: {
    noindex: true,
    nofollow: true
  }
})

onMounted( async() => {
  await connectGoogle()
})

async function goToStripe() {
  // for product Checkout
  try {
    await SS_ProductCheckout(displayStore.countryPrice.priceId, STRAPI_URL, authStore.user.email);
  } catch (e) {
    errorStore.setError({ title: "Error", text: e.message });
  }
}

const matchPassword = (value) =>
  value === password.value || "Passwords must match.";

const formRef = ref(null);

const registerGoogle = async () => {
  try{
    signUpLoading.value = true
    await navigateTo(`${STRAPI_URL}/api/connect/google`, {external: true})
  }
  catch(e){
    errorStore.setError({title: "Sign-Up Error", text: e.message})
    signUpLoading.value = false
  }
}

async function connectGoogle (){
  if (idToken.value && accessToken.value){
    try {
      signUpLoading.value = true
      await authStore.connectGoogle(idToken.value, accessToken.value);
      if(authStore?.userToken && displayStore.getSubscribeAfterSignUp().value){
          displayStore.setSubscribeAfterSignUp(false)
          await goToStripe();
        }
    } catch (e) {
      errorStore.setError({title: "Sign-Up Error", text: e.message})
      signUpLoading.value= false
    }
  }
}

const submitForm = async () => {
  if (formRef.value && formRef.value.validate()) {
    signUpLoading.value = true
    try {
      await authStore.register(username.value, email.value, password.value);
      if(authStore?.userToken && displayStore.getSubscribeAfterSignUp().value){
          displayStore.setSubscribeAfterSignUp(false)
          await goToStripe();
        }
    } catch (e) {
      errorStore.setError({title: "Sign-Up Error", text: e.message})
      signUpLoading.value= false
    }
  }
};

const subscribeAction = () => {
  try{
    stripeLoading.value = true
    if (authStore?.userToken) {
      goToStripe();
    } else {
      goToPath('/signup');
    }
  }
  catch(e){
    errorStore.setError({title: "Sign-Up Error", text: e.message})
    stripeLoading.value= false
  }
}
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

.font-inter {
  font-family: Inter
}
</style>
