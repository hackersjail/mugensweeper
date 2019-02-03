<template>
  <transition name="modal">
    <div class="modalLayer">
      <div class="initMsg">
        <img class="logo" src="~/assets/logo.png" />
        <div class="startBtn" @click="$emit('closeOverlay')">START</div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modalLayer {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 5, 30, 0.76);
  z-index: 100;
}
.initMsg {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}
.logo {
  width: 700px;
  margin-left: 40px;
}
.startBtn {
  margin: 20px auto 0;
  color: #fff;
  background: rgba(0, 13, 30, 0.8);
  border: 3px solid #fff;
  border-radius: 5px;
  font-size: 30px;
  width: 200px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.4s;
}
.startBtn:hover {
  color: #020;
  background: #fff;
}
@media screen and (max-width: 700px) {
  .startBtn {
    width: 40%;
  }

  .logo {
    width: 100%;
    margin-left: 20px;
  }
}
</style>
