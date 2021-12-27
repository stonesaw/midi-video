<template>
  <div class="container border">
    <div class="d-flex justify-content-center" id="p5Canvas"></div>
    <div class="d-flex justify-content-center">
      {{message}}
    </div>
  </div>
</template>

<script>
const p5main = require('./AppCanvasP5proc')

export default {
  data() {
    return {
      message: ""
    }
  },

  mounted() {
    const P5 = require('p5')
    new P5(p5main.main)
    // NOTE: p5.jsからのコールバックを受け取る
    // p5main.setDelegate(this.callbackOnP5);
  },

  methods: {
    callbackOnP5: function(timeStr) {
      this.message = timeStr;
    }
  }
}
</script>

<style>
</style>
