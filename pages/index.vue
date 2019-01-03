<template>
  <section class="container">
    <modal v-if="overlay" @closeOverlay="closeOverlay" />
    <div>
      <logo />
      <h1 class="title">mugensweeper</h1>
      <h2 class="subtitle">My glorious Nuxt.js project</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
    <ranking :ranked-users="rankedUsers" />
    <user-name-input v-if="!token" @register-name="registerName" />
    {{ userName }}
  </section>
</template>

<script>
import Modal from '~/components/Modal.vue';
import Logo from '~/components/Logo.vue';
import Ranking from '~/components/Ranking.vue';
import UserNameInput from '~/components/UserNameInput.vue';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      overlay: true,
    };
  },
  components: {
    Logo,
    Modal,
    Ranking,
    UserNameInput,
  },
  computed: {
    ...mapState(['userName', 'token', 'rankedUsers']),
  },
  methods: {
    ...mapActions(['getAccessToken']),
    registerName(inputName) {
      this.getAccessToken(inputName);
    },
    closeOverlay() {
      this.overlay = false;
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
