export const useLandingDialog = () => {
    const email = ref('')
    const leadSuccess = ref(false)
    const leadLoading = ref(false)
    const isFormValid = ref(false)
    const formRef = ref(null)
  
    return {
      email,
      leadSuccess,
      leadLoading,
      isFormValid,
      formRef,
    }
  }
  