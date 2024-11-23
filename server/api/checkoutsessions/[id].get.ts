import xss from "xss"
import { z } from "zod"

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_URL = config.strapiUrl
    const STRAPI_API_URL = config.strapiApiUrl
    const STRAPI_TOKEN_USER = config.strapiTokenUser

    const id = event.context.params?.id

    // First call to get the Id of the user calling the API by validating the authorization token
    // A user can only modify its own data
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
    const userId = response.id


    // Second call to retrieve the customerId from the checkoutSessionId
    const { customer: customerId } = await $fetch(
        `${STRAPI_URL}/strapi-stripe/retrieveCheckoutSession/${id}`
    )

    // Third call to add the customer Id to the authenticated user 
    // Validate that customerId respect the right format
    const schema = z.string().max(50)
    try {
        schema.parse(customerId)
    }
    catch (e) {
        throw createError({
            statusCode: 400,
        })
    }

    // Validate that the input is safe
    if (xss(customerId) !== customerId ) {
        throw createError({
            statusCode: 400
        })
    }

    // Finally add the customerId to the user
    try {
        return await $fetch(
            `${STRAPI_API_URL}/users/${userId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
                },
                body: {
                    customerId
                }
            }
        )
    }
    catch (e) {
        throw createError({
            statusCode: 401,
        })
    }
})
