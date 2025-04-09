<template>
  <div id="header">
    <Button type="success" @click="onClick">轉換</Button>
  </div>
  <div id="section">
    <textarea ref="textarea1" @input="onInput"></textarea>
    <textarea ref="textarea2"></textarea>
  </div>
</template>

<script>
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
            console.log(s)
            console.log(json)
            // let arr2 = s.split(":");
            // let json = {title: arr2[0], props: {}};
            // if(arr2.length == 2) {
            //   let arr3 = arr2[1].split(";");
            //   arr3.forEach(el1 => {
            //     let arr4 = el1.split("=");
            //     if(arr4.length == 2) {
            //       json.props[arr4[0]] = arr4[1];
            //     }
            //   });
            // }
            
            // if(Object.keys(json.props).length == 0) delete json.props;
            arr.push(json);
            str = str.substr(j + 1);
          } else if(i > 0) {
            let s = str.substr(0, i)
            arr.push({title: "自定文字", text: s});
            str = str.substr(i);
          } else if(str.length > 0) {
            arr.push({title: "自定文字", text: str});
            str = "";
          }
          times++;
          if(times > 100) {
            console.log("too many times............" + str)
            break;
          }
        }
        return arr;
      }
      let str = this.$refs.textarea1.value.trim().split("\n");
      if(str.length == 0) {
        alert("沒有資料轉換")
        return;
      }
      let json = {}, section = "header", y = 0;
      for(let i = 0; i < str.length; i++) {
        let lines = str[i];
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
          json[section] = parseLine(parseLine(lines.replace("P#", "")));

          section = "footer2";
          json[section] = [];
          y = 0;
          continue;
        }
        // if(section != "detail") {
        //   continue;
        // }

        if(lines.trim().length > 0) {
          let arr = parseLine(lines);
          let x = 0;
          arr.forEach(e => {
            e.top = y;
            e.left = x;
            x += this.$cellWidth;
          })
          if(section == "detail") {
            json[section].items = json[section].items.concat(arr);
            console.log(json[section])
          } else {
            json[section] = json[section].concat(arr);
          }          
        }

        y += this.$cellHeight;        
      }
      this.$refs.textarea2.value = JSON.stringify(json, null, 2);
    },
    onInput(){
      localStorage.setItem("PSERVER", this.$refs.textarea1.value)
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
