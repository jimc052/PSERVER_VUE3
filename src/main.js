import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import mitt from "mitt"

const app = createApp(App)
app.config.productionTip = false;
// app.use(createPinia())
// app.use(router)
app.use(ViewUIPlus)
{ // 自定義的變數
  app.config.globalProperties.$mybus = mitt();
  // app.config.globalProperties.$dictionrary = { 
  //   STR_NAME: "STORE_NAME", // STR_NAME 是 APLSYS 的欄位，STORE_NAME 是消費單上的 tag 名稱
  // }

  app.config.globalProperties.$rowHeight = 90;
  app.config.globalProperties.$cellWidth = 80;
  app.config.globalProperties.$cellGap = 10;
}

app.mount('#app')

// https://www.iviewui.com/components/menu
