import { createApp } from "vue";
import App from "./App.vue";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.css";
import "primeicons/primeicons.css";
import "./assets/main.css";

import PrimeVue from "primevue/config";
import Dialog from "primevue/dialog";

const app = createApp(App);
app.use(PrimeVue);
app.component("Dialog", Dialog);
app.mount("#app");
