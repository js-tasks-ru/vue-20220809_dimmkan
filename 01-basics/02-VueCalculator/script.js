import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  data() {
    return {
      arg1: 0,
      arg2: 0,
      operator: 'sum',
    };
  },
  computed: {
    result() {
      let res = 0;
      switch (this.operator) {
        case 'sum':
          res = this.arg1 + this.arg2;
          break;
        case 'subtract':
          res = this.arg1 - this.arg2;
          break;
        case 'multiply':
          res = this.arg1 * this.arg2;
          break;
        case 'divide':
          res = this.arg1 / this.arg2;
          break;
      }
      return res;
    },
  },
});
createApp(App).mount('#app');
