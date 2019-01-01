<template>
  <section class="container">
    <user-name-input v-if="!token" @register-name="registerName" />
    {{ userName }}
  </section>
</template>

<script>
import UserNameInput from '~/components/UserNameInput.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    UserNameInput,
  },
  computed: {
    ...mapState(['userName', 'token']),
  },
  methods: {
    ...mapActions(['getAccessToken']),
    registerName(inputName) {
      this.getAccessToken(inputName);
    },
  },
};
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
