<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': currentState === $options.componentStates.loading }"
      :style="image && `--bg-url: url('${image}')`"
    >
      <span class="image-uploader__text"> {{ stateText }} </span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        v-bind="$attrs"
        @click="clickHandler"
        @change="changeHandler"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  componentStates: {
    empty: 'empty',
    loading: 'loading',
    filled: 'filled',
  },

  emits: ['select', 'error', 'upload', 'remove'],

  data() {
    return {
      currentState: this.preview ? this.$options.componentStates.filled : this.$options.componentStates.empty,
      selectedImage: null,
    };
  },

  computed: {
    image() {
      return this.preview || this.selectedImage;
    },

    stateText() {
      const textObj = {
        empty: 'Загрузить изображение',
        loading: 'Загрузка...',
        filled: 'Удалить изображение',
      };

      return textObj[this.currentState];
    },
  },

  methods: {
    clickHandler(event) {
      switch (this.currentState) {
        case this.$options.componentStates.loading:
          event.preventDefault();
          break;
        case this.$options.componentStates.filled:
          event.preventDefault();
          this.deleteFile();
          this.currentState = this.$options.componentStates.empty;
          this.$emit('remove');
          break;
      }
    },

    changeHandler(event) {
      const imageFile = event.target.files[0];
      this.selectedImage = URL.createObjectURL(imageFile);
      this.$emit('select', imageFile);

      if (!this.uploader) {
        this.currentState = this.$options.componentStates.filled;
        return;
      }

      this.currentState = this.$options.componentStates.loading;

      return this.uploader(imageFile)
        .then((result) => {
          this.currentState = this.$options.componentStates.filled;
          this.$emit('upload', result);
        })
        .catch((error) => {
          this.currentState = this.$options.componentStates.empty;
          this.deleteFile();
          this.$emit('error', error);
        })
        .finally(() => {
          this.selectedImage = null;
        });
    },

    deleteFile() {
      this.$refs.input.value = '';
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
