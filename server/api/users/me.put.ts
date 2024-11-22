import xss from "xss"
import { z } from "zod"

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl

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

    // Second call to modify the authenticated user with the provided payload
    const STRAPI_TOKEN_USER = config.strapiTokenUser

    // Validate input against schema
    const schema = z.object({
        customerId: z.string().max(50),
        username: z.string().min(1).max(60),
    }).strict()
    const validation = await readValidatedBody(event, body => schema.safeParse(body))

    if (!validation.success) {
        throw createError({
            statusCode: 400,
            // statusMessage: validation.error?.errors.map(el => el.message).join(' + ')
        })
    }

    const body = validation.data

    // Validate that the input is safe
    if (Object.values(body).some(el => xss(el) !== el)) {
        throw createError({
            statusCode: 400
        })
    }

    try {
        return await $fetch(
            `${STRAPI_API_URL}/users/${userId}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
                },
                body
            }
        )
    }
    catch (e) {
        throw createError({
            statusCode: 401,
        })
    }
})
