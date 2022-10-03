import { createApp } from "vue";
import App from "./app.vue";
import PropBindPlugin from "./plugins/prop-bind";

import "./styles/normalize.scss";

/// v-props="overlayProps"
createApp(App).use(PropBindPlugin).mount("#app");
