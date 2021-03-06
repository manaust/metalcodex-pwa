export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Satanica's Metalcodex",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/styles/normalize.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/pwa"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  pwa: {
    meta: {
      theme_color: "#e50914",
      mobileAppIOS: true,
      appleStatusBarStyle: "black"
    },
    manifest: {
      name: "Satanica's Metalcodex",
      short_name: "Metalcodex",
      background_color: "#e50914",
      start_url: "https://metalcodex.satanica.be/"
    }
  }
};
