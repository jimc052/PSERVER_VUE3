<template>
  <div class="frame" ref="frame">
    <div class="header">{{(title.length > 0 ? title : "屬性設定")}}</div>
    <div class="section" ref="section">
      <div class="table-frame" ref="tableFrame" v-if="draggedItem != null">
        <table v-if="draggedItem">
          <tr v-for="(value, key, index) in draggedItem" :key="index">
            <td style="min-width: 85px;">{{ value.title }}</td>
            <td>
              <div v-if="typeof value.cols == 'number' " style="display: flex; flex-direction: row;">
                <Input v-model="value.value1"  :placeholder="value.placeholder1" 
                  @on-change="onChange(key, value, $event)"
                />
                <Input style="margin-left: 5px;" v-model="value.value2" :placeholder="value.placeholder2" 
                  @on-change="onChange(key, value, $event)"
                />
              </div>

              <Select v-else-if="Array.isArray(value.options)" v-model="value.value" 
                :placeholder="value.placeholder"
                @on-change="onChange(key, value, $event)"
              >
                  <Option v-for="item in value.options" :value="item.value" :key="item.value">
                    {{ item.label }}
                  </Option>
              </Select>

              <Input v-else v-model="value.value" :placeholder="value.placeholder"
                @on-change="onChange(key, value, $event)" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer"></div>
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

    this.$mybus.on("item", e => {
      console.log(JSON.stringify(e, null, 2))
      this.draggedItem = null;
      this.title = e.item.title;
      this.id = e.item.id;
      zone = e.zone;
      if(typeof this.$properties[e.item.title] == "object") {
        this.draggedItem = Object.assign({}, this.$properties[e.item.title]);
      } else {
        this.draggedItem = Object.assign({}, this.$properties["default"]);
      }
      if(! (this.platform == "new2POS" && (e.item.title == "TASK_NM" || e.item.title == "PLU_NAME"))) {
        delete this.draggedItem.key;
      }
      
      for(let key in this.draggedItem) {
        if(typeof e.item.props == "object") {
          this.draggedItem[key].value = typeof e.item.props[key] == "undefined" ? undefined : e.item.props[key];
        } else {
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
        obj.props[key] = this.draggedItem[key].value;
      }
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
}
</style>
