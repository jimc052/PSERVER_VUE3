<template>
  <div id="menu-frame"  ref="menuFrame">
    <div v-for="(el, index) in groups" :key="index" :class="{'group-list': index == cursor}">
      <div class="group" @mousedown="cursor = index">
        <div style="flex: 1">{{el.title}}</div>
        <Icon :type="index == cursor ? 'ios-arrow-up' : 'ios-arrow-down'" />
      </div>
      <div v-if="index == cursor" ref="detailFame" style="flex: 1; background: var(--background2)">
        <div class="detail-list" ref="detailList">
          <div v-for="(el2, index2) in el.data" :key="index2" class="detail">
            {{el2.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, inject } from 'vue';
let timeId;

export default {
  name: '',
  components: {
  },
  data() {
    return {
      groups: [
        {title: "APLSYS", data: [
          {title: "STOCK_NO"},
          {title: "STR_NAME"},
          {title: "ADDRESS"},
          {title: "TEL"},
          {title: "COMP_CODE"},
        ]},
        {title: "POS_H", data: [
          {title: "T_DAY"},
          {title: "T_SER_NO"},
          {title: "T_VIP"},
          {title: "T_OD"},
          {title: "IN_AMT"},
          {title: "CHG_AMT"},
        ]},
        {title: "POS_I", data: [
          {title: "PLU_CODE"},
          {title: "PLU_NAME"},
          {title: "PRICE"},
          {title: "CNT"},
          {title: "TOTAL"},
          {title: "TASK_NM"},
        ]},
        {title: "付款別", data: []},
        {title: "全域", data: [
          {title: "Space"},
          {title: "NLine"},
        ]},
      ], 
      cursor: 0,
      platform: "",
      resize: 0
    }
  },
  created() {
    // console.clear();
  },
  async mounted() {
    this.platform = inject('platform');
    this.resize = inject('resize');
    this.onResize();
  },
  unmounted() {
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
    }
  },
  computed: {
  },
  watch: {
    platform(val) {
      console.log("wahtch.platform: "  + val);
    },
    resize(val) {
      // console.log("watch.resize: " + val);
      this.onResize();
    },
    cursor(val) {
      console.log("cursor: " + val);
      this.onResize();
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
