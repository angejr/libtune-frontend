import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
    state: () => ({
        error: ref(null),   // eror object
    }),
    actions: {
        setError(error: any) {
            this.error = error;
        }
    },
})
