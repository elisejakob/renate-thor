<template>
  <div class="canvasbox">
    <canvas :id="`paper-${id}`" class="paper" :width="canvasSize.width" :height="canvasSize.height" @mousemove="draw"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    color: {
      type: String,
      default: 'crimson'
    }
  },
  data() {
    return {
      canvas: null,
      cursor: {
        x: 0,
        y: 0
      },
      points: {
        x: [],
        y: [],
        drag: []
      },
      line: 120,
      canvasSize: {
        width: 500,
        height: 800
      }
    }
  },
  methods: {
    addPoint(x, y, drag) {
      this.points.x.push(x);
      this.points.y.push(y);
      this.points.drag.push(drag);
    },
    drawLine() {
      let ctx = this.canvas;

      ctx.strokeStyle = this.color;
      ctx.lineJoin = 'round';
      ctx.lineWidth = this.line;

      for (var i = 0; i < this.points.x.length; i++) {
        ctx.beginPath();
        if (this.points.drag[i] && i) {
          ctx.moveTo(this.points.x[i - 1], this.points.y[i - 1]);
        } else {
          ctx.moveTo(this.points.x[i] - 1, this.points.y[i]);
        }
        ctx.lineTo(this.points.x[i], this.points.y[i]);
        ctx.closePath();
        ctx.stroke();
      }
    },
    draw(e) {
      this.addPoint(e.offsetX, e.offsetY, true);
      this.drawLine();
    },
    resizeCanvas() {
      this.canvasSize.height = this.$parent.$el.offsetHeight;
      this.canvasSize.width = this.$parent.$el.offsetWidth;
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeCanvas);
  },
  mounted() {
    this.resizeCanvas();
    window.addEventListener("resize", this.resizeCanvas);
    const c = document.getElementById('paper-' + this.id);
    this.canvas = c.getContext('2d');
  }
}
</script>

<style lang="scss" scoped>
.canvasbox {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  overflow: hidden;

  .paper {
    background: transparent;
  }
}
</style>
