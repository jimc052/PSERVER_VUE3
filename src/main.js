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
  app.config.globalProperties.$cellHeight = 50;
  app.config.globalProperties.$cellWidth = 80;
  app.config.globalProperties.$cellGap = 10;

  app.config.globalProperties.$properties = {
    N_LINES: {
    },
    Space: {

    },
    default: {
      sz: {
        title: "長度",
        placeholder: "請輸入數字"
      },
      al: {
        title: "對齊",
        // placeholder: "0: 靠左, 1: 靠中, 2: 靠右",
        options: [
          { value: 0, label: "靠左" },
          { value: 1, label: "靠中" },
          { value: 2, label: "靠右" }
        ]
      },
      ab: {
        title: "後置空白",
        placeholder: "請輸入數字"
      },
      af: {
        title: "前置空白",
        placeholder: "請輸入數字",
        
      }, 
      fc: {
        title: "前置碼",
        cols: 2,
        placeholder1: "請輸入文字",
        placeholder2: "請輸入數字"
      }, 
      gc: {
        title: "後置碼",
        cols: 2,
        placeholder1: "請輸入文字",
        placeholder2: "請輸入數字"
      },
      rp: {
        title: "重複字元",
        cols: 2,
        placeholder1: "請輸入文字",
        placeholder2: "請輸入數字"
      }
    }
  }

}

app.mount('#app')

// https://www.iviewui.com/components/menu
