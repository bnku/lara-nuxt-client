<template>
  <card title="Log In" class="my-6" form>
    <form @submit.prevent="login" @keydown="form.onKeydown($event)" class="container my-4 mx-1">
      <!-- Email -->
      <b-field
        :type="{ 'is-danger': form.errors.has('email') }"
        :message="form.errors.has('email') ? form.errors.errors.email[0] : ''"
      >
        <b-input placeholder="Email" required v-model="form.email" type="email" icon="envelope" size="is-medium" />
      </b-field>

      <!-- Password -->
      <b-field
        :type="{ 'is-danger': form.errors.has('password') }"
        :message="form.errors.has('password') ? form.errors.errors.password[0] : ''"
      >
        <b-input
          placeholder="Password"
          required
          v-model="form.password"
          type="password"
          icon="key"
          size="is-medium"
          password-reveal
        />
      </b-field>

      <!-- Remember Me -->
      <b-field grouped class="my-5">
        <b-field expanded>
          <b-checkbox v-model="remember" expanded>Remember me</b-checkbox>
        </b-field>

        <router-link :to="{ name: 'password.request' }" class="is-justify-self-flex-end">
          Forgot password
        </router-link>
      </b-field>

      <b-field grouped>
        <b-button @click="login" :loading="form.busy" expanded class="is-primary mr-2">
          Log In
        </b-button>
        <login-with-github expanded />
      </b-field>
    </form>
  </card>
</template>

<script>
import Form from "vform";

export default {
  middleware: "guest",

  data: () => ({
    form: new Form({
      email: "",
      password: "",
    }),
    remember: false,
  }),

  head() {
    return { title: "Log In" };
  },

  methods: {
    async login() {
      let data;

      // Submit the form.
      try {
        const response = await this.form.post("/login");
        data = response.data;
      } catch (e) {
        return;
      }

      // Save the token.
      this.$store.dispatch("auth/saveToken", {
        token: data.token,
        remember: this.remember,
      });

      // Fetch the user.
      await this.$store.dispatch("auth/fetchUser");

      // Redirect home.
      this.$router.push({ name: "home" });
    },
  },
};
</script>
