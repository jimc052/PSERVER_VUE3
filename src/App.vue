<template>
  <div id="header">
    <RadioGroup v-model="platform" type="button" button-style="solid" @on-change="changePlatform" v-if="itemCount == 0">
      <Radio label="JabezPOS"></Radio>
      <Radio label="new2POS"></Radio>
    </RadioGroup>
    <div v-else style="color: var(--color1); font-size: 20px;">{{ "平台：" + platform }}</div>

    <div style="flex: 1;"></div>

    <div>
      <Button type="success" @click="onUpload" :disabled="itemCount > 0">上傳</Button>
      <Button type="success" @click="onOpenDialog" style="margin: 0 10px;" :disabled="itemCount == 0">
        文字檔
      </Button>

      <!-- 沒有在用了
      <Select placeholder="請選擇範本" @on-change="onChange" style="width: 100px;" :disabled="itemCount > 0">
        <Option v-for="item in options" :value="item" :key="item">
          {{ item }}
        </Option>
      </Select> 
      -->

      <input type="file" ref="fileInput" @change="onFileSelected" accept=".txt, text/plain" style="display: none;" />
    </div>
    <!-- <Button type="error">Error</Button> -->
    <div style="flex: 1;"></div>

    <Button type="warning" icon="md-trash" style="margin-left: 10px;" @click="onClickTrash"
      :disabled="itemCount == 0" />
  </div>
  <div id="section">
    <Elements />
    <splitpanes class="default-theme" style="margin-left: 5px;">
      <pane min-size="60" max-size="80">
        <splitpanes horizontal>
          <pane min-size="5">
            <DropZone zone="header" ref="header" />
          </pane>

          <pane min-size="5">
            <DropZone group="交易明細" zone="detail" ref="detail" />
          </pane>

          <pane min-size="20" style="display: flex; flex-direction: column; background-color: #17233d; ">
            <div style="flex: 1;">
              <DropZone zone="footer1" ref="footer1" />
            </div>

            <DropZone group="付款資料" zone="payment" ref="payment" style="height: 50px; margin: 10px 0px;" />

            <div style="flex: 1;">
              <DropZone zone="footer2" ref="footer2" />
            </div>
          </pane>
        </splitpanes>
      </pane>
      <pane>
        <Propertys />
      </pane>
    </splitpanes>
  </div>
  <div id="footer"></div>
</template>

<script>
import Elements from './components/elements.vue';
import Propertys from "./components/propertys.vue";
import DropZone from "./components/dropZone.vue";
import { Splitpanes, Pane } from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
// https://www.iviewui.com/components/modal
// import {sample} from "./system/sample.js" // 沒有在用了

export default {
  name: '',
  components: {
    Elements, Splitpanes, Pane, Propertys, DropZone
  },
  data() {
    return {
      platform: "JabezPOS",
      options: [
        "收據",
        "結帳單",
        "標籤"
      ],
      itemCount: 0
    }
  },
  created() {
  },
  async mounted() {
    this.$mybus.emit('platform', this.platform);
    window.onresize = () => {
      return (() => {
        this.$mybus.emit('resize', { hight: document.body.clientHeight, width: document.body.clientWidth });
      })()
    }
    this.$mybus.on("item", e => {
      this.count();
    });

    this.$mybus.on('delAll', e => {
      this.itemCount = 0;
    });
  },
  unmounted() {
  },
  methods: {
    count() {
      this.itemCount = 0;
      let count = 0;
      let arr = [this.$refs.header, this.$refs.detail, this.$refs.footer1, this.$refs.payment, this.$refs.footer2];
      arr.forEach(el => {
        if (typeof el != "undefined" && typeof el.items == "object")
          count += el.items.length;
      });

      this.itemCount = count;
    },
    onOpenDialog() {
      let width = document.body.clientWidth - 200;
      let height = document.body.clientHeight - 250;
      let content = "還沒寫";
      this.$Modal.info({
        // title: "Success",
        width: width + 50,
        render: (h) => {
          return h('textarea', {
            // class: ['button', { 'is-outlined': true }],
            style: [{
              'font-size': '16px'
            }, {
              'width': width + 'px'
            }, {
              'height': height + 'px'
            }, {
              'background': '#eee'
              // }, { 
              //   'color': 'var(--color1)' 
            }
            ],
            // id: 'submit',
            value: content,
            readonly: true
            // innerHTML: '',
            // onClick: submitForm,                
          })
        },
        // onOk: () => { alert(`Hello, ${this.value}`)}
      })
    },
    onUpload() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const file = event.target.files[0]; // Get the selected file
      if (!file) {
        console.log("No file selected.");
        return;
      }

      if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
        alert('請選擇一個文字檔 (.txt)');
        event.target.value = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseFile(e.target.result);
        // alert('檔案讀取成功！'); // Simple feedback
      };

      reader.onerror = (e) => {
        console.error("讀取檔案時發生錯誤:", e);
        alert('讀取檔案時發生錯誤！');
      };

      reader.readAsText(file);
      event.target.value = null;
    },
    parseFile(str) {
      let result = this.$parseText(str);
      if (typeof result == "object") {
        for (let key in result) {
          if (key == "props") {
            continue;
          } else if (key == "detail") {
            this.$refs[key].items = result[key].items
          } else if(typeof result[key] == "object"){
            this.$refs[key].items = result[key]
          }
        }
      }
      this.count();
    },
    onClickTrash() {
      this.$mybus.emit('delAll');
    },
    changePlatform(val) {
      this.$mybus.emit('platform', val);
    },
    onChange(e) { // 沒有在用了
      /*
      let result = sample[e];
      if (typeof result == "object") {
        for (let key in result) {
          if (key == "props") {
            continue;
          } else if (key == "detail") {
            this.$refs[key].items = result[key].items
          } else if(typeof result[key] == "object"){
            this.$refs[key].items = result[key]
          }
        }
      }
      this.count();
      */
    },
  },
  computed: {
  }
}
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

#footer {
  padding: 5px;
  border-top: 3px solid #eee;
  /* min-height: 50px; */
  background-color: var(--background1);
  color: var(--color1);
}

#section {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* height: 100%; */
  /* width: 100%; */
}
</style>
