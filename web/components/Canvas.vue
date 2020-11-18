<template>
  <div class="canvasbox">
    <canvas id="paper" class="paper" :width="canvasSize.width" :height="canvasSize.height" @mousemove="draw"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      color: 'crimson',
      cursor: {
        x: 0,
        y: 0
      },
      points: {
        x: [],
        y: [],
        drag: []
      }
    }
  },
  computed: {
    canvasSize() {
      return {
        width: 800,
        height: 600
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
      ctx.lineWidth = 12;

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
      this.addPoint(e.pageX, e.pageY, true);
      this.drawLine();
    },
    resizeCanvas() {
      console.log('resizing i promise')
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeCanvas);
  },
  mounted() {
    window.addEventListener("resize", this.resizeCanvas);
    const c = document.getElementById('paper');
    this.canvas = c.getContext('2d');
  }
}
</script>

<style lang="scss" scoped>
.canvasbox {
  //position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;

  .paper {
    background: white;
    cursor: none;
  }
}
</style>
