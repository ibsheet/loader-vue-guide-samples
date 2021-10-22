import { createApp } from 'vue';
import Router from './router';
import App from './App.vue';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

const app = createApp(App).use(Quasar, quasarUserOptions);

app.use(Router);
app.mount('#app');
