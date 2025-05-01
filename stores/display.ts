export const useDisplayStore = defineStore('display', () => {
    const { mobile } = useDisplay()
    const isMobile = ref(false)
  
    watchEffect(() => {
      isMobile.value = mobile.value
    })
  
  const getIsMobile = computed(() => isMobile.value)

  const countryCode : any = useCookie('country').value
  const countryPrice : any = countryCodeToPrice[Object.keys(countryCodeToPrice).includes(countryCode) ? countryCode : 'US' ]

  // Landing version
  let titleVersion : any = useCookie('titleVersion').value
  if (!titleVersion){
    titleVersion = Math.floor(Math.random() * 7) + 1
    useCookie('titleVersion').value = titleVersion;
  }

  let subtitleVersion : any = useCookie('subtitleVersion').value
  if (!subtitleVersion){
    subtitleVersion = Math.floor(Math.random() * 10) + 1
    useCookie('subtitleVersion').value = subtitleVersion;
  }

   const getSubscribeAfterSignUp = () =>
    useCookie<boolean>('subscribeAfterSignUp', { default: () => false });

  const setSubscribeAfterSignUp = (value: boolean) => {
    getSubscribeAfterSignUp().value = value;
  };
  return { isMobile, getIsMobile, countryCode, countryPrice, titleVersion, subtitleVersion, getSubscribeAfterSignUp, setSubscribeAfterSignUp }
  })
  