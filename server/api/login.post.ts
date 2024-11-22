import xss from 'xss'
import { z } from 'zod'

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_TOKEN_USER = config.strapiTokenUser
    const STRAPI_API_URL = config.strapiApiUrl


    // Validate input against schema
    const schema = z.object({
        identifier: z.string().regex(/^.+@.+\..+$/).max(60),
        password: z.string().min(8).max(30)
    })
    const validation = await readValidatedBody(event, body => schema.safeParse(body))

    if(!validation.success){
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

    // Finally make the call
    try {
        return await $fetch(
            `${STRAPI_API_URL}/auth/local`,
            {
                method: 'POST',
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
