<template>
  <div class="container border">
    <div class="d-flex justify-content-center" id="p5Canvas"></div>
    <div class="d-flex justify-content-center">
      {{message}} sec ( p5's clock )
    </div>
  </div>
</template>

<script>
const p5proc = require('../js/p5main')

export default {
  props: {
    filesData: {
     type: Array
    }
  },
  
  data() {
    return {
      message: "",
      files: null
    }
  },

  mounted() {
    const P5 = require('p5')
    new P5(p5proc.main)
    // NOTE: p5.jsからのコールバックを受け取る
    p5proc.setDelegate(this.callbackOnP5);

    window.addEventListener('resize', this.handleResize);
  },


  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },

  watch: {
    filesData(newData) {
      this.files = newData;
      p5proc.setDebugLog("[open]" + this.files);
      p5proc.loadMIdi(this.files);
    }
  },

  methods: {
    callbackOnP5: function(timeStr) {
      this.message = timeStr;
    },

    handleResize: function() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      p5proc.updateCanvasSize(w, h)
    }
  }
}
</script>

<style>
.container {
  background-color: #f6f8fa;
}
</style>
