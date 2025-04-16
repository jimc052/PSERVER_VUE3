<template>
  <div class="frame" ref="frame">
    <div class="header">{{(title.length > 0 ? title : "屬性設定")}}</div>
    <div class="section" ref="section">
      <div class="table-frame" ref="tableFrame" v-if="draggedItem != null">
        <table v-if="draggedItem">
          <tr v-for="(item, key, index) in draggedItem" :key="index">
            <td style="min-width: 85px;">{{ item.title }}</td>
            <td>
              <div v-if="typeof item.cols == 'number' " style="display: flex; flex-direction: row;">
                <Input v-model="item.value1"  :placeholder="item.placeholder1" 
                  @on-change="onChange(key, value1, $event)"
                />
                <Input style="margin-left: 5px;" v-model="item.value2" :placeholder="item.placeholder2" 
                  @on-change="onChange(key, value2, $event)"
                />
              </div>

              <Select v-else-if="Array.isArray(item.options)" v-model="item.value" 
                :placeholder="item.placeholder"
                @on-change="onChange(key, value, $event)"
              >
                  <Option v-for="option in item.options" :value="option.value" :key="option.value">
                    {{ option.label }}
                  </Option>
              </Select>

              <Input v-else v-model="item.value" :placeholder="item.placeholder"
                @on-change="onChange(key, value, $event)" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
let timeId, zone;

export default {
  name: '',
  components: {},
  data() {
    return {
      draggedItem: null,
      id: "", title: "",
      platform: "",
    };
  },
  created() {
    // console.clear();
  },
  async mounted() {
    this.$mybus.on('platform', e => {
      this.platform = e;
    })
  
    this.$mybus.on('resize', e => {
      this.onResize();
    })
    this.onResize();

    this.$mybus.on("section-props", e => {
      this.title = e.zone;
      this.id = e.zone;
      // console.log("section-" + e.zone)
      // console.log(this.$properties["section-" + e.zone])

      if(typeof this.$properties["section-" + e.zone] == "object") {
        this.draggedItem = Object.assign({}, this.$properties["section-" + e.zone]);
      } else {
        this.draggedItem = {};
      }
      if(typeof e.props == "object") {
        for(let key in e.props) {
          if(typeof e.props[key] == "undefined") {
            this.draggedItem[key] = {title: key,value: e.props[key]};
          } else if(typeof this.draggedItem[key] == "undefined") {
            this.draggedItem[key] = {title: key, value: e.props[key]};
          } else {
            this.draggedItem[key].value = e.props[key];
          }
        }
      }
    });

    this.$mybus.on("item", e => {
      // console.log(JSON.stringify(e, null, 2))
      this.draggedItem = null;
      if(e == null) {
        this.id = ""; this.title = "";
        zone = null;
        return;
      } 

      this.title = e.item.title;
      this.id = e.item.id;
      zone = e.zone;

      let json = {};
      if(e.item.title == "自定文字") {
        json = {
          text: {
            title: "文字",
            placeholder: "請輸入內容"
          }
        }
      }
      // console.log(JSON.stringify(this.draggedItem["Cpy"], null, 2))

      if(typeof this.$properties[e.item.title] == "object") {
        json = Object.assign(json, this.$properties[e.item.title]);
      } else {
        json = Object.assign(json, this.$properties["default"]);
      }
      if(! (this.platform == "new2POS" && ("TASK_NM,PC_NAME,PLU_NAME".indexOf(e.item.title) != -1))) {
        delete json.key;
      }
      this.draggedItem = json;
      // console.log(JSON.stringify(this.draggedItem, null, 2))
      console.clear();
      
      for(let key in this.draggedItem) {
        if(typeof e.item.props == "object") {
          if(typeof this.draggedItem[key].cols == "number") {
            if(typeof e.item.props[key] != "undefined") {
              let arr = e.item.props[key].split(",");
              this.draggedItem[key].value1 = arr[0];
              this.draggedItem[key].value2 = arr.length == 2 ? arr[1] : "";              
            } else {
              this.draggedItem[key].value1 = "";
              this.draggedItem[key].value2 = "";
            }
          } else 
            this.draggedItem[key].value = typeof e.item.props[key] == "undefined" ? undefined : e.item.props[key];
        } else {
          if(this.draggedItem[key].value1 != undefined)
            this.draggedItem[key].value1 = undefined;
          else if(this.draggedItem[key].value2 != undefined)
            this.draggedItem[key].value2 = undefined;
          this.draggedItem[key].value = undefined;
        }
      }
    })

    this.$mybus.on('delAll', e => {
      this.draggedItem = null;
      this.id = ""; this.title = "";
    });
  },
  unmounted() {},
  methods: {
    onResize() {
      let el = this.$refs.tableFrame;
      if(!el) return;
      clearTimeout(timeId);

      el.style.display = "none";
      timeId = setTimeout(() => {
        el.style.height = el.parentNode.clientHeight + "px";
        el.style.display = "block";
      }, 100);
    }, 
    onChange(key, value, event) {
      let obj = {id: this.id, zone, props: {}}
      for(let key in this.draggedItem) {
        if(typeof this.draggedItem[key].cols == "number") {
          let value1 = typeof this.draggedItem[key].value1 == "undefined" ? "" : this.draggedItem[key].value1;
          let value2 = typeof this.draggedItem[key].value2 == "undefined" ? "" : this.draggedItem[key].value2;
          
          obj.props[key] = value1.length > 0 || value2.length > 0 ? value1 + "," + value2 : "";
          // console.log(JSON.stringify(this.draggedItem[key], null, 2))
          console.log(obj.props[key])
        } else {
          obj.props[key] = this.draggedItem[key].value;
        }
      }
      // console.log(JSON.stringify(obj, null, 2))
      this.$mybus.emit('item-update', obj);
    }
  },
  computed: {
  },
  watch: {
  }
};
</script>

<style scoped>
.frame {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--background2);
}

.header {
  background-color: var(--background1);
  color: var(--color1);
  padding: 5px 0px;
  font-size: 20px;
  text-align: center;
  border-bottom: var(--color2) 3px solid;
}

.section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; 
}

.table-frame {
  height: 100%;
  overflow-y: auto;
}

table {
  width: 100%;
  font-size: 18px;
  border-collapse: collapse;
}
tr {
  color: var(--color2);
  background-color: var(--background2);
}
tr > td:nth-child(1) {
  text-align: right;
  border-right: 1px solid #eee;
}

td {
  border-bottom: 1px solid #eee;
  padding: 5px 5px;
}

.footer {
  color: var(--color1);
  background-color: var(--background1);
  height: 40px;
  border-top: var(--color2) 3px solid;
}
</style>
