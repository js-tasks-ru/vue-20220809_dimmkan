import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: undefined,
      errorMessage: undefined,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(newValue) {
        this.meetup = undefined;
        this.errorMessage = undefined;
        fetchMeetupById(newValue)
          .then((res) => {
            this.meetup = res;
          })
          .catch((error) => {
            this.errorMessage = error.message;
          });
      },
    },
  },

  template: `
    <div class="page-meetup">
      
      <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>

      <ui-container v-if="!meetup && !errorMessage">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="errorMessage">
        <ui-alert> {{ errorMessage }} </ui-alert>
      </ui-container>
    </div>`,
});
