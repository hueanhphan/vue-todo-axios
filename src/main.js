import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import storeConfigs from "./store";

const store = createStore(storeConfigs);
createApp(App).use(store).mount("#app");
