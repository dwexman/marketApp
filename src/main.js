import { createApp } from 'vue';
import App from './App.vue';
import Vuikit from 'vuikit';
import VuikitIcons from '@vuikit/icons';
import '@vuikit/theme';



const app = createApp(App);
app.use(Vuikit);
app.use(VuikitIcons,);
app.mount('#app');
