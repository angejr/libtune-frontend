<template>
  <v-container style="background-color: white" width="500px">
    <v-row style="padding-bottom: 10px">
      <v-col>
        <h1>Sign-Up</h1>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>

    <v-form
      v-model="isFormValid"
      ref="formRef"
      lazy-validation
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      "
    >
      <v-text-field
        v-model="username"
        label="Username"
        :rules="[validationRules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="Email"
        :rules="[validationRules.required, validationRules.email]"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="[validationRules.required, validationRules.min(8)]"
        required
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        :rules="[validationRules.required, matchPassword]"
        required
      ></v-text-field>

      <p style="padding-top: 10px; padding-bottom: 20px">
        By signing up, you agree to the
        <NuxtLink to="/terms"> Terms and Conditions </NuxtLink>
      </p>

      <v-btn
        :disabled="!isFormValid"
        @click="submitForm"
        color="primary"
        width="100px"
      >
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>
  
<script setup>
const authStore = useAuthStore();

// Reactive form state
const isFormValid = ref(false);
const username = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

// Password match validation
const matchPassword = (value) =>
  value === password.value || "Passwords must match.";

// Form reference
const formRef = ref(null);

// Form submission logic
const submitForm = async () => {
  // Ensure formRef is defined before calling validate
  if (formRef.value && formRef.value.validate()) {
    try {
      await authStore.register(username.value, email.value, password.value);
      alert(`You're signed in!`);
      goToPath("/");
      console.log({state: authStore.currentState})
    } catch (e) {
      alert(e.message);
    }
  }
};
</script>
  