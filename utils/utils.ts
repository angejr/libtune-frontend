export function goToPath(input : any) {
    return navigateTo(input)
}

// Form validation rules
export const validationRules = {
  required: (value: any) => !!value || "Required.",
  email: (value: any) => /^.+@.+\..+$/.test(value) || "Invalid e-mail.",
  min: (length: any) => (value: any) =>
    value.length >= length || `Min ${length} characters.`,
  max: (length: any) => (value: any) =>
    value.length <= length || `Max ${length} characters.`,
  safe: (value :any) => value == useSanitize(value) || "Unsafe input",
  number: (value: any) => /^[0-9]*$/.test(value) || "Needs to be a number",
};


export function removeAll(stringsToRemove: string[], string: string) : string{
  if (!string){
    return string
  }

  let returnString = string

  for (let toRemove of stringsToRemove){
    returnString = returnString.replaceAll(toRemove, '')
  }

  return returnString
}

export async function SS_ProductCheckout(productId: Number, baseUrl: string, userEmail: string) {
  localStorage.setItem("strapiStripeUrl", baseUrl);
  const getRedirectUrl =
    baseUrl + "/strapi-stripe/getRedirectUrl/" + productId + "/" + userEmail;

  await new Promise( r => {
    fetch(getRedirectUrl, {
      method: "get",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.url) {
          const url = response.url;
          navigateTo(url, { external: true });
  
          // ADDED SS_GetProductPaymentDetails
  
          const checkoutSessionId = url
            .split("/")
            [url.split("/").length - 1].split("#")[0];
  
          const baseUrl = localStorage.getItem("strapiStripeUrl");
          const retrieveCheckoutSessionUrl =
            baseUrl +
            "/strapi-stripe/retrieveCheckoutSession/" +
            checkoutSessionId;
  
          if (
            window.performance
              .getEntriesByType("navigation")
              .map((nav : any) => nav.type)
              .includes("reload")
          ) {
            console.info("website reloded");
          } else {
            fetch(retrieveCheckoutSessionUrl, {
              method: "get",
              mode: "cors",
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            });
          }
        }
      });
  })
}

export const countryCodeToPrice : any = {
  // Default/US
  US: {
    currency: 'usd',
    priceNumber: 525,
    priceId: 2,
    priceValue: '$5.25',
    priceOriginalValue: '$10.50'
  },
  // India
  IN: {
    currency: 'inr',
    priceId: 4,
    priceValue: '₹470',
    priceNumber: 47000,
    priceOriginalValue: '₹940'
  },
  // Singapore
  SG: {
    currency: 'inr',
    priceId: 4,
    priceValue: '₹470',
    priceNumber: 47000,
    priceOriginalValue: '₹940'
  },
  // Indonesia
  ID: {
    currency: 'idr',
    priceId: 5,
    priceValue: 'IDR 95,000',
    priceNumber: 95000,
    priceOriginalValue: 'IDR 190,000'
  },
  // Philippines
  PH: {
    currency: 'php',
    priceId: 6,
    priceValue: '₱320',
    priceNumber: 32000,
    priceOriginalValue: '₱640'
  },
  
}

export const offerExpiryDate = '2025-05-21T00:00:00Z' // Spring offer