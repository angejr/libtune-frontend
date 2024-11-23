export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl

    const authorization = event.node.req.headers.authorization!

    const response : any =  await $fetch(
        `${STRAPI_API_URL}/users/me`,
        {
            method: 'GET',
            headers: {
                authorization,
            }
        }
    )

    const customerId = response.customerId 




})
