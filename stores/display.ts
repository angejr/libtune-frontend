export const useDisplayStore = defineStore('display', () => {
    const { mobile } = useDisplay()
    const isMobile = ref(false)
  
    watchEffect(() => {
      isMobile.value = mobile.value
    })
  
  const getIsMobile = computed(() => isMobile.value)

  const countryCode : any = useCookie('country').value
  const countryPrice : any = countryCodeToPrice[Object.keys(countryCodeToPrice).includes(countryCode) ? countryCode : 'US' ]

  return { isMobile, getIsMobile, countryPrice }
  })
  