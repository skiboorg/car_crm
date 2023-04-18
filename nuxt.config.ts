// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'primevue/resources/themes/tailwind-light/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',


    ],
    build: {
        transpile: ['primevue']
    },
    ssr: false,


    runtimeConfig: {
        public:{
            apiUrl: 'http://localhost:8000',

        }

    },
})
