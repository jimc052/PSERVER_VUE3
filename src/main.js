import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Exercise from './Exercise.vue'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import mitt from "mitt"

let page = localStorage.getItem("page");
const app = createApp(page == "Exercise" ? Exercise : App);

app.config.productionTip = false;
// app.use(createPinia())
// app.use(router)
app.use(ViewUIPlus)
{ // 自定義的變數
  app.config.globalProperties.$mybus = mitt();
  app.config.globalProperties.$cellHeight = 40;
  app.config.globalProperties.$cellWidth = 120;
  app.config.globalProperties.$cellGap = 5;

  app.config.globalProperties.$isLocal = location.href.indexOf("192.168") > -1 || location.href.indexOf("idx-pservervue3git-") > -1 ;

  app.config.globalProperties.$properties = {
    "section-header": {
      beep: {
        title: "beep",
        placeholder: "請選擇",
        options: [
          { value: 0, label: "否" },
          { value: 1, label: "是" }
        ]
      },
      prnSize: {
        title: "出單紙",
        placeholder: "請選擇",
        options: [
          { value: 0, label: "57cm" },
          { value: 1, label: "80cm" }
        ]
      },
    },

    "section-detail": {
      ord: {
        title: "品項加總",
        placeholder: "相同品項, 商品數量加總",
        options: [
          { value: 0, label: "否" },
          { value: 1, label: "是" }
        ]
      },
      qrd: {
        title: "品項排序",
        placeholder: "相同品項, 排序",
        options: [
          { value: 0, label: "否" },
          { value: 1, label: "是" }
        ]
      },
      // prc: {
      // }
    },
    N_LINES: {
      nl: {
        title: "空白列",
        placeholder: "請輸入數字"
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
    {title: "會員資料", platform: 'JabezPOS', data: [
      {title: "T_VIP"},
      {title: "VIP_NAME"},
      {title: "VIP_TEL1"},
      {title: "PREPOINTS"},
      {title: "ADDPOINTS"},
      {title: "MINUSPOINTS"},
      {title: "NOWPOINTS"},
      {title: "D_VIP_NAME"},
      {title: "D_TEL1"},
      {title: "D_MEMO"},
      {title: "REMARK"},
      {title: ""},
      {title: ""},
      {title: ""},
    ]},
    {title: "交易主檔", data: [
      {title: "T_DAY"},
      {title: "T_TIME"},
      {title: "T_SER_NO"},
      {title: "T_VIP"},
      {title: "T_OD"},
      {title: "T_TABLE"},
      {title: "T_FLAG6"},
      {title: "T_OD"},
      {title: "IN_AMT"},
      {title: "CHG_AMT"},
      {title: "AMOUNT"},
      {title: ""},
      {title: ""},
      {title: ""},
      {title: ""}
    ]},
    {title: "交易明細", data: [
      {title: "PLU_CODE"},
      {title: "PLU_NAME"},
      {title: "PC_NAME", platform: 'JabezPOS'},
      {title: "PC_ENAME", platform: 'JabezPOS'},
      {title: "PRICE"},
      {title: "CNT"},
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
      {title: "#PrnLogo"},
      {title: "#Space"},
      {title: "#TOT_CNT"},
      {title: "#Date"},
      {title: "#Time"},
      {title: "#Count"},
      {title: "N_LINES"},
      {title: "SUM_TOTAL"},
      {title: "SERVAMT"},
      {title: "+A_DES"},
      {title: "-A_DES"},
      {title: "Parper", type: "label"},
      {title: "OutgoBook"},
      {title: "自定文字", zone: "any"},
      {title: ""},
      {title: ""},
      {title: ""},
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
        // if("#Space,#Date,#TOT_CNT,#Time,#Count,#PrnLogo".indexOf(json.title) > -1){
        //   json.title = json.title.substr(1);
        // } else 
        if(json.title.indexOf("H#") == 0 || json.title.indexOf("I#") == 0) {
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
        json.props.beep = 1;
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

  app.config.globalProperties.$assembleToFile = (json, platform) => {
    let groups = app.config.globalProperties.$groups;
    let result = "", section;
    let retrieve = (arr) => {
      let arr1 = JSON.parse(JSON.stringify(arr)), arr2 = [];
      for(let i = 0; i < arr1.length; i++) {
        if(i == 0 || arr1[i].top != arr1[i - 1].top ) {
          
          if(i > 0) {
            let top1 = arr1[i - 1].top + app.config.globalProperties.$cellHeight, top2 = arr1[i].top;
            while (top1 < top2) { // 空白列
              arr2.push([]);
              top1 += app.config.globalProperties.$cellHeight;
            }
          }
          arr2.push([])
        }
        arr2[arr2.length - 1].push(arr1[i])
      }
      arr2.forEach(el1 => {
        el1.forEach(el2 => {
          delete el2.top;
          delete el2.left;
          if(typeof el2.props == "object") {
            if(el2.props.sz == "1") delete el2.props.size;
            if(el2.props.al == "0") delete el2.props.al;
            if(Object.keys(el2.props).length == 0) delete el2.props;
          }
        })
      })
      return arr2;
    }
    let findGroups = (tag) => {
      // console.log(tag)
      let result = [];
      for(let i = 0; i < groups.length; i++) {
        let title = groups[i].title;
        let data = groups[i].data;
        if(typeof groups[i].platform == "string" && platform != groups[i].platform) continue; 
        for(let j = 0; j < data.length; j++) {
          let item = data[j];
          if(typeof item.platform == "string" && platform != item.platform) continue;
          // console.log(item)
          if(item.title == tag || item.tag == tag || item.jabezTitle == tag) {
            if(typeof item.tag == "string")
              result.push({title, tag: item.tag});
            else if(typeof item.jabezTitle == "string" && platform == "JabezPOS")
              result.push({title, tag: item.jabezTitle});
            else 
              result.push({title, tag})
          }
        }
      }
      // console.log(JSON.stringify(result))
      return result;
    }
    if(typeof json["props"] == "object") {
      if(json["props"].beep == true) {
        result += "BEEP#\n"
      }
      if(typeof json["props"].prnSize == "number") { // ;[#PrnSize:80]
        if(json["props"].prnSize == 1) {
          result += `;[#PrnSize:80]\n`
        }
      }
    }

    let sections = ["header", "detail", "footer1", "payment", "footer2"];
    for(let i = 0; i < sections.length; i++) {
      section = sections[i]; 
      let sectionResult = "", flag;
      if(section == "header") {
        flag = "H#";
      } else if(section == "detail") {
        flag = "I#";
      } else if(section == "payment") {
        flag = "P#";
      } else if(section == "footer1") {
        flag = "F#";
      }
      // if(section != "detail") continue;
      // console.clear(); console.log(section); console.log(JSON.stringify(json[section], null, 2))
      let arr = [];
      if(section == "detail"){
        // console.log(Array.isArray(json[section].items))
        if(Array.isArray(json[section].items) && json[section].items.length > 0) { 
          arr = retrieve(json[section].items)
        }
      } else if(Array.isArray(json[section]) && json[section].length > 0) { 
        arr = retrieve(json[section])
      }
      for(let j = 0; j < arr.length; j++) {
        let line = "";
        for(let k = 0; k < arr[j].length; k++) {
          let row = arr[j][k], title = row.title;
          // console.log(JSON.stringify(row))
          if(title == "自定文字") {
            title = row.props.text;
            delete row.props.text;
            if(Object.keys(row.props).length == 0) {
              line += title;
              row = undefined
            }
          }
          if(typeof row == "object") {
            if(title.indexOf("#") == -1) {
              let group = findGroups(title);
              if(group.length > 0) {
                if(group[0].tag != title) {
                  title = group[0].tag;
                }
                if(section == "detail") {
                  title = "I#" + title;
                } else if(i >= 2 && group[0].title == "交易主檔") { //  
                  title = "H#" + title;
                }
              }                
            }
            
            let props = typeof row.props == "object" && Object.keys(row.props).length > 0 ? ":" : "";
            for(let key in row.props) {
              props += (props.length > 1 ? ";" : "") + key + "=" + row.props[key];
            }
            line += `[${title}${props}]`;
          }
        }
        sectionResult += line + "\n";
        // console.log(sectionResult)
      }
      if(sectionResult.length > 0) {
        result += (typeof flag == "string" ? (flag + (flag == "P#" ? "" : "\n")) : "") + sectionResult;
      }
    }
    return result;
  }
}

app.mount('#app')

// https://www.iviewui.com/components/menu
