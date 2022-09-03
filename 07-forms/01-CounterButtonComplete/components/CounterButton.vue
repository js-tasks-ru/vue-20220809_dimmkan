<template>
  <button type="button" @click="clickButton()">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: 0,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler() {
        this.localCount = this.count;
      },
    },
  },

  methods: {
    clickButton() {
      this.$emit('update:count', ++this.localCount);
    },
  },
};
</script>
