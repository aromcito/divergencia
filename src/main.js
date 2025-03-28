import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';
import { BootstrapVue3, BToastPlugin } from 'bootstrap-vue-3';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import VueSelect from 'vue3-select2-component';
import VueFeather from 'vue-feather';
import DatePicker from 'vue3-datepicker';
import VueApexCharts from 'vue3-apexcharts';
import Vue3Autocounter from 'vue3-autocounter';
import VueTelInput from 'vue3-tel-input';
import 'normalize.css';

// Plugins
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'vue3-tel-input/dist/vue3-tel-input.css';

/***********************************************************************/
                     /* Frontend */
/***********************************************************************/

// Menu
import Mainmenu from '@/components/frontend/mainmen.vue'
import Mainnav from '@/components/frontend/mainnav.vue'

// Pages
import layoutheader from '@/views/frontend/layouts/header.vue' // Cambiado a multi-palabra
import CustomCursor from '@/views/frontend/layouts/cursor.vue' // Cambiado a multi-palabra
import ScrollToTop from '@/views/frontend/layouts/scrolltotop.vue' // Cambiado a multi-palabra
import FooterIndex from '@/views/frontend/layouts/footer.vue' // Cambiado a multi-palabra

import IndexBanner from '@/views/frontend/pages/home/indexbanner.vue'
import IndexClinic from '@/views/frontend/pages/home/indexclinic.vue'
import IndexPopular from '@/views/frontend/pages/home/indexpopular.vue'
import IndexFeature from '@/views/frontend/pages/home/indexfeature.vue'
import IndexBlog from '@/views/frontend/pages/home/indexblog.vue'

import Searchlist from '@/views/frontend/pages/patients/searchdoctor/searchlist.vue'

const app = createApp(App);

// Menu Components
app.component('Mainmenu',Mainmenu)
app.component('Mainnav',Mainnav)

app.component('searchlist',Searchlist)

// Layout Components
app.component('layoutheader', layoutheader); // Cambiado a multi-palabra
app.component('CustomCursor', CustomCursor); // Cambiado a multi-palabra
app.component('ScrollToTop', ScrollToTop); // Cambiado a multi-palabra
app.component('FooterIndex', FooterIndex); // Cambiado a multi-palabra

// Home Page Components
app.component('IndexBanner', IndexBanner); // Cambiado a multi-palabra
app.component('IndexClinic', IndexClinic); // Cambiado a multi-palabra
app.component('IndexPopular', IndexPopular); // Cambiado a multi-palabra
app.component('IndexFeature', IndexFeature); // Cambiado a multi-palabra
app.component('IndexBlog', IndexBlog); // Cambiado a multi-palabra

// Plugins
app.component('Vue3Autocounter', Vue3Autocounter); // Cambiado a multi-palabra
app.component('VueSelect', VueSelect); // Cambiado a multi-palabra
app.component(VueFeather.name, VueFeather);
app.component('DatePicker', DatePicker); // Cambiado a multi-palabra

// Use Plugins
app.use(VueApexCharts)
    .use(VueTelInput)
    .use(BootstrapVue3)
    .use(BToastPlugin)
    .use(Antd)
    .use(router)
    .mount('#app');