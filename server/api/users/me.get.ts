export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl

    const method = event.node.req.method as 'GET' | 'POST' | 'PUT' | 'DELETE'
    const authorization = event.node.req.headers.authorization!

    return await $fetch(
        `${STRAPI_API_URL}/users/me`,
        {
            method,
            headers: {
                authorization,
            }
        }
    )
})
