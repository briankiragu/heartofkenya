/* eslint-disable import/extensions */
import BusinessDirectory from "./components/BusinessDirectory.vue.js";
import Marketplace from "./components/products/Marketplace.vue.mjs";

// eslint-disable-next-line no-undef
const app = Vue.createApp({
  components: {
    BusinessDirectory,
    Marketplace,
  },
});

// Mount the application.
app.mount("#app-3");
