import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,   // User object
        userToken: useCookie('userToken', {secure: true}).value || null, // JWT userToken stored in localStorage
    }),
    getters: {
        isAuthenticated: (state) => !!state.userToken,
        currentState: (state) => state
    },

    actions: {
        setUser(user: any) {
            this.user = user;
        },
        setToken(token: any) {
            this.userToken = token;
            useCookie('userToken', {secure: true}).value = token
        },
        async register(username: string, email: string, password: string) {

            const response : any = await $fetch('/api/register', {
                method: "POST",
                body: {
                    username,
                    email,
                    password,
                },
            })
            this.setUser(response.user)
            this.setToken(response.jwt)
        },
        async connectGoogle(id_token : string, access_token : string) {
            const config = useRuntimeConfig()
            const STRAPI_URL = config.public.strapiUrl

            const response : any = await $fetch(`${STRAPI_URL}/api/auth/google/callback`, {
                params: {
                  id_token,
                  access_token
                }
              })
            this.setUser(response.user)
            this.setToken(response.jwt)
        },

        async login(email: string, password: string) {

            const response : any = await $fetch('/api/login', {
                method: "POST",
                body: {
                    identifier: email,
                    password,
                },
            })
            this.setUser(response.user)
            this.setToken(response.jwt)
        },

        async fetchUser() {
            if (this.userToken) {
                const { data, error } = await useFetch('/api/users/me', {
                    method: "GET",
                    headers: { Authorization: `Bearer ${this.userToken}` },
                })

                if (data.value) {
                    this.setUser(data.value)
                }
                if (error.value) {
                    console.error("Fetch user error:", error)
                    // throw error
                    this.logout()  // Clear user and userToken if userToken is invalid
                    throw new Error(error.value.message)
                }
            }
        },

        logout() {
            this.user = null
            this.userToken = null
            useCookie('userToken', {secure: true}).value = null
        },


        async postLead(email: string, locale: string) {
            const response : any = await $fetch('/api/leads', {
                method: "POST",
                body: {
                    email,
                    locale
                },
            })
        }

        // autoLogin() {
        //     const userToken = sessionStorage.getItem('userToken')
        //     if (userToken) {
        //         const decodedToken = jwtDecode(userToken)
        //         const currentTime = Date.now() / 1000

        //         if (decodedToken.exp > currentTime) {
        //             this.userToken = userToken
        //             this.fetchUser()  // Fetch the user if the userToken is valid
        //         } else {
        //             this.logout()
        //         }
        //     }
        // },
    },
})
