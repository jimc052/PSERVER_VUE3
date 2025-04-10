import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Exercise from './Exercise.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import mitt from "mitt"

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

  let sz = {
    title: "字體大小",
    placeholder: "請選擇",
    options: [
      { value: 1, label: "1 * 1" },
      { value: 2, label: "2 * 2" },
      { value: 3, label: "3 * 3" },
      { value: 4, label: "2 * 1" },
      { value: 5, label: "1 * 2" }
    ]
  };
  let al = {
    title: "對齊",
    placeholder: "請選擇",
    options: [
      { value: 0, label: "靠左" },
      { value: 1, label: "靠中" },
      { value: 2, label: "靠右" }
    ]
  };

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
      sz,
      al
    },
    default: {
      sz,
      al,
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

  app.config.globalProperties.$groups = [
    {title: "機台資料", data: [
      {title: "STOCK_NO"},
      {title: "STR_NAME", tag: "STORE_NAME"},
      {title: "ADDRESS"},
      {title: "TEL"},
      {title: "COMP_CODE"},
      {title: "TM_NO"},
      {title: "TM_NAME"},
      {title: "CASH_NAME"}
    ]},
    {title: "會員資料", data: [
      {title: "T_VIP"},
      {title: "VIP_NAME"},
      {title: "VIP_TEL1"},
      {title: "PREPOINTS"},
      {title: "ADDPOINTS"},
      {title: "MINUSPOINTS"},
      {title: "NOWPOINTS"},
      {title: ""},
    ]},
    {title: "交易主檔", data: [
      {title: "T_DAY"},
      {title: "T_SER_NO"},
      {title: "T_VIP"},
      {title: "T_OD"},
      {title: "IN_AMT"},
      {title: "CHG_AMT"},
      {title: "AMOUNT"},
      {title: "T_TABLE"},
      {title: "T_FLAG6"},
      {title: ""},
      {title: ""},
      {title: ""}
    ]},
    {title: "交易明細", data: [
      {title: "PLU_CODE"},
      {title: "PLU_NAME", jabezTitle: "PC_NAME"},
      {title: "PRICE"},
      {title: "CNT", jabezTitle: "COUNT"},
      {title: "TOTAL"},
      {title: "TASK_NM"},
      {title: "FEEDING_NM", platform: 'JabezPOS'},
      {title: "VOLUME", platform: 'JabezPOS'},
      {title: "TAKE_OUT"},
    ]},
    {title: "付款資料", data: [
      {title: "PAD_NAC"},
      {title: "PAD_SNO"},
      {title: "PAD_AMT"},
    ]},
    {title: "其他", data: [
      {title: "Titel"},
      {title: "PrnLogo"},
      {title: "Space", hash: "#"},
      {title: "N_LINES"},
      {title: "SUM_TOTAL"},
      {title: "TOT_CNT"},
      {title: "SERVAMT"},
      {title: "Date", hash: "#"},
      {title: "Time", hash: "#"},
      {title: "Count", hash: "#"},
      {title: "+A_DES"},
      {title: "-A_DES"},
      {title: "Parper", type: "label"},
      {title: "OutgoBook"},
      {title: "自定文字", zone: "any"},
      {title: ""},
    ]},
  ]

  app.config.globalProperties.$parseText = (text) => {
    let groups = app.config.globalProperties.$groups;
    let checkTitle = (title) => {
      for(let i = 0; i < groups.length; i++) {
        for(let j = 0; j < groups[i].data.length; j++) {
          if(typeof groups[i].data[j].tag == "string" && groups[i].data[j].tag == title)
            return groups[i].data[j].title;
          if(groups[i].data[j].title == title) {
            return true;
          }
        }
      }
      return false;
    }
    let parseTag = (str) => {
      let json = {};
      let i = str.indexOf("[");
      if(i == 0) {
        let j = str.indexOf("]", i);
        let s = str.substr(1, j - 1);
        let arr2 = s.split(":");
        json = {title: arr2[0], props: {}};
        if(arr2.length == 2) {
          let arr3 = arr2[1].split(";");
          arr3.forEach(el1 => {
            let arr4 = el1.split("=");
            if(arr4.length == 2) {
              json.props[arr4[0]] = arr4[1];
            }
          });
        }
        if("#Space,#Date,#TOT_CNT,#Time,#Count,#PrnLogo".indexOf(json.title) > -1){
          json.title = json.title.substr(1);
        } else if(json.title.indexOf("H#") == 0 || json.title.indexOf("I#") == 0) {
          json.title = json.title.substr(2);
        } else {
          let result = checkTitle(json.title);
          if(typeof result == "string") { // STORE_NAME => STR_NAME
            // console.log(json.title + " => " + result)
            json.title = result;
          } else if(result == false) {
            console.log("自定文字: " + json.title)
            let obj = Object.assign({text: json.title}, json.props)
            json = {title: "自定文字", props: obj};
          }
        }
        // if(json.title.indexOf("#") > -1) console.log(json.title)
        str = str.substr(j + 1);
      }
      return json;
    }
    let parseLine = (str) => {
      let arr = [], times = 0;
      while(str.length > 0) {
        let i = str.indexOf("[");
        if(i == 0) {
          let j = str.indexOf("]", i);
          let s = str.substr(0, j + 1);
          let json = parseTag(s);
          // console.log(s); console.log(JSON.stringify(json))
          if(Object.keys(json.props).length == 0) delete json.props;
          arr.push(json);
          str = str.substr(j + 1);
        } else if(i > 0) {
          let s = str.substr(0, i)
          arr.push({title: "自定文字", props: {text: s}});
          str = str.substr(i);
        } else if(str.length > 0) {
          arr.push({title: "自定文字", props: {text: str}});
          str = "";
        }
        times++;
        if(times > 30) {
          console.log("too many times............" + str)
          break;
        }
      }
      return arr;
    }
    
    if(text.length == 0) {
      alert("沒有資料轉換")
      return;
    }
    let str = text.split("\n");
    let json = {props: {}}, section = "header", y = 0;
    for(let i = 0; i < str.length; i++) {
      let lines = str[i];
      if(lines == "BEEP#") {
        json.props.beep = true;
        continue;
      }
      else if(lines == ";[#PrnSize:") {
        json.props.prnSize = lines.replace(";[#PrnSize:", "").replace("]", "");
        continue;
      }

      if(lines.indexOf("H#") == 0) {
        section = "header";
        json[section] = [];
        y = 0;
        continue;
      } else if(lines.indexOf("I#") == 0) {
        section = "detail";
        let obj = parseTag(lines.replace("I#", ""));
        json[section] = {
          props: obj.props,
          items: []
        };
        y = 0;
        continue;
      } else if(lines.indexOf("F#") == 0) {
        section = "footer1";
        json[section] = [];
        y = 0;
        continue;
      } else if(lines.indexOf("P#") == 0) {
        section = "payment";
        json[section] =parseLine(lines.replace("P#", ""));
        let x = 0;
        json[section].forEach(el => {
          el.top = 0;
          el.left = x;
          x += app.config.globalProperties.$cellWidth;
        })

        section = "footer2";
        json[section] = [];
        y = 0;
        continue;
      }
      // if(section != "header")  continue;

      if(lines.trim().length > 0) {
        let arr = parseLine(lines);
        let x = 0;
        arr.forEach(e => {
          e.top = y;
          e.left = x;
          x += app.config.globalProperties.$cellWidth;
        })
        try {
          if(section == "detail") {
            json[section].items = json[section].items.concat(arr);
          } else {
            json[section] = json[section].concat(arr);
          }              
        } catch(e) {
          console.log(section)
          console.warn(e);
          (e)
        }
      
      
      }

      y += app.config.globalProperties.$cellHeight;        
    }
    // console.log(JSON.stringify(json));
    return json;
  }
}

app.mount('#app')

// https://www.iviewui.com/components/menu
