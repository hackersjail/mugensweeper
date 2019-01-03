<template>
  <section class="container">
    <user-name-input v-if="!token" @register-name="registerName" />

    <div class="field">
      <svg viewbox="0 0 100% 100%" width="100%" height="100%">
        <line
          class="border-x"
          v-for="i in calcGridY() + 2"
          :key="'borderX' + i"
          x1="0"
          :x2="$window.width"
          :y1="calcBorderPos(i).y"
          :y2="calcBorderPos(i).y"
        />

        <line
          class="border-y"
          v-for="i in gridX + 2"
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
          :width="30"
          :height="30"
        />
      </svg>
    </div>
  </section>
</template>

<script>
import UserNameInput from '~/components/UserNameInput.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    UserNameInput,
  },
  computed: {
    ...mapState(['userName', 'token', 'blocks', 'gridX']),
    calcGridWidth() {
      return () => this.$window.width / this.gridX;
    },
    calcGridY() {
      return () => Math.ceil(this.$window.height / this.calcGridWidth());
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
        return {
          x: centerPos.x + 30 * object.x - 15,
          y: centerPos.y + 30 * object.y - 15,
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
  },
  methods: {
    ...mapActions(['getAccessToken', 'getField']),
    registerName(inputName) {
      this.getAccessToken(inputName);
    },
    init() {
      this.setIntervalObj = setInterval(async () => {
        if (this.token) {
          // eslint-disable-next-line
          await this.getField().then(() => {
          });
        }
      }, 1000);
    },
  },
  mounted() {
    this.init();
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
</style>
