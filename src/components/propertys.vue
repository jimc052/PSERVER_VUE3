<template>
  <div class="frame" ref="frame">
    <div class="header">{{(title.length > 0 ? title : "屬性設定")}}</div>
    <div class="section" ref="section">
      <div class="table-frame" ref="tableFrame">
        <table v-if="draggedItem">
          <tr v-for="(value, key, index) in draggedItem" :key="index">
            <td style="min-width: 85px;">{{ value.title }}</td>
            <td>
              <div v-if="typeof value.cols == 'number' " style="display: flex; flex-direction: row;">
                <Input v-model="value.value"  :placeholder="value.placeholder1"  />
                <Input style="margin-left: 5px;" v-model="value.value" :placeholder="value.placeholder2" />
              </div>

              <Select  v-else-if="Array.isArray(value.options)" v-model="value.value" style="width:200px">
                  <Option v-for="item in value.options" :value="item.value" :key="item.value">
                    {{ item.label }}
                  </Option>
              </Select>


              <Input v-else v-model="value.value" :placeholder="value.placeholder" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
let timeId;

export default {
  name: '',
  components: {},
  data() {
    return {
      draggedItem: null,
      title: ""
    };
  },
  created() {
    // console.clear();
  },
  async mounted() {
    this.$mybus.on('resize', e => {
      this.onResize();
    })
    this.onResize();

    this.$mybus.on("item", e => {
      // this.draggedItem = e;
      // console.log(e)
      this.title = e.title;

      if(typeof this.$properties[e.title] == "object") {
        this.draggedItem = this.$properties[e.title]
      } else {
        this.draggedItem = Object.assign({}, this.$properties["default"]);
      }

      console.log(this.draggedItem)
    })
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
  padding: 10px 10px;
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
