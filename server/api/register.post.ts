export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_TOKEN_USER = config.strapiTokenUser
    const STRAPI_API_URL = config.strapiApiUrl

    const body = await readBody(event)

    return await $fetch(
        `${STRAPI_API_URL}/auth/local/register`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
            },
            body
        }
    )
})
