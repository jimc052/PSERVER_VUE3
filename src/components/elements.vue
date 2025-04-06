<template>
  <div id="menu-frame" style="background: var(--background2)">
    <div v-for="(el, index) in groups" :key="index" :class="{'group-list': index == cursor}">
      <div class="group" @mousedown="cursor = (cursor == index ? -1 : index)">
        <div style="flex: 1">{{el.title}}</div>
        <Icon :type="index == cursor ? 'ios-arrow-up' : 'ios-arrow-down'" />
      </div>
      <div v-if="index == cursor" style="flex: 1;">
        <div class="detail-list">
          <div v-for="(el2, index2) in el.data" :key="index2" class="detail" draggable="true" 
            @dragstart="dragStart($event, el2)" @dragend="dragEnd($event, el2)">
            {{el2.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, } from 'vue';
let timeId;

export default {
  name: '',
  components: {
  },
  data() {
    return {
      groups: [
        {title: "機台資料", data: [
          {title: "STOCK_NO"},
          {title: "STR_NAME", tag: "STORE_NAME"},
          {title: "ADDRESS"},
          {title: "TEL"},
          {title: "COMP_CODE"},
          {title: "TM_NO"},
          {title: "TM_NAME"},
        ]},
        {title: "交易主檔", data: [
          {title: "T_DAY"},
          {title: "T_SER_NO"},
          {title: "T_VIP"},
          {title: "T_OD"},
          {title: "IN_AMT"},
          {title: "CHG_AMT"},
        ]},
        {title: "交易明細", data: [
          {title: "PLU_CODE"},
          {title: "PLU_NAME"},
          {title: "PRICE"},
          {title: "CNT"},
          {title: "TOTAL"},
          {title: "TASK_NM"},
        ]},
        {title: "付款資料", data: [
          {title: "PAD_NAC"},
          {title: "PAD_SNO"},
          {title: "PAD_AMT"},
        ]},
        {title: "全域", data: [
          {title: "Space"},
          {title: "NLine"},
        ]},
      ], 
      cursor: 0,
      platform: "",
    }
  },
  created() {
    // console.clear();
    // P#[PAD_NAC:ab=12][PAD_SNO:fc=********;Cpy=13,16;ab=16][PAD_AMT:af=14]
  },
  async mounted() {
    this.$mybus.on('resize', e => {
      this.onResize();
    })
    this.$mybus.on('platform', e => {
      this.platform = e;
    })
    this.onResize();
  },
  unmounted() {
    // this.$mybus.off('resize');
    // this.$mybus.off('platform');
  },
  methods: {
    async onResize() {
      await nextTick();
      let el = document.querySelector(".detail-list");
      if(el) {
        el.style.display = "none";
        clearTimeout(timeId);
        timeId = setTimeout(() => {
          el.style.height = el.parentNode.clientHeight + "px";
          el.style.display = "block";        
        }, 100);          
      }
    },
    dragStart(event, item) {
      event.dataTransfer.effectAllowed = "copy";
      // event.dataTransfer.setData("text/plain", this.groups[this.cursor].title);
      this.$mybus.emit('sourceDragStart', Object.assign({}, item));
    },
    dragEnd(event, item) {
      this.$mybus.emit('sourceDragEnd', item);
    }
  },
  computed: {
  },
  watch: {
    platform(val) {
      console.log("watch.platform: "  + val);
    },
    cursor(val) {
      this.onResize();
      this.$mybus.emit('group', this.cursor == -1 ? "" : this.groups[this.cursor].title);
    }
  }
}
</script>

<style scoped>
#menu-frame {
  height: 100%;
  width: 240px;
  background-color: #eee;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.group {
  font-size: 20px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: var(--color1);
  background-color: var(--background1);
}
.group-list {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.detail-list {
  flex: 1;
  border-bottom: 1px solid #eee;
  background: var(--background2);
  color: var(--color2);
  overflow-x: hidden;
  overflow-y: auto;
}
.detail {
  padding: 10px 10px;
  font-size: 18px;
  user-select: none;
  cursor: grab;
}
div.detail + div.detail {
  border-top: 1px solid #eee;
}
div.detail:nth-last-child(1) {
  border-bottom: 1px solid #eee;
}
</style>
