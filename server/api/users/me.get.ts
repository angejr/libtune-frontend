export default defineEventHandler(async (event) => {
    
    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl
    const STRAPI_URL = config.strapiUrl
    const STRAPI_ADMIN_API_TOKEN = config.strapiAdminApiToken

    const authorization = event.node.req.headers.authorization!

    const responseUser :any =  await $fetch(
        `${STRAPI_API_URL}/users/me`,
        {
            method: 'GET',
            headers: {
                authorization,
            }
        }
    )

    const {customerId, email} = responseUser

    // Check if user is currently paying customer
    const responseCustomer = await $fetch(`${STRAPI_URL}/strapi-stripe/getSubscriptionStatus/${email}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_ADMIN_API_TOKEN}`
            },
        })

    const subscriptions = response.data
    let isPaying = false

    if (subscriptions.some((el: any) => el.status == 'active')){
        isPaying = true
    }

    return {...responseUser, isPaying}
})
