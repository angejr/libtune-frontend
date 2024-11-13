export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl

    // First call to get the Id of the user calling the API by validating the authorization token
    // A user can only modify its own data 
    
    const authorization = event.node.req.headers.authorization!

    const response =  await $fetch(
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
    let body = await readBody(event)

    // Only allow specific fields to be modified
    body = {
        customerId: body.customerId,
        username: body.username
    }

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
})
