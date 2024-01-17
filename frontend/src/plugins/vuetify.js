import 'vuetify/dist/vuetify.min.css';
import { aliases, mdi } from "vuetify/lib/iconsets/mdi";
import '@mdi/font/css/materialdesignicons.css';

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";

export default createVuetify({
  components: {
    ...components,
    ...labs,
  },
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi
    },
  },
  options: {
    customProperties: true
  }
});
