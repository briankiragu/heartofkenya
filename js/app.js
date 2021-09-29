/* eslint-disable import/extensions */
import Hello from './components/Hello.vue.js';

// eslint-disable-next-line no-undef
const app = Vue.createApp({
  components: { Hello },
});

// Mount the application.
app.mount('#app');
