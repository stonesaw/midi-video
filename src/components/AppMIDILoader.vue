<template>
  <div class="flex w-full h-screen items-center justify-center text-center">
    <div
      class="p-12 bg-gray-100 border border-gray-300"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        multiple
        name="fields[assetsFieldHandle][]"
        id="assetsFieldHandle"
        class="w-px h-px opacity-0 overflow-hidden absolute"
        @change="onChange"
        ref="file"
        accept=".midi,.wav,.mp3,.ogg"
      />

      <label for="assetsFieldHandle" class="block cursor-pointer">
        <div>
          Explain to our users they can drop files in here or
          <button class="underline">click here</button> to upload their files
        </div>
      </label>
      <ul class="mt-4" v-if="this.fileList.length" v-cloak>
        <li
          class="text-sm p-1"
          v-for="file in fileList"
          :key="file"
        >
          ${ file.name }
          <button
            class="ml-2"
            type="button"
            @click="remove(fileList.indexOf(file))"
            title="Remove file"
          >
            remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: "AppMIDILoader",

  data() {
    return {
      fileList: [],
    };
  },

  methods: {
    dragEnter() {
      alert("Enter Drop Area");
    },

    enterMIDI() {

    },

     onChange() {
      this.fileList = [...this.$refs.file.files];
    },

    remove(i) {
      this.fileList.splice(i, 1);
    },

    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },

    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },

    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    }
  },
};
</script>

<style></style>
