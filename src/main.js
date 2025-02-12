import { createApp } from 'vue';
import router from './router';
import { store } from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import AppNavbar from './components/Navbar.vue';
import AppSideBar from './components/SideBar.vue';
import BarChart from './components/BarChart.vue';
import TopInfo from './components/TopInfo.vue'
import PieChart from './components/PieChart.vue';
import NotFound from './components/NotFound.vue';
import ModalIndustries from './components/ModalIndustries.vue';
import Spinner from './components/Spinner.vue'
import PressReleaseDataTable from './components/DataTables/PressReleaseDataTable.vue';
import UsersDataTable from './components/DataTables/UsersDataTable.vue';
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css"; 
import DataTable from './components/DataTables/DataTable.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

library.add(fas);

const app = createApp(App);

app.use(Vue3Toastify, {
    position: "top-right",
    autoClose: 5000,
    transition: "zoom",
    theme: "light",
  });

app.use(router);
app.use(store);

app.component('font-awesome-icon', FontAwesomeIcon);
app.component('AppNavbar', AppNavbar);
app.component('AppSideBar', AppSideBar);
app.component('Spinner', Spinner);
app.component('BarChart', BarChart)
app.component('PieChart', PieChart)
app.component('NotFound', NotFound)
app.component('DataTable', DataTable)
app.component('IndustryModal', ModalIndustries)
app.component('PDataTable', PressReleaseDataTable)
app.component('UDataTable', UsersDataTable)
app.component('TopInfo', TopInfo)

app.mount('#app')
