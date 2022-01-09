<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div 
          id="navbar-dropdown-file"
          class="navbar-item has-dropdown is-hoverable"
        >
          <!-- @click="isActive"
          @blur="isActive" -->
          <a class="navbar-link">
            ファイル
          </a>

          <div class="navbar-dropdown">
            <div class="navbar-item">
              <label>
                インポート
                <input type="file" ref="file_input" @change="uploadFile">
              </label>
            </div>
            <a class="navbar-item"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>

        <a class="navbar-item"> Home </a>

        <a class="navbar-item"> Documentation </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      filesPath: []
    }
  },
  methods: {
    isActive: function(e) {
      e.currentTarget.classList.toggle('is-active');
    },

    uploadFile(){
      const files = Array.from(this.$refs.file_input.files);
      this.filesPath = files.map((f) => {
        return URL.createObjectURL(f)
      });
      console.log(this.filesPath)
      this.$emit("files-upload", this.filesPath);
    },
  }
}
</script>

<style>
label > input {
  display:none; /* アップロードボタンのスタイルを無効にする */
}
</style>
