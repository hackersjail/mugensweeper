<template>
  <transition name="modal">
    <div class="modalLayer">
      <div class="initMsg">
        <div class="title">Mugen Sweeper</div>
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
  width: 80%;
  height: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.title {
  color: #fff;
  font-size: 80px;
  font-weight: bold;
  font-family: serif;
}
.startBtn {
  margin: 30px auto 0;
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
@media screen and (max-width: 800px) {
  .startBtn {
    width: 40%;
  }
}
</style>
