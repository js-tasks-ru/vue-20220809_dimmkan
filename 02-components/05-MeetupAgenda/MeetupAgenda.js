import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',

  components: {
    MeetupAgendaItem,
  },

  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },

  template: `
    <ul class="agenda">
      <li class="agenda__item" v-for="item in agenda">
        <meetup-agenda-item :agenda-item="item">
          <template #title> 
            <span v-html="item.title"></span> 
          </template>
        </meetup-agenda-item>
      </li>
    </ul>`,
});
