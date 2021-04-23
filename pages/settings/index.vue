<template>
  <div>
    <b-tabs vertical v-model="tab">
      <b-tab-item :label="tab.name" v-for="tab in tabs" :key="tab.route">
        <template #header>
          <b-navbar-item tag="span" :to="{ name: tab.route }">
            <b-icon :icon="tab.icon"></b-icon>
            {{ tab.name }}
          </b-navbar-item>
        </template>
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
export default {
  middleware: "auth",

  data() {
    return {
      tab: 0,
    };
  },

  watch: {
    tab() {
      this.$router.push({ name: this.tabs[this.tab].route });
    },
  },

  computed: {
    tabs() {
      return [
        {
          icon: "user",
          name: "Profile",
          route: "settings.profile",
        },
        {
          icon: "key",
          name: "Password",
          route: "settings.password",
        },
      ];
    },
  },
};
</script>

<style>
.settings-card .card-body {
  padding: 0;
}
</style>
