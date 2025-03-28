<template>
  <div id="menu-frame">
    <div v-for="(el, index) in groups" :key="index" :class="{'group-list': index == cursor}">
      <div class="group" @mousedown="cursor = index">
        <div style="flex: 1">{{el.title}}</div>
        <Icon :type="index == cursor ? 'ios-arrow-up' : 'ios-arrow-down'" />
      </div>
      <div v-if="index == cursor" class="detail-list">
        <div v-for="(el2, index2) in el.data" :key="index2"  class="detail">
          {{el2.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        ]},
        {title: "POS_H", data: []},
        {title: "POS_I", data: []},
        {title: "付款別", data: []},
        {title: "全域", data: [
          {title: "Space"},
          {title: "NLine"},
        ]},
      ], 
      cursor: 0
    }
  },
  created() {
    console.clear();
  },
  async mounted() {

  },
  unmounted() {
  },
  methods: {
  },
  computed: {
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
  color: rgba(255, 255, 255, 0.85);
  background-color: rgb(81, 90, 110);
}
.group-list {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.detail-list {
  flex: 1;
  border-bottom: 1px solid #eee;
  background: #363e4f;
  overflow-x: hidden;
  overflow-y: auto;
}

.detail {
  padding: 10px 10px;
  font-size: 18px;
  user-select: none;
  cursor: grab;
  color: rgba(255, 255, 255, 0.5);
}
div.detail + div.detail {
  /* padding-top: 0; */
  border-top: 1px solid #eee;
}

</style>
