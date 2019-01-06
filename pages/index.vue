<template>
  <section class="container">
    <modal v-if="overlay" @closeOverlay="closeOverlay" />
    <user-name-input v-if="!token && !overlay" @register-name="registerName" />
    <ranking v-if="token && !overlay" :ranked-users="rankedUsers" />

    <div class="field" @click.left="getRelativeCoordinates">
      <svg viewbox="0 0 100% 100%" width="100%" height="100%">
        <line
          class="border-x"
          v-for="i in gridY + infinitLine"
          :key="'borderX' + i"
          x1="0"
          :x2="$window.width"
          :y1="calcBorderPos(i).y"
          :y2="calcBorderPos(i).y"
        />

        <line
          class="border-y"
          v-for="i in gridX + infinitLine"
          :key="'borderY' + i"
          :x1="calcBorderPos(i).x"
          :x2="calcBorderPos(i).x"
          y1="0"
          :y2="$window.height"
        />

        <rect
          class="rect"
          v-for="(block, i) in blocks"
          :key="'block' + i"
          :x="calcObjPos(block).x"
          :y="calcObjPos(block).y"
          :width="calcGridWidth()"
          :height="calcGridWidth()"
        />

        <!-- 原点がわかりやすいように識別 -->
        <rect
          class="rect2"
          :x="calcObjPos(originOfCoordinates).x"
          :y="calcObjPos(originOfCoordinates).y"
          :width="calcGridWidth()"
          :height="calcGridWidth()"
        />
      </svg>
    </div>

    <div class="target">
      <div
        v-for="(block, i) in blocks"
        :class="{ 'splite-bomb': explodeBlock(block) }"
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
    calcGridWidth() {
      return () => this.$window.width / this.gridX;
    },
    gridY() {
      return Math.ceil(this.$window.height / this.calcGridWidth());
    },
    infinitLine() {
      // 盤面が現表示領域のみであれば1、画面スクロール可能にして無限に盤面が続いているように見せるには2に変更
      return 1;
    },
    calcCenterPos() {
      return () => ({
        x: this.$window.width / 2,
        y: this.$window.height / 2,
      });
    },
    calcObjPos() {
      return (object) => {
        const centerPos = this.calcCenterPos();
        const gridWidth = this.calcGridWidth();
        return {
          x: centerPos.x + gridWidth * object.x - gridWidth / 2,
          y: centerPos.y + gridWidth * object.y - gridWidth / 2,
        };
      };
    },
    calcBorderPos() {
      return (i) => {
        const gridWidth = this.calcGridWidth();
        return {
          x:
            this.calcCenterPos().x -
            // Gridの中心が座標となるよう修正
            gridWidth / 2 -
            // 画面サイズとグリッド幅から始点計算
            Math.ceil(this.$window.width / 2 / gridWidth) * gridWidth +
            gridWidth * (i - 1),
          y:
            this.calcCenterPos().y - // 中心座標
            // Gridの中心が座標となるよう修正
            gridWidth / 2 -
            // 画面サイズとグリッド幅から始点
            Math.ceil(this.$window.height / 2 / gridWidth) * gridWidth +
            gridWidth * (i - 1),
        };
      };
    },
    originOfCoordinates() {
      return { x: 0, y: 0 };
    },
  },
  methods: {
    ...mapActions(['getAccessToken', 'getField']),
    registerName(inputName) {
      this.getAccessToken(inputName);
    },
    closeOverlay() {
      this.overlay = false;
      this.init();
    },
    init() {
      this.setIntervalObj = setInterval(async () => {
        await this.getField();
        await this.explodeBlock(this.blocks);
      }, 1000);
    },
    explodeBlock(block) {
      if (block.exploded) return true;
      return false;
    },
    styles(block) {
      if (this.explodeBlock(block)) {
        const centerPos = this.calcCenterPos();
        const gridWidth = this.calcGridWidth();
        return {
          top: `${centerPos.y + gridWidth * block.y - gridWidth / 2}px`,
          left: `${centerPos.x + gridWidth * block.x - gridWidth / 2}px`,
        };
      }
      return false;
    },
    getRelativeCoordinates(e) {
      const gridWidth = this.calcGridWidth;
      const centerPos = this.calcCenterPos;
      return {
        // 原点移動量の調整は今時点では行わない
        x: Math.round((e.pageX - centerPos.x) / gridWidth),
        y: -Math.round((e.pageY - centerPos.y) / gridWidth),
      };
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
