<template>
  <div id="dropArea"
    @dragenter.prevent="drag = true"
    @dragleave.prevent="drag = false"
    @drop.prevent="onDrop"
  >
    <slot />

    <!-- modal -->
    <div v-if="!drag">
        ドラッグアンドドロップでファイルを追加
    </div>
    <div v-else>
      ドラッグ中
    </div>

    <!-- <div class="modal" :class="{ 'is-active': drag }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="notification is-primary is-light">
          <button class="delete"></button>
          Primar lorem ipsum dolor sit amet, consectetur
          adipiscing elit lorem ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur.
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div> -->
  </div>
</template>

<script>
// var fileArea = document.getElementById('dropArea');

export default {
  data() {
    return {
      drag: false
    }
  },
  
  watch: {
    drag: function syncOnDragChanged() {
      this.$emit("update:drag", this.drag)
    }
  },

  methods: {
    onDrop(event) {
      this.drag = false
      console.log("on drop")

      if (!event) {
        return
      }

      if (!event.dataTransfer) {
        return
      }

      if (event.dataTransfer.files.length === 0) {
        return
      }

      this.$emit("drop", event.dataTransfer.files[0])
    }
  }
}
</script>

<style scoped>
  #dropArea {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    /* z-index: 50; */
  }

</style>