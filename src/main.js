import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faPlusSquare,
  faEdit,
  faTimes,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faPlusSquare, faEdit, faTimes, faBackward);

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
