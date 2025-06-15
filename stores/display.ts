export const useDisplayStore = defineStore('display', () => {
    const { mobile } = useDisplay()
    const isMobile = ref(false)
    const { locale } = useI18n();
  
    watchEffect(() => {
      isMobile.value = mobile.value
    })
  
  const getIsMobile = computed(() => isMobile.value)

  const countryCode : any = useCookie('country').value
  const countryPrice : any = countryCodeToPrice[Object.keys(countryCodeToPrice).includes(countryCode) ? countryCode : 'US' ]

  // Landing version // v1
  const languageVersion = Object.keys(languageToVersionCombination).includes(locale.value) ? locale.value : 'en'
  const versionCombination = languageToVersionCombination[languageVersion][Math.floor(Math.random() * 12)]
  
  let titleVersion : any = useCookie('titleVersion').value
  if (!titleVersion){
    titleVersion = versionCombination.split('_')[1]
    useCookie('titleVersion').value = titleVersion;
  }

  let subtitleVersion : any = useCookie('subtitleVersion').value
  if (!subtitleVersion){
    subtitleVersion = versionCombination.split('_')[2]
    useCookie('subtitleVersion').value = subtitleVersion;
  }

   const getSubscribeAfterSignUp = () =>
    useCookie<boolean>('subscribeAfterSignUp', { default: () => false });

  const setSubscribeAfterSignUp = (value: boolean) => {
    getSubscribeAfterSignUp().value = value;
  };
  
  const getLandingDialog = () =>  
    useCookie<boolean>('landingDialog', { default: () => true });
  
  const setLandingDialog = (value: boolean) => {
    getLandingDialog().value = value;
  };

  return { isMobile, getIsMobile, countryCode, countryPrice, titleVersion, subtitleVersion, getSubscribeAfterSignUp, setSubscribeAfterSignUp, getLandingDialog, setLandingDialog }
  })
  