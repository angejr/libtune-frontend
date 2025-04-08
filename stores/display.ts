export const useDisplayStore = defineStore('display', () => {
    const { mobile } = useDisplay()
    const isMobile = ref(false)
  
    watchEffect(() => {
      isMobile.value = mobile.value
    })
  
  const getIsMobile = computed(() => isMobile.value)

  const country : any = useCookie('country').value
  const isIndian = ['IN', 'SG'].includes(country) 

  return { isMobile, getIsMobile, isIndian }
  })
  