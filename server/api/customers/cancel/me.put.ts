import Stripe from "stripe"

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl
    const STRAPI_TOKEN_USER = config.strapiTokenUser
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

    const {id: userId, customerId} = response

    if (!customerId) {
        throw createError({
            statusCode: 401,
            statusMessage: "You are not a customer"
        })
    }

    // Get subscriptions
    const { data: subscriptions } = await stripe.subscriptions.list({
        customer: customerId,
    });

    if (subscriptions.length === 0) {
        throw createError({
            statusCode: 401,
            statusMessage: "You have no subscription"
        })
    }

    let cancelledSubscriptions = []

    for (let subscription of subscriptions) {
        try {
            const canceledSubscription = await stripe.subscriptions.cancel(subscription.id, {
                // invoice_now: true, // Optional: immediately finalize the current invoice
                // prorate: true      // Optional: apply prorated refund
            });
            cancelledSubscriptions.push(canceledSubscription);
        }
        catch (e) {
            throw createError({
                statusCode: 500,
                statusMessage: "Unable to cancel subscription"
            })
        }
    }

    // Delete customer Id on strapi
    try {
        return await $fetch(
            `${STRAPI_API_URL}/users/${userId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
                },
                body: {
                    customerId: ''
                }
            }
        )
    }
    catch (e) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unable to remove customer Id'
        })
    }
})
