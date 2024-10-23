import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core' // Optional: to use localStorage easily
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useStorage('user', {}, sessionStorage),   // User object
        userToken: useStorage('userToken', '', sessionStorage), // JWT userToken stored in localStorage
    }),
    getters: {
        isAuthenticated: (state) => !!state.userToken,
        currentState: (state) => state
    },

    actions: {
        async register(username: string, email: string, password: string) {
            const { data, error } = await useFetch(
                `${STRAPI_API_URL}/auth/local/register`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
                    },
                    body: {
                        username,
                        email,
                        password,
                    },
                }
            );

            if (error.value) {
                throw new Error(error.value.data.error.message)
            }
            if (data.value) {
                this.user = {username: data.value.user.username}
                this.userToken = data.value.jwt
            }
            console.log({user: this.user})
            console.log({token: this.userToken})
        },

        async login(email: string, password: string) {
            const { data, error } = await useFetch(`${STRAPI_API_URL}/auth/local`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${STRAPI_TOKEN_USER}`,
                },
                body: {
                    identifier: email,
                    password,
                },
            });
            if (error.value) {
                console.error("Login error:", error)
                // throw error
                throw new Error(error.value.data.error.message)
            }
            if (data.value) {
                this.user = data.value.user
                this.userToken = data.value.jwt
                console.log({token: this.userToken})
            }
        },

        async fetchUser() {
            if (this.userToken) {
                const { data, error } = await useFetch(`${STRAPI_API_URL}/users/me`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${this.userToken}` },
                })
                this.user = data.value.user
                if (error.value) {
                    console.error("Fetch user error:", error)
                    // throw error
                    throw new Error(error.value.data.error.message)
                    this.logout()  // Clear user and userToken if userToken is invalid
                }
            }
        },

        logout() {
            this.user = null
            this.userToken = null
        },

        autoLogin() {
            const userToken = localStorage.getItem('userToken')
            if (userToken) {
                const decodedToken = jwtDecode(userToken)
                const currentTime = Date.now() / 1000

                if (decodedToken.exp > currentTime) {
                    this.userToken = userToken
                    this.fetchUser()  // Fetch the user if the userToken is valid
                } else {
                    this.logout()
                }
            }
        },
    },
})
