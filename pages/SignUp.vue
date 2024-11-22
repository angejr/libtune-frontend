<template>
  <v-container class="signup-container" max-width="500">
    <v-card class="signup-card" elevation="10">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Sign Up
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
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
            :disabled="!isFormValid"
            @click="submitForm"
            color="primary"
            block
            large
          >
            Sign Up
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();

const isFormValid = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const matchPassword = (value) =>
  value === password.value || "Passwords must match.";

const formRef = ref(null);

const submitForm = async () => {
  if (formRef.value && formRef.value.validate()) {
    try {
      await authStore.register(username.value, email.value, password.value);
      goToPath("/");
    } catch (e) {
      errorStore.setError({title: "Sign-Up Error", text: e.message})
    }
  }
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
