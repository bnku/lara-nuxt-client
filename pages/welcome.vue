<template>
  <div class="hero is-medium">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title"><span class="laravel">Laravel</span><span class="nuxt">Nuxt</span></p>

        <p class="subtitle">Lara-Nuxt + Buefy</p>
        <div class="is-flex is-justify-content-center is-align-items-center">
          <b-icon pack="fab" icon="github" />
          <a href="https://github.com/bnku/lara-nuxt-client" target="_blank">bnku/lara-nuxt-client</a>
        </div>
        <div class="is-flex is-justify-content-center is-align-items-center">
          <b-icon pack="fab" icon="github" />
          <a href="https://github.com/cretueusebiu/laravel-nuxt" target="_blank">cretueusebiu/laravel-nuxt</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    title: process.env.appName,
  }),

  head() {
    return { title: "Home" };
  },

  computed: mapGetters({
    authenticated: "auth/check",
  }),
};
</script>

<style scoped>
.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}

.title {
  font-size: 85px;
}

.laravel {
  color: #2e495e;
}

.nuxt {
  color: #00c48d;
}
</style>
