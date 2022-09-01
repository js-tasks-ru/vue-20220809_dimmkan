<template>
  <ui-input :modelValue="computedValue" :type="type" @input="handleInput">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    modelValue: Number,
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },
  },

  emits: ['update:modelValue'],

  computed: {
    computedValue() {
      if (!this.modelValue) {
        return '';
      }

      const date = new Date(this.modelValue).toISOString();

      switch (this.type) {
        case 'date':
          return date.substring(0, 10);
        case 'datetime-local':
          return date.substring(0, 16);
        case 'time':
          return this.$attrs['step'] && this.$attrs['step'] % 60 !== 0
            ? date.substring(11, 19)
            : date.substring(11, 16);
      }

      return '';
    },
  },

  methods: {
    handleInput(event) {
      event.target.value === ''
        ? this.$emit('update:modelValue', null)
        : this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
