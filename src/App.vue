<template>
  <div id="app">
    <AppFileDropArea
     class="file-upload-card"
     :drag.sync="drag"
     @drop="file = $event"
    >
      <!-- <AppMIDILoader /> -->
      <AppNavbar @files-upload='filesUpload' />
      <AppCanvas :files-data="files" />

      <div
       v-for="(file, i) in files"
       :key="file">
        ファイル{{ i }}: {{ file }}
      </div>
    
      <!-- <div v-if="file">
        ファイル名 {{ file.name }}
        <button @click="file = null">
          クリア
        </button>
      </div> -->
    </AppFileDropArea>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
import AppCanvas from './components/AppCanvas.vue'
// import AppMIDILoader from './components/AppMIDILoader.vue'
import AppFileDropArea from './components/AppFileDropArea.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppCanvas,
    // AppMIDILoader,
    AppFileDropArea
  },

  data() {
    return {
      drag: false,
      files: null
    }
  },

  methods: {
    filesUpload: function(files) {
      this.files = files;
      // alert(this.files);
      // ここで canvas に値を渡したい
    }
  }


}
</script>

<style lang="scss">
@import "../node_modules/bulma/bulma.sass";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
