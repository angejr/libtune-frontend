import xss from "xss"
import { z } from "zod"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const STRAPI_TOKEN_LEAD = config.strapiTokenLead
    const STRAPI_API_URL = config.strapiApiUrl

    // Validate input against schema
    const schema = z.object({
        email: z.string().regex(/^.+@.+\..+$/).max(60),
    }).strict()
    const validation = await readValidatedBody(event, body => schema.safeParse(body))

    if (!validation.success) {
        throw createError({
            statusCode: 400,
            // statusMessage: validation.error?.errors.map(el => el.message).join(' + ')
        })
    }

    const data = validation.data

    // Validate that the input is safe
    if (Object.values(data).some(el => xss(el) !== el)) {
        throw createError({
            statusCode: 400
        })
    }

    const body = {data}
    // Finally make the call
    try {
        return await $fetch(
            `${STRAPI_API_URL}/leads`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN_LEAD}`,
                },
                body
            }
        )
    }
    catch (e : any) {
        throw createError({
            // statusCode: 500,
            // Most common error & somehow strapi doesn't return actual error message only 500
            statusMessage: "This email has already been used"

        })
    }
})
