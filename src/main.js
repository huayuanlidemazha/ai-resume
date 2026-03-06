import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import './styles/global.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(ElementPlus, { locale: zhCn });

// 全局注册 Element Plus 图标，模板中可使用 <ep-xxx />
const iconNames = [
  'Collection', 'DataAnalysis', 'Search', 'Folder', 'Connection',
  'Warning', 'PieChart', 'User', 'Briefcase', 'Document', 'Tickets', 'UploadFilled'
];
iconNames.forEach((name) => {
  const comp = ElementPlusIconsVue[name];
  if (comp) app.component('Ep' + name, comp);
});

app.use(router);

app.mount('#app');

