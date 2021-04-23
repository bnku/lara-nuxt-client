<template>
  <card title="Reset Password" class="my-6" form>
    <form @submit.prevent="reset" @keydown="form.onKeydown($event)" class="container my-4 mx-1">
      <b-notification v-if="status" type="is-success" aria-close-label="Close notification">
        {{ status }}
      </b-notification>

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

      <!-- Submit Button -->
      <b-button @click="reset" :loading="form.busy" expanded class="is-primary mt-5">
        Reset Password
      </b-button>
    </form>
  </card>
</template>

<script>
import Form from "vform";

export default {
  middleware: "guest",

  data: () => ({
    status: "",
    form: new Form({
      token: "",
      email: "",
      password: "",
      password_confirmation: "",
    }),
  }),

  head() {
    return { title: "Reset Password" };
  },

  created() {
    this.form.email = this.$route.query.email;
    this.form.token = this.$route.params.token;
  },

  methods: {
    reset() {
      this.form.post("/password/reset").then(({ data }) => {
        this.status = data.status;
        this.form.reset();
      });
    },
  },
};
</script>
