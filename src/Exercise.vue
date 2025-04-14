<template>
  <div id="header">
    <Button type="success" @click="onClick">轉換</Button>
    <div style="flex: 1;"></div>
    <Button type="warning" icon="md-swap" style="margin-left: 10px;" 
      @click="onClickSwap"/>
  </div>
  <div id="section">
    <textarea ref="textarea1" @input="onInput"></textarea>
    <textarea ref="textarea2"></textarea>
  </div>
</template>

<script>
import {sample} from "./system/sample.js"

export default {
  name: 'Exercise',
  components: {},
  data() {
    return {
    };
  },
  created() {
  },
  async mounted() {
    this.$refs.textarea1.value = localStorage.getItem("PSERVER");
    if(this.$refs.textarea1.value.trim().length > 0)
      this.onClick()
  },
  unmounted() {},
  methods: {
    onClick() {
      console.clear();
      let s = this.$refs.textarea1.value.trim(), result = "";
      if(s.indexOf("{") == 0) {
        let json = JSON.parse(s);
        result = this.assembleToFile(json);

      } else {
        let json = this.$parseText(this.$refs.textarea1.value.trim());
        result = JSON.stringify(json, null, 2);
      }
      
      this.$refs.textarea2.value = result;
    },
    onInput(){
      localStorage.setItem("PSERVER", this.$refs.textarea1.value)
    },
    onClickSwap() {
      localStorage.setItem("page", "App");
      location.reload();
    },
    assembleToFile(json, platform) {
      if(this.$isLocal) platform = "JabezPOS";
      let groups = this.$groups;
      let result = "", section;
      let retrieve = (arr) => {
        let arr1 = JSON.parse(JSON.stringify(arr)), arr2 = [];
        for(let i = 0; i < arr1.length; i++) {
          if(i == 0 || arr1[i].top != arr1[i - 1].top ) {
            
            if(i > 0) {
              let top1 = arr1[i - 1].top + this.$cellHeight, top2 = arr1[i].top;
              while (top1 < top2) { // 空白列
                arr2.push([]);
                top1 += this.$cellHeight;
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
          result += `;[#PrnSize:${json["props"].prnSize}]\n`
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
        // if(section != "header") continue;
        // console.log(section)
        let arr = [];
        if(section == "detail"){
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
        }
        if(sectionResult.length > 0) {
          result += (typeof flag == "string" ? (flag + (flag == "P#" ? "" : "\n")) : "") + sectionResult;
        }
      }
      // console.log(result)


      return result;
    }
  },
  computed: {
  },
  watch: {
  }
};
</script>

<style scoped>
#header,
#footer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#header {
  padding: 10px;
  background-color: var(--background1);
  border-bottom: 3px solid #eee;
}

#section {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* height: 100%; */
  /* width: 100%; */
}
textarea {
  flex: 1;
  margin: 0px 5px;
  height: calc(100% - 10px);
  font-size: 20px;
  padding: 5px;
}
textarea + textarea {
  /* margin-left: 10px; */
}
</style>
