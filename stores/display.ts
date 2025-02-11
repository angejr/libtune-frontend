export const useDisplayStore = defineStore('display', () => {
    const { mobile } = useDisplay()
    const isMobile = ref(false)
  
    watchEffect(() => {
      isMobile.value = mobile.value
    })
  
  const getIsMobile = computed(() => isMobile.value)

  return { isMobile, getIsMobile }
  })
  