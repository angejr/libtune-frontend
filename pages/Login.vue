<template>
    <v-container style="background-color: white; display: flex; flex-direction: column; justify-content: space-around;" width="500px" height="300px">
          <h1 style="padding-bottom:20px">Login</h1>
      <v-form
        v-model="isFormValid"
        ref="formRef"
        lazy-validation
        style="
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        "
      >
  
        <v-text-field variant="outlined"
          v-model="email"
          label="Email"
          :rules="[rules.required, rules.email]"
          required
          lazy
        ></v-text-field>
  
        <v-text-field variant="outlined"
          v-model="password"
          label="Password"
          type="password"
          :rules="[rules.required, rules.min(8)]"
          required
          lazy
        ></v-text-field>
  
        <v-btn
          :disabled="!isFormValid"
          @click="submitForm"
          color="primary"
          width="100px"
          style="align-self: center;"
        >
          Enter
        </v-btn>
      </v-form>
    </v-container>
  </template>
    
  <script setup>
  const authStore = useAuthStore();
  
  // Reactive form state
  const isFormValid = ref(false);
  const email = ref("");
  const password = ref("");
  
  // Form validation rules
  const rules = {
    required: (value) => !!value || "Required.",
    email: (value) => /.+@.+\..+/.test(value) || "Invalid e-mail.",
    min: (length) => (value) =>
      value.length >= length || `Min ${length} characters.`,
  };
  
  // Form reference
  const formRef = ref(null);
  
  // Form submission logic
  const submitForm = async () => {
    // Ensure formRef is defined before calling validate
    if (formRef.value && formRef.value.validate()) {
      try {
        await authStore.login(email.value, password.value);
        alert(`You're Logged in!`);
        goToPath("/");
        console.log({state: authStore.currentState})
      } catch (e) {
        alert(e.message);
      }
    }
  };
  </script>
    