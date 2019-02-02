<template>
  <section class="container">
    <modal v-if="overlay" @closeOverlay="closeOverlay" />
    <user-name-input v-if="visibleName" @register-name="registerName" />
    <ranking v-if="visibleRanking" :pointData="pointData" />

    <div
      class="field"
      @touchstart="onTouchStart"
      @mousedown="setInitPos"
      @touchmove.prevent="onTouchMove"
      @mousemove="gridMove"
      @touchend.prevent="onTouchEnd"
      @touchcancel.prevent="onTouchEnd"
      @mouseup.prevent="onTouchEnd"
      @contextmenu.prevent
    >
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
        <!-- <div
          class="tirol"
          v-for="(block, i) in blocks"
          :key="'block' + i"
          :x="objPos(block).x"
          :y="objPos(block).y"
          :width="gridWidth"
          :height="gridWidth"
        /> -->
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
        :class="blockJudge(block)"
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
import { mapState, mapActions, mapMutations } from 'vuex';

export const tirol = [];

export default {
  data() {
    return {
      overlay: true,
      touchTime: null,
      isRequestToOpen: false,
    };
  },
  components: {
    Modal,
    Ranking,
    UserNameInput,
  },
  computed: {
    ...mapState(['userName', 'token', 'blocks', 'pointData', 'gridX', 'moveDist', 'dragFlg']),
    gridWidth() {
      return this.$window.width / this.gridX;
    },
    gridY() {
      return Math.ceil(this.$window.height / this.gridWidth);
    },
    infinitLine() {
      // 盤面が現表示領域のみであれば1、画面スクロール可能にして無限に盤面が続いているように見せるには2に変更
      return 2;
    },
    centerPos() {
      return {
        x: this.$window.width / 2,
        y: this.$window.height / 2,
      };
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
          Math.ceil(this.$window.width / 2 / this.gridWidth) * this.gridWidth -
          // 移動量調整
          (this.moveDist.x % this.gridWidth) +
          this.gridWidth * (i - 1),
        y:
          this.centerPos.y - // 中心座標
          // Gridの中心が座標となるよう修正
          this.gridWidth / 2 -
          // 画面サイズとグリッド幅から始点
          Math.ceil(this.$window.height / 2 / this.gridWidth) * this.gridWidth +
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
    ...mapMutations(['setInitPos', 'gridMove', 'resetInitPos']),

    registerName(inputName) {
      this.getAccessToken(inputName);
      this.init(); // 新規に当ゲームを利用する場合は初期モーダル画面=>ユーザー名新規登録後に盤面情報の取得を開始
      // this.createTirol();
    },
    closeOverlay() {
      this.overlay = false;
      if (this.token) this.init(); // 過去に当ゲームを利用していた場合は初期モーダル画面close後に盤面情報の取得を開始
      // this.createTirol();
    },
    init() {
      this.setIntervalObj = setInterval(() => {
        this.getField();
        this.getPoint();
      }, 300);
    },
    // createTirol() {
    //   for (let t = -25; t < 25; t += 1) {
    //     for (let l = -25; l < 25; l += 1) {
    //       this.tirol.push({ x: t, y: l });
    //     }
    //   }
    // },
    styles(block) {
      if (!block.exploded && block.bombCount === 0) return false;
      return {
        top: `${this.centerPos.y +
          this.gridWidth * block.y -
          this.gridWidth / 2 +
          this.moveDist.y +
          this.gridWidth * 0.1}px`,
        left: `${this.centerPos.x +
          this.gridWidth * block.x -
          this.gridWidth / 2 -
          this.moveDist.x +
          this.gridWidth * 0.1}px`,
        backgroundPosition: `${block.exploded ? 77 : (block.bombCount - 1) * 7.5}% 50%`,
        width: `${this.gridWidth * 0.8}px`,
        height: `${this.gridWidth * 0.8}px`,
      };
    },
    onTouchStart(e) {
      // ダブルタップ無効化
      if (Date.now() - this.touchTime < 350) {
        e.preventDefault();
      }
      // drag基準地点
      const position = {
        x: e.pageX || e.changedTouches[0].clientX,
        y: e.pageY || e.changedTouches[0].clientY,
      };
      this.setInitPos(position);
    },
    onTouchMove(e) {
      // drag現在地点
      const movePos = {
        x: e.pageX || e.changedTouches[0].clientX,
        y: e.pageY || e.changedTouches[0].clientY,
      };
      this.gridMove(movePos);
    },
    async onTouchEnd(e) {
      this.touchTime = Date.now();
      this.resetInitPos();

      if (!this.dragFlg) {
        const block = {
          x: Math.round((e.pageX - this.centerPos.x + this.moveDist.x) / this.gridWidth),
          y: Math.round((e.pageY - this.centerPos.y - this.moveDist.y) / this.gridWidth),
          isRequestToOpen: e.which === 1,
        };
        await this.postField(block);
      }
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
  /* background-image: url('../assets/tirol.png'); */
}
.field {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
.rect2 {
  fill: yellow;
  stroke: black;
  stroke-width: 0.5px;
}
</style>
