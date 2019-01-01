<template>
  <section>
    <!-- モーダルウィンドウ -->
    <div v-if="nameInput" class="modalContent">
      <!-- モーダルウィンドウのコンテンツ開始 -->
      <div class="modalContentInnar">
        <!-- <div class="title">ユーザー名登録</div> -->
        <h2 class="explain">ユーザー名登録</h2>
        <h5 class="explain">3文字以上、7文字以下でご登録ください。</h5>
        <form class="form" @submit.prevent="registName">
          <input type="text" class="input" v-model="name" minlength="3" maxlength="7" required />
          <div class="registBtn" @click="registName">登録</div>
        </form>
      </div>
      <!-- モーダルウィンドウのコンテンツ終了 -->
    </div>
    <div class="modalBg" />
    <!-- モーダルウィンドウ -->
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['nameInput'],
  data() {
    return {
      name: '',
    };
  },
  methods: {
    ...mapActions(['getAccessToken']),
    // modalSet() {
    //   const modalContent = document.getElementById('modalContent');
    //   const modalContentInnar = document.getElementById('modalContentInnar');
    //   const w = window.innerWidth;
    //   const h = window.innerHeight;
    //   const cw = modalContentInnar.getBoundingClientRect().width;
    //   const ch = modalContentInnar.getBoundingClientRect().height;

    //   // 取得した値をcssに追加する
    //   modalContent.style.left = `${(w - cw) / 2}px`;
    //   modalContent.style.top = `${+((h - ch) / 2)}px`;
    // },
    registName() {
      this.getAccessToken(this.name);
    },
  },
};
</script>

<style>
.form {
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
  width: auto;
  text-align: center;
}

.explain {
  color: #fff;
}

.input {
  color: #000;
  border: 3px solid #fff;
  border-radius: 5px;
  font-size: 30px;
  width: 200px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}

.registBtn {
  margin-left: 5px;
  color: #fff;
  border: 3px solid #fff;
  border-radius: 5px;
  font-size: 30px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
  cursor: pointer;
  padding: 0 5px;
  box-sizing: border-box;
  width: 80px;
}

.modalContent {
  background: transparent;
  position: fixed;
  z-index: 2;
  top: calc(50% - 150px / 2);
  left: calc(50% - 250px / 2);
}

.modalContentInnar {
  margin: 0 auto;
  width: 100%;
  z-index: 2;
}

.modalBg {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%;
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
