export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_TOKEN_USER = config.strapiTokenUser
    const STRAPI_API_URL = config.strapiApiUrl
    

    const method = event.node.req.method as 'GET' | 'POST' | 'PUT' | 'DELETE'
    const body = await readBody(event)
    const id = event.context.params?.id

    return await $fetch(
        `${STRAPI_API_URL}/users/${id}`,
        {
            method,
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
            },
            body
        }
    )
})
