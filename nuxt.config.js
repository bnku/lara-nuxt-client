require("dotenv").config();
const { join } = require("path");
const { copySync, removeSync } = require("fs-extra");

module.exports = {
  ssr: true,

  srcDir: __dirname,

  env: {
    apiUrl: process.env.API_URL,
    appName: process.env.APP_NAME || "Laravel Nuxt",
    githubAuth: !!process.env.GITHUB_CLIENT_ID,
  },

  head: {
    title: process.env.APP_NAME,
    titleTemplate: "%s - " + process.env.APP_NAME,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  loading: { color: "#007bff" },

  router: {
    middleware: ["check-auth"],
  },

  css: [{ src: "~assets/sass/app.scss", lang: "scss" }],

  plugins: [
    "~components/global",
    "~plugins/vform",
    "~plugins/axios",
    "~plugins/nuxt-client-init",
  ],

  modules: ["@nuxtjs/router", "nuxt-buefy"],

  buildModules: ["@nuxtjs/fontawesome"],

  buefy: {
    defaultIconPack: "fas",
    defaultIconComponent: "FontAwesomeIcon",
    materialDesignIcons: false,
  },

  fontawesome: {
    icons: {
      solid: [
        "faCog",
        "faSignOutAlt",
        "faEnvelope",
        "faKey",
        "faEye",
        "faEyeSlash",
        "faExclamationTriangle",
        "faSignature",
        "faUser",
      ],
      brands: ["faGithub"],
    },
  },

  build: {
    extractCSS: true,
  },

  watchers: {
    webpack: {
      ignored: /node_modules/,
    },
  },

  hooks: {
    generate: {
      done(generator) {
        // Copy dist files to public/_nuxt
        if (generator.nuxt.options.dev === false && generator.nuxt.options.mode === "spa") {
          const publicDir = join(generator.nuxt.options.rootDir, "public", "_nuxt");
          removeSync(publicDir);
          copySync(join(generator.nuxt.options.generate.dir, "_nuxt"), publicDir);
          copySync(join(generator.nuxt.options.generate.dir, "200.html"), join(publicDir, "index.html"));
          removeSync(generator.nuxt.options.generate.dir);
        }
      },
    },
  },
};
