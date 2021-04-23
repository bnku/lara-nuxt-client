<template>
  <card title="Home">
    <div class="container my-4 mx-1">
      You are logged in!
    </div>
  </card>
</template>

<script>
export default {
  middleware: "auth",

  head() {
    return { title: "Home" };
  },
};
</script>
