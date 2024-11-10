export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_TOKEN_USER = config.strapiTokenUser
    const STRAPI_API_URL = config.strapiApiUrl

    const body = await readBody(event)
    const method = event.node.req.method as 'GET' | 'POST' | 'PUT' | 'DELETE'

    return await $fetch(
        `${STRAPI_API_URL}/auth/local`,
        {
            method,
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
            },
            body
        }
    )
})
