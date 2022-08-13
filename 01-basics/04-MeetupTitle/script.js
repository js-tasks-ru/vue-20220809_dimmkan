import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = defineComponent({
  data() {
    return {
      selectedRadio: 1,
      meetupTitle: '',
    };
  },

  watch: {
    selectedRadio: {
      immediate: true,
      handler(newValue) {
        fetchMeetupById(newValue).then((res) => (this.meetupTitle = res.title));
      },
    },
  },
});

createApp(App).mount('#app');
