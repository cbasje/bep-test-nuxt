export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Heat City Map',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/dotenv',
    '@nuxtjs/device',
    '@nuxtjs/svg',
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-leaflet',

    [
      'nuxt-supabase',
      {
        supabaseUrl: process.env.VUE_APP_SUPABASE_URL,
        supabaseKey: process.env.VUE_APP_SUPABASE_KEY,
      },
    ],
  ],

  env: {
    VUE_APP_SUPABASE_URL: 'https://euyaospnwgppzjrgidjj.supabase.co',
    VUE_APP_SUPABASE_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzUzMDgwOCwiZXhwIjoxOTQ5MTA2ODA4fQ.m6JZ0Ya6g_qFyFp-eGpQ33azT1Yqq2fYL8DfowV256E',
    VUE_APP_MAPBOX_TOKEN:
      'pk.eyJ1IjoiYmVuamFtaWluIiwiYSI6ImNraWt5OW14aDBlZzgycWw0aGc3YjVnZmwifQ.Y0rTPF_rYzK10v2Ydogsag',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Color mode module
  colorMode: {
    preference: 'system',
    classSuffix: '',
  },

  // Moment module
  moment: {
    defaultLocale: 'nl',
    locales: ['nl'],
    timezone: true,
    defaultTimezone: 'Europe/Amsterdam'
  }
}
