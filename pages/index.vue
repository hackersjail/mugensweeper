<template>
  <section class="container">
    <modal v-if="overlay" @closeOverlay="closeOverlay" />
    <user-name-input v-if="visibleName" @register-name="registerName" />

    <div
      class="field"
      @wheel.prevent="onWheel"
      @touchstart.prevent="onTouchStart"
      @mousedown="setInitPos"
      @touchmove.prevent="onTouchMove"
      @mousemove="gridMove"
      @touchend.prevent="onTouchEnd"
      @touchcancel.prevent="onTouchEnd"
      @mouseup.prevent="onMouseup"
      @contextmenu.prevent
    >
      <svg viewbox="0 0 100% 100%" width="100%" height="100%">
        <line
          class="border-x"
          v-for="i in gridY + infinitLine"
          :key="'borderX' + i"
          :x2="windowSize.width"
          :y1="borderPos(i).y"
          :y2="borderPos(i).y"
        />
        <line
          class="border-y"
          v-for="i in gridX + infinitLine"
          :key="'borderY' + i"
          :x1="borderPos(i).x"
          :x2="borderPos(i).x"
          :y2="windowSize.height"
        />
        <rect
          class="rect"
          v-for="(block, i) in blocks"
          :class="explodeJudge(block)"
          :key="'block' + i"
          :x="objPos(block).x"
          :y="objPos(block).y"
          :width="gridWidth"
          :height="gridWidth"
        />
        <!-- 原点がわかりやすいように識別 -->
        <rect
          class="rect center-rect"
          :x="objPos(originOfCoordinates).x"
          :y="objPos(originOfCoordinates).y"
          :width="gridWidth"
          :height="gridWidth"
        />
      </svg>

      <div class="target">
        <div
          v-for="(block, i) in blocks"
          :class="blockJudge(block)"
          :style="styles(block)"
          :key="i"
        />
      </div>

      <ranking v-if="visibleRanking" :pointData="pointData" />
    </div>
  </section>
</template>

<script>
import Modal from '~/components/Modal.vue';
import Ranking from '~/components/Ranking.vue';
import UserNameInput from '~/components/UserNameInput.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import calcDistance from '~/utils/calcDistance';

const ZOOMING_STEP = 10;

