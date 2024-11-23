import Stripe from "stripe"


export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl
    const STRIPE_SECRET_KEY = config.stripeSecretKey

    const stripe = new Stripe(STRIPE_SECRET_KEY)

    const authorization = event.node.req.headers.authorization!

    const response: any = await $fetch(
        `${STRAPI_API_URL}/users/me`,
        {
            method: 'GET',
            headers: {
                authorization,
            }
        }
    )

    const customerId = response.customerId


    // Get customer data
    try {
        const { data: subscriptions } = await stripe.subscriptions.list({
            customer: customerId,
        });
        const { data: paymentMethods } = await stripe.paymentMethods.list({
            customer: customerId,
        });
        const { data: payments } = await stripe.paymentIntents.list({
            customer: customerId,
        });
        return {
            subscriptions,
            paymentMethods,
            payments,
        }
    }
    catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: "Could not get customer data"
        })
    }







})
