<template>
  <table class="modalLayer">
    <tr v-for="(user, i) in orderedUsers" :key="i">
      <div v-if="i < 5">
        <td>{{ i + 1 }}</td>
        <td>{{ user.userName }}</td>
        <td>{{ user.userScore }}</td>
      </div>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { userId: 1, userName: 'mishima', userScore: 123 },
        { userId: 2, userName: 'shiratsuchi', userScore: 124 },
        { userId: 3, userName: 'miyamoto', userScore: 125 },
        { userId: 4, userName: 'ryoko', userScore: 126 },
        { userId: 5, userName: 'hiroshima', userScore: 127 },
        { userId: 6, userName: 'etoh', userScore: 128 },
        { userId: 7, userName: 'matsuda', userScore: 129 },
      ],
    };
  },
  computed: {
    orderedUsers() {
      return [...this.users].sort((user1, user2) => user2.userScore - user1.userScore);
    },
  },
};
</script>

<style scoped>
.modalLayer {
  width: 100%;
  height: 100%;
}
</style>
