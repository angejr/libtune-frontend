export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_URL = config.strapiUrl

    const id = event.context.params?.id


    return await $fetch(
        `${STRAPI_URL}/strapi-stripe/retrieveCheckoutSession/${id}`
    )
})
