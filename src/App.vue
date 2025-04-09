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

      <Select placeholder="請選擇範本" @on-change="onChange" style="width: 100px;" :disabled="itemCount > 0">
        <Option v-for="item in options" :value="item" :key="item">
          {{ item }}
        </Option>
      </Select>

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

          <pane min-size="40" style="display: flex; flex-direction: column; background-color: #2d8cf0; ">
            <div style="flex: 1;">
              <DropZone zone="footer1" ref="footer1" />
            </div>

            <DropZone group="付款資料" zone="payment" ref="payment"
              style="border: 1px solid #2d8cf0; height: 60px; margin: 10px 0px;" />

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
import { parse } from 'vue/compiler-sfc';
// https://www.iviewui.com/components/modal

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
      this.itemCount = 0;
      let count = 0;
      let arr = [this.$refs.header, this.$refs.detail, this.$refs.footer1, this.$refs.payment, this.$refs.footer2];
      arr.forEach(el => {
        if (typeof el != "undefined" && typeof el.items == "object")
          count += el.items.length;
      });

      this.itemCount = count;
    });

    this.$mybus.on('delAll', e => {
      this.itemCount = 0;
    });
  },
  unmounted() {
  },
  methods: {
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
        this.parseToArray(e.target.result);
        // alert('檔案讀取成功！'); // Simple feedback
      };

      reader.onerror = (e) => {
        console.error("讀取檔案時發生錯誤:", e);
        alert('讀取檔案時發生錯誤！');
      };

      reader.readAsText(file);
      event.target.value = null;
    },
    parseToArray(str) { // 還沒寫
      let arr = [this.$refs.header, this.$refs.detail, this.$refs.footer1, this.$refs.payment, this.$refs.footer2];
    },
    onChange(e) {
      let result = this.sample(e);
      if (typeof result == "object") {
        for (let key in result) {
          if (key == "detail") {
            this.$refs[key].items = result[key].items
          } else {
            this.$refs[key].items = result[key]
          }
        }

      }
    },
    onClickTrash() {
      this.$mybus.emit('delAll');
    },
    changePlatform(val) {
      this.$mybus.emit('platform', val);
    },
    sample(str) {
      let json = {
        "收據": {
          "header": [
            {
              "title": "自定文字",
              "props": {
                "text": "Check",
                "sz": "2",
                "al": "1"
              },
              "top": 0,
              "left": 0
            },
            {
              "title": "STR_NAME",
              "top": 80,
              "left": 0
            },
            {
              "title": "Space",
              "props": {
                "ab": "2"
              },
              "top": 80,
              "left": 120
            },
            {
              "title": "自定文字",
              "props": {
                "text": "TEL:"
              },
              "top": 120,
              "left": 0
            },
            {
              "title": "TEL",
              "props": {
                "sz": "1"
              },
              "top": 120,
              "left": 120
            },
            {
              "title": "Date",
              "top": 160,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": " "
              },
              "top": 160,
              "left": 120
            },
            {
              "title": "Time",
              "top": 160,
              "left": 240
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Order#:"
              },
              "top": 200,
              "left": 0
            },
            {
              "title": "T_SER_NO",
              "props": {
                "Cpy": "4,3"
              },
              "top": 200,
              "left": 120
            },
            {
              "title": "自定文字",
              "props": {
                "text": "TM:TM"
              },
              "top": 240,
              "left": 0
            },
            {
              "title": "TM_NO",
              "props": {
                "ab": "8"
              },
              "top": 240,
              "left": 120
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Cashier:"
              },
              "top": 240,
              "left": 240
            },
            {
              "title": "CASH_NAME",
              "props": {
                "Cpy": "1,3"
              },
              "top": 240,
              "left": 360
            },
            {
              "title": "自定文字",
              "props": {
                "text": "------------------------------------------"
              },
              "top": 280,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Item List",
                "ab": "30"
              },
              "top": 320,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Qty",
                "ab": "3"
              },
              "top": 320,
              "left": 120
            },
            {
              "title": "Space",
              "props": {
                "ab": "1"
              },
              "top": 320,
              "left": 240
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Amt",
                "af": "7"
              },
              "top": 320,
              "left": 360
            },
            {
              "title": "自定文字",
              "props": {
                "text": "------------------------------------------"
              },
              "top": 360,
              "left": 0
            }
          ],
          "detail": {
            "props": {
              "text": "MAIN",
              "qrd": "1",
              "prc": "0"
            },
            "items": [
              {
                "title": "PC_NAME",
                "props": {
                  "Len": "30",
                  "ab": "26"
                },
                "top": 0,
                "left": 0
              },
              {
                "title": "自定文字",
                "props": {
                  "text": "x"
                },
                "top": 0,
                "left": 120
              },
              {
                "title": "Space",
                "props": {
                  "ab": "1"
                },
                "top": 0,
                "left": 240
              },
              {
                "title": "CNT",
                "props": {
                  "af": "4"
                },
                "top": 0,
                "left": 360
              },
              {
                "title": "Space",
                "props": {
                  "ab": "2"
                },
                "top": 0,
                "left": 480
              },
              {
                "title": "TOTAL",
                "props": {
                  "af": "8"
                },
                "top": 0,
                "left": 600
              },
              {
                "title": "自定文字",
                "props": {
                  "text": "  "
                },
                "top": 40,
                "left": 0
              },
              {
                "title": "TASK_NM",
                "top": 40,
                "left": 120
              }
            ]
          },
          "footer1": [
            {
              "title": "自定文字",
              "props": {
                "text": "------------------------------------------"
              },
              "top": 0,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Total"
              },
              "top": 40,
              "left": 0
            },
            {
              "title": "Count",
              "props": {
                "af": "4"
              },
              "top": 40,
              "left": 120
            },
            {
              "title": "自定文字",
              "props": {
                "text": " Items"
              },
              "top": 40,
              "left": 240
            },
            {
              "title": "Space",
              "props": {
                "ab": "15"
              },
              "top": 40,
              "left": 360
            },
            {
              "title": "TOT_CNT",
              "props": {
                "af": "8"
              },
              "top": 40,
              "left": 480
            },
            {
              "title": "自定文字",
              "props": {
                "text": " Qty "
              },
              "top": 40,
              "left": 600
            },
            {
              "title": "自定文字",
              "props": {
                "text": "------------------------------------------"
              },
              "top": 80,
              "left": 0
            },
            {
              "title": "Space",
              "props": {
                "ab": "28"
              },
              "top": 120,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Subtotal :"
              },
              "top": 120,
              "left": 120
            },
            {
              "title": "SUM_TOTAL",
              "props": {
                "af": "7"
              },
              "top": 120,
              "left": 240
            },
            {
              "title": "Space",
              "props": {
                "ab": "28"
              },
              "top": 160,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Surcharge:"
              },
              "top": 160,
              "left": 120
            },
            {
              "title": "+A_DES",
              "props": {
                "af": "7"
              },
              "top": 160,
              "left": 240
            },
            {
              "title": "Space",
              "props": {
                "ab": "28"
              },
              "top": 200,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Discount :"
              },
              "top": 200,
              "left": 120
            },
            {
              "title": "-A_DES",
              "props": {
                "ab": "7"
              },
              "top": 200,
              "left": 240
            },
            {
              "title": "自定文字",
              "props": {
                "text": "=========================================="
              },
              "top": 240,
              "left": 0
            },
            {
              "title": "Space",
              "props": {
                "ab": "28"
              },
              "top": 280,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Grand Total:"
              },
              "top": 280,
              "left": 120
            },
            {
              "title": "AMOUNT",
              "props": {
                "af": "7"
              },
              "top": 280,
              "left": 240
            },
            {
              "title": "Space",
              "props": {
                "ab": "12"
              },
              "top": 360,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Tender:$"
              },
              "top": 360,
              "left": 120
            },
            {
              "title": "IN_AMT",
              "props": {
                "af": "6"
              },
              "top": 360,
              "left": 240
            },
            {
              "title": "自定文字",
              "props": {
                "text": " "
              },
              "top": 360,
              "left": 360
            },
            {
              "title": "Space",
              "props": {
                "ab": "4"
              },
              "top": 360,
              "left": 480
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Refund:$"
              },
              "top": 360,
              "left": 600
            },
            {
              "title": "CHG_AMT",
              "props": {
                "af": "4"
              },
              "top": 360,
              "left": 720
            },
            {
              "title": "自定文字",
              "props": {
                "text": " "
              },
              "top": 360,
              "left": 840
            },
            {
              "title": "自定文字",
              "props": {
                "text": "Payment Type："
              },
              "top": 400,
              "left": 0
            }
          ],
          "payment": [
            {
              "title": "PAD_NAC",
              "props": {
                "ab": "12"
              },
              "top": 0,
              "left": 0
            },
            {
              "title": "PAD_SNO",
              "props": {
                "fc": "********",
                "Cpy": "13,16",
                "ab": "16"
              },
              "top": 0,
              "left": 120
            },
            {
              "title": "PAD_AMT",
              "props": {
                "af": "14"
              },
              "top": 0,
              "left": 240
            }
          ],
          "footer2": [
            {
              "title": "N_LINES",
              "props": {
                "nl": "2"
              },
              "top": 0,
              "left": 0
            },
            {
              "title": "自定文字",
              "props": {
                "text": "《《 Thank You for Your Patronage!》》",
                "al": "1"
              },
              "top": 80,
              "left": 0
            },
            {
              "title": "N_LINES",
              "props": {
                "nl": "4"
              },
              "top": 160,
              "left": 0
            }
          ]
        }
      }
      return json[str];
    }
  },
  computed: {
    // itemCount() {
    //   let count = 0;
    //   // let arr = [this.$refs.header, this.$refs.detail, this.$refs.footer1, this.$refs.payment, this.$refs.footer2];
    //   // arr.forEach(el => {
    //   //   console.log(el)
    //   //   if(typeof el != "undefined" && typeof el.items == "object")
    //   //     count += el.items.length;
    //   // });

    //   return count;
    // }
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
