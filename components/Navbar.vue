<template>
  <b-navbar spaced>
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ name: 'welcome' }">
        <h1 class="logo title is-3">{{ appName }}</h1>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/home' }" v-if="user">
        Home
      </b-navbar-item>
    </template>

    <template #end v-if="user">
      <b-navbar-dropdown hoverable right :collapsible="false" class="usermenu">
        <template #label>
          <img :src="user.photo_url" class="avatar" />
          <span>{{ user.name }}</span>
        </template>
        <b-navbar-item tag="router-link" :to="{ name: 'settings.profile' }">
          <b-icon icon="cog" />
          Settings
        </b-navbar-item>
        <b-navbar-item @click.prevent="logout">
          <b-icon icon="sign-out-alt" />
          Logout
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>
    <template #end v-else>
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link :to="{ name: 'register' }" class="button is-light">
            Register
          </router-link>
          <router-link :to="{ name: 'login' }" class="button is-primary">
            Log In
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},

  data: () => ({
    appName: process.env.appName,
  }),

  computed: mapGetters({
    user: "auth/user",
  }),

  methods: {
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");

      // Redirect to login.
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  background: linear-gradient(to right, #48289e, #7957d5);
  color: transparent;
  background-clip: text;
}
.avatar {
  margin-right: 10px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}
.usermenu {
  ::v-deep.navbar-link {
    display: flex;
  }
  .icon {
    margin-right: 5px;
  }
}
</style>
