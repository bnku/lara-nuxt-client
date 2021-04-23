<template>
  <card title="Your Info">
    <form @submit.prevent="update" @keydown="form.onKeydown($event)" class="my-4 mx-1">
      <b-notification v-if="status" type="is-success" aria-close-label="Close notification">
        Your info has been updated!
      </b-notification>

      <!-- Name -->
      <b-field
        :type="{ 'is-danger': form.errors.has('name') }"
        :message="form.errors.has('name') ? form.errors.errors.name[0] : ''"
        label="Name"
      >
        <b-input placeholder="Name" required v-model="form.name" type="text" icon="signature" size="is-medium" />
      </b-field>

      <!-- Email -->
      <b-field
        :type="{ 'is-danger': form.errors.has('email') }"
        :message="form.errors.has('email') ? form.errors.errors.email[0] : ''"
        label="Email"
      >
        <b-input placeholder="Email" required v-model="form.email" type="email" icon="envelope" size="is-medium" />
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
import { mapGetters } from "vuex";

export default {
  scrollToTop: false,

  data: () => ({
    form: new Form({
      name: "",
      email: "",
    }),
    status: "",
  }),

  head() {
    return { title: "Settings" };
  },

  computed: mapGetters({
    user: "auth/user",
  }),

  created() {
    // Fill the form with user data.
    this.form.keys().forEach((key) => {
      this.form[key] = this.user[key];
    });
  },

  methods: {
    update() {
      this.form.patch("/settings/profile").then((data) => {
        this.status = data.status == 200;
        this.$store.dispatch("auth/updateUser", { user });
      });
    },
  },
};
</script>
