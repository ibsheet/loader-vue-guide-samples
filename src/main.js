import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import store from './store'
import 'quasar/dist/quasar.prod.css'

const app = createApp(App).use(Quasar, quasarUserOptions).use(store);

app.use(Router);
app.mount('#app');
