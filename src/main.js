import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Exercise from './Exercise.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import mitt from "mitt"


// console.log(typeof Exercise)
const app = createApp(typeof Exercise == "object" ? Exercise : App);

app.config.productionTip = false;
// app.use(createPinia())
// app.use(router)
app.use(ViewUIPlus)
{ // 自定義的變數
  app.config.globalProperties.$mybus = mitt();
  app.config.globalProperties.$cellHeight = 40;
  app.config.globalProperties.$cellWidth = 120;
  app.config.globalProperties.$cellGap = 5;

  app.config.globalProperties.$properties = {
    N_LINES: {
      nl: {
        title: "空白列",
        placeholder: "請輸入數字"
      },
    },
    "自定文字": {
      text: {
        title: "文字",
        placeholder: "請輸入內容"
      },
    },
    default: {
      sz: {
        title: "字體大小",
        placeholder: "請選擇",
        options: [
          { value: 1, label: "1 * 1" },
          { value: 2, label: "2 * 2" },
          { value: 3, label: "3 * 3" },
          { value: 4, label: "2 * 1" },
          { value: 5, label: "1 * 2" }
        ]
      },
      al: {
        title: "對齊",
        placeholder: "請選擇",
        options: [
          { value: 0, label: "靠左" },
          { value: 1, label: "靠中" },
          { value: 2, label: "靠右" }
        ]
      },
      Len: {
        title: "字串長度",
        placeholder: "請輸入數字"
      },
      af: {
        title: "前置空白",
        placeholder: "請輸入數字",
      },
      ab: {
        title: "後置空白",
        placeholder: "請輸入數字"
      },
      fc: {
        title: "前置碼",
        placeholder: "請輸入文字",
      }, 
      gc: {
        title: "後置碼",
        placeholder: "請輸入文字",
      },
      rp: {
        title: "重複字元",
        placeholder: "請輸入數字"
      },
      Cpy: {
        title: "擷取字串",
        cols: 2,
        placeholder1: "請輸入開始位置",
        placeholder2: "請輸入結束位置"
      },
      key: {
        title: "群組鍵值",
        placeholder: "請輸入口味加料",
        limit: "TASK_NM"
      }
    }
  }
}

app.mount('#app')

// https://www.iviewui.com/components/menu
