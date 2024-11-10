export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_URL = config.strapiUrl

    const method = event.node.req.method as 'GET' | 'POST' | 'PUT' | 'DELETE'
    const id = event.context.params?.id


    return await $fetch(
        `${STRAPI_URL}/strapi-stripe/retrieveCheckoutSession/${id}`
    )
})
