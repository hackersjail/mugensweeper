<template>
  <table class="rankingLayer">
    <tr v-for="(user, i) in orderedUsers" :key="i">
      <div v-if="i < upperRankingNumber">
        <td>{{ i + 1 }}</td>
        <td>{{ user.userName }}</td>
        <td>{{ user.userScore }}</td>
      </div>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    rankedUsers: [],
  },
  computed: {
    orderedUsers() {
      return [...this.rankedUsers].sort((user1, user2) => user2.userScore - user1.userScore);
    },
    upperRankingNumber() {
      return 5;
    },
  },
};
</script>

<style scoped>
.rankingLayer {
  width: 100%;
  height: 100%;
}
</style>
