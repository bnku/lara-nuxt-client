<template>
  <card title="Your Password">
    <form @submit.prevent="update" @keydown="form.onKeydown($event)" class="my-4 mx-1">
      <!-- <alert-success :form="form" message="Your password has been updated!" /> -->
      <b-notification v-if="status" type="is-success" aria-close-label="Close notification">
        Your password has been updated!
      </b-notification>

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

      <b-button @click="update" :loading="form.busy" class="is-primary mr-2">
        Update
      </b-button>
    </form>
  </card>
</template>

<script>
import Form from "vform";

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      password: "",
      password_confirmation: "",
    }),
    status: "",
  }),

  head() {
    return { title: "Settings" };
  },

  methods: {
    update() {
      this.form.patch("/settings/password").then((data) => {
        this.status = data.status == 200;
        this.form.reset();
      });
    },
  },
};
</script>