export default {
  data() {
    return {
      overlay: true,
      isRequestToOpen: false,
      zoomingOnMobile: false,
      prevDistanceForZooming: 0,
    };
  },
  components: {
    Modal,
    Ranking,
    UserNameInput,
  },
  computed: {
    ...mapState([
      'gridWidth',
      'userName',
      'token',
      'blocks',
      'pointData',
      'moveDist',
      'dragFlg',
      'windowSize',
    ]),
    ...mapGetters(['gridX', 'gridY', 'centerPos']),
    infinitLine() {
      // 盤面が現表示領域のみであれば1、画面スクロール可能にして無限に盤面が続いているように見せるには2に変更
      return 2;
    },
    objPos() {
      return (object) => ({
        x: this.centerPos.x + this.gridWidth * object.x - this.gridWidth / 2 - this.moveDist.x, // 原点移動量調整
        y: this.centerPos.y + this.gridWidth * object.y - this.gridWidth / 2 + this.moveDist.y, // 原点移動量調整
      });
    },
    borderPos() {
      return (i) => ({
        x:
          this.centerPos.x -
          // Gridの中心が座標となるよう修正
          this.gridWidth / 2 -
          // 画面サイズとグリッド幅から始点計算
          Math.ceil(this.centerPos.x / this.gridWidth) * this.gridWidth -
          // 移動量調整
          (this.moveDist.x % this.gridWidth) +
          this.gridWidth * (i - 1),
        y:
          this.centerPos.y - // 中心座標
          // Gridの中心が座標となるよう修正
          this.gridWidth / 2 -
          // 画面サイズとグリッド幅から始点
          Math.ceil(this.centerPos.y / this.gridWidth) * this.gridWidth +
          // 移動量調整
          (this.moveDist.y % this.gridWidth) +
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
      return this.pointData && !this.overlay;
    },
    blockJudge() {
      return (block) => ({
        'splite-bomb': block.exploded || block.bombCount !== 0,
      });
    },
    explodeJudge() {
      return (block) => ({
        exploded: block.exploded,
        opened: !block.exploded,
      });
    },
  },
  methods: {
    ...mapActions(['getAccessToken', 'getPoint', 'getField', 'postField']),
    ...mapMutations(['setInitPos', 'gridMove', 'resetInitPos', 'changeGridWidth', 'setGridX']),
    async registerName(inputName) {
      await this.getAccessToken(inputName);
      this.init(); // 新規に当ゲームを利用する場合は初期モーダル画面=>ユーザー名新規登録後に盤面情報の取得を開始
    },
    closeOverlay() {
      this.overlay = false;
      if (this.token) this.init(); // 過去に当ゲームを利用していた場合は初期モーダル画面close後に盤面情報の取得を開始
    },
    init() {
      this.setIntervalObj = setInterval(() => {
        this.getField();
        this.getPoint();
      }, 300);
    },
    styles(block) {
      if (!block.exploded && block.bombCount === 0) return false;
      const imgRatio = 0.8;

      return {
        top: `${this.centerPos.y +
          this.gridWidth * (block.y - 0.5 + (1 - imgRatio) / 2) +
          this.moveDist.y}px`,
        left: `${this.centerPos.x +
          this.gridWidth * (block.x - 0.5 + (1 - imgRatio) / 2) -
          this.moveDist.x}px`,
        backgroundPosition: `${(block.exploded ? 10 : block.bombCount - 1) * (100 / 13)}% 50%`,
        width: `${this.gridWidth * imgRatio}px`,
        height: `${this.gridWidth * imgRatio}px`,
      };
    },
    onTouchStart({ touches }) {
      switch (touches.length) {
        case 1:
          this.setInitPos({
            x: touches[0].pageX,
            y: touches[0].pageY,
          });
          break;
        case 2:
          this.zooming = false;
          this.prevDistanceForZooming = calcDistance(touches);
          break;
        default:
          break;
      }
    },
    onTouchMove({ touches }) {
      switch (touches.length) {
        case 1:
          if (!this.zooming) {
            this.gridMove({
              x: touches[0].pageX,
              y: touches[0].pageY,
            });
          }
          break;
        case 2: {
          const distance = calcDistance(touches);
          const delta = this.prevDistanceForZooming - distance;
          if (Math.abs(delta) >= ZOOMING_STEP) {
            this.changeGridWidth(delta > 0 ? -1 : 1);
            this.prevDistanceForZooming = distance;
          }
          break;
        }
        default:
          break;
      }
    },
    async onTouchEnd(e) {
      if (this.zooming && e.touches.length === 0) {
        this.zooming = false;
      } else {
        await this.onMouseup(e.changedTouches[0]);
      }
    },
    async onMouseup({ pageX, pageY }) {
      if (!this.dragFlg) {
        const block = {
          x: Math.round((pageX - this.centerPos.x + this.moveDist.x) / this.gridWidth),
          y: Math.round((pageY - this.centerPos.y - this.moveDist.y) / this.gridWidth),
          isRequestToOpen: true,
        };
        await this.postField(block);
      }

      this.resetInitPos();
    },
    onWheel(e) {
      const block = {
        x: Math.round((e.pageX - this.centerPos.x + this.moveDist.x) / this.gridWidth),
        y: Math.round((e.pageY - this.centerPos.y - this.moveDist.y) / this.gridWidth),
      };
      const pointerPos = {
        x: e.pageX - this.centerPos.x + this.moveDist.x,
        y: e.pageY - this.centerPos.y - this.moveDist.y,
      };
      const direction = e.deltaY > 0 ? -1 : 1;
      this.changeGridWidth({ direction, block, pointerPos });
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
  background-color: gray;
}
.field {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  user-select: none;
}
.target {
  width: 100%;
  height: 100%;
}
.border-x,
.border-y {
  stroke: rgb(194, 194, 194);
  stroke-width: 1px;
}
.rect {
  fill: lightgray;
  stroke: rgb(126, 126, 126);
  stroke-width: 0.5px;
}
.exploded {
  animation: blink 150ms linear 2;
}
@keyframes blink {
  0% {
    fill: lightgray;
  }
  100% {
    fill: rgb(235, 12, 12);
  }
}
.opened {
  animation: right 100ms ease-in-out 1;
}
@keyframes right {
  0% {
    stroke: rgb(126, 126, 126);
  }
  100% {
    stroke: rgba(12, 127, 235, 0.5);
    stroke-width: 6px;
  }
}
.splite-bomb {
  overflow: hidden;
  background-image: url('../assets/img.png');
  background-repeat: no-repeat;
  background-size: 1400% 100%;
  position: fixed;
}
/* 原点がわかりやすいように識別 */
.center-rect {
  fill: yellow;
}
</style>
