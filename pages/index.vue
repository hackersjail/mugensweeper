<template>
  <section class="container">
    <div v-if="!token"><user-name-input :nameInput="nameInput" /></div>
    {{ userName }}
  </section>
</template>

<script>
import UserNameInput from '~/components/UserNameInput.vue';
import { mapState } from 'vuex';

export default {
  components: {
    UserNameInput,
  },
  data() {
    return {
      nameInput: true,
    };
  },
  computed: {
    ...mapState(['userName', 'token']),
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
