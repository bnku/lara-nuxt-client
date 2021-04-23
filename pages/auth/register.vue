<template>
  <card v-if="mustVerifyEmail" title="Register" class="my-6" form>
    <div class="m-2">
      We sent you an email with an the verification link.
    </div>
  </card>
  <card v-else title="Register" class="my-6" form>
    <form @submit.prevent="register" @keydown="form.onKeydown($event)" class="container my-4 mx-1">
      <!-- Name -->
      <b-field
        :type="{ 'is-danger': form.errors.has('name') }"
        :message="form.errors.has('name') ? form.errors.errors.name[0] : ''"
      >
        <b-input placeholder="Name" required v-model="form.name" type="text" icon="signature" size="is-medium" />
      </b-field>

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

      <!-- Password Confirmation -->
      <b-field
        :type="{ 'is-danger': form.errors.has('password_confirmation') }"
        :message="form.errors.has('password_confirmation') ? form.errors.errors.password_confirmation[0] : ''"
      >
        <b-input
          placeholder="Confirm Password"
          required
          v-model="form.password_confirmation"
          type="password"
          icon="key"
          size="is-medium"
          password-reveal
        />
      </b-field>

      <b-field grouped class="mt-5">
        <b-button @click="register" :loading="form.busy" expanded class="is-primary mr-2">
          Register
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
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    }),
    mustVerifyEmail: false,
  }),

  head() {
    return { title: "Register" };
  },

  methods: {
    async register() {
      let data;

      // Register the user.
      try {
        const response = await this.form.post("/register");
        data = response.data;
      } catch (e) {
        return;
      }

      // Must verify email fist.
      if (data.status) {
        this.mustVerifyEmail = true;
      } else {
        // Log in the user.
        const {
          data: { token },
        } = await this.form.post("/login");

        // Save the token.
        this.$store.dispatch("auth/saveToken", { token });

        // Update the user.
        await this.$store.dispatch("auth/updateUser", { user: data });

        // Redirect home.
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
