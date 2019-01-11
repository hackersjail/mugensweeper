<template>
  <section class="container">
    <modal v-if="overlay" @closeOverlay="closeOverlay" />
    <user-name-input v-if="visibleName" @register-name="registerName" />
    <ranking v-if="visibleRanking" :ranked-users="rankedUsers" />

    <div class="field" @click.left="getRelativeCoordinates">
      <svg viewbox="0 0 100% 100%" width="100%" height="100%">
        <line
          class="border-x"
          v-for="i in gridY + infinitLine"
          :key="'borderX' + i"
          :x2="$window.width"
          :y1="borderPos(i).y"
          :y2="borderPos(i).y"
        />

        <line
          class="border-y"
          v-for="i in gridX + infinitLine"
          :key="'borderY' + i"
          :x1="borderPos(i).x"
          :x2="borderPos(i).x"
          :y2="$window.height"
        />

        <rect
          class="rect"
          v-for="(block, i) in blocks"
          :key="'block' + i"
          :x="objPos(block).x"
          :y="objPos(block).y"
          :width="gridWidth"
          :height="gridWidth"
        />

        <!-- 原点がわかりやすいように識別 -->
        <rect
          class="rect2"
          :x="objPos(originOfCoordinates).x"
          :y="objPos(originOfCoordinates).y"
          :width="gridWidth"
          :height="gridWidth"
        />
      </svg>
    </div>

    <div class="target">
      <div
        v-for="(block, i) in blocks"
        :class="{ 'splite-bomb': block.exploded }"
        :style="styles(block)"
        :key="i"
      />
    </div>
  </section>
</template>

<script>
import Modal from '~/components/Modal.vue';
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
    Modal,
    Ranking,
    UserNameInput,
  },
  computed: {
    ...mapState(['userName', 'token', 'rankedUsers', 'blocks', 'gridX']),
    gridWidth() {
      return this.$window.width / this.gridX;
    },
    gridY() {
      return Math.ceil(this.$window.height / this.gridWidth);
    },
    infinitLine() {
      // 盤面が現表示領域のみであれば1、画面スクロール可能にして無限に盤面が続いているように見せるには2に変更
      return 1;
    },
    centerPos() {
      return {
        x: this.$window.width / 2,
        y: this.$window.height / 2,
      };
    },
    objPos() {
      return (object) => ({
        x: this.centerPos.x + this.gridWidth * object.x - this.gridWidth / 2,
        y: this.centerPos.y + this.gridWidth * object.y - this.gridWidth / 2,
      });
    },
    borderPos() {
      return (i) => ({
        x:
          this.centerPos.x -
          // Gridの中心が座標となるよう修正
          this.gridWidth / 2 -
          // 画面サイズとグリッド幅から始点計算
          Math.ceil(this.$window.width / 2 / this.gridWidth) * this.gridWidth +
          this.gridWidth * (i - 1),
        y:
          this.centerPos.y - // 中心座標
          // Gridの中心が座標となるよう修正
          this.gridWidth / 2 -
          // 画面サイズとグリッド幅から始点
          Math.ceil(this.$window.height / 2 / this.gridWidth) * this.gridWidth +
          this.gridWidth * (i - 1),
      });
    },
    originOfCoordinates() {
      return { x: 0, y: 0 };
    },
    visibleName() {
      return !this.token && !this.overlay;
    },
    visibleRanking() {
      return this.token && !this.overlay;
    },
  },
  methods: {
    ...mapActions(['getAccessToken', 'getField', 'postField']),
    registerName(inputName) {
      this.getAccessToken(inputName);
    },
    closeOverlay() {
      this.overlay = false;
      this.init();
    },
    init() {
      this.setIntervalObj = setInterval(() => {
        this.getField();
      }, 1000);
    },
    styles(block) {
      if (!block.exploded) return false;
      return {
        top: `${this.centerPos.y + this.gridWidth * block.y - this.gridWidth / 2}px`,
        left: `${this.centerPos.x + this.gridWidth * block.x - this.gridWidth / 2}px`,
      };
    },
    getRelativeCoordinates(e) {
      const block = {
        // 原点移動量の調整は今時点では行わない
        x: Math.round((e.pageX - this.centerPos.x) / this.gridWidth),
        y: -Math.round((e.pageY - this.centerPos.y) / this.gridWidth),
      };
      this.postField(block, this.userName);
    },
  },
};
</script>

<style>
.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.field {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
}
.target {
  width: 100%;
  height: 100%;
}
.border-x,
.border-y {
  stroke: black;
  stroke-width: 1px;
}
.rect {
  fill: lightgray;
  stroke: black;
  stroke-width: 0.5px;
}
.splite-bomb {
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-position: -301px 0px;
  width: 30px;
  height: 30px;
  position: relative;
}
/* 原点がわかりやすいように識別 */
.rect2 {
  fill: yellow;
  stroke: black;
  stroke-width: 0.5px;
}
</style>
