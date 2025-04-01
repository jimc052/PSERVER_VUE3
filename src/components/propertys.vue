<template>
  <div class="frame" ref="frame">
    <div class="header">屬性設定</div>
    <div class="section" ref="section">
      <div class="table-frame" ref="tableFrame">
        <table>
          <tr v-for="n in 30" :key="n">
            <td>{{ n }}</td>
            <td>{{ n }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import { nextTick, inject } from 'vue';

let timeId;

export default {
  name: '',
  components: {},
  data() {
    return {
      resize: 0
    };
  },
  created() {
    // console.clear();
  },
  async mounted() {
    this.$mybus.on('cursor', e => {
      console.log('cursor', e);
    })
    this.resize = inject('resize');
    this.onResize();
  },
  unmounted() {},
  methods: {
    onResize() {
      let el = this.$refs.tableFrame;
      el.style.display = "none";
      clearTimeout(timeId);

      timeId = setTimeout(() => {
        el.style.height = el.parentNode.clientHeight + "px";
        el.style.display = "block";
      }, 300);
    }
  },
  computed: {

  },
  watch: {
    resize(val) {
      // console.log("watch.resize: " + val);
      this.onResize();
    }
  }
};
</script>

<style scoped>
.frame {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--background1);
  color: var(--color1);
  padding: 10px 10px;
  font-size: 20px;
  text-align: center;
}

.section {
  flex: 1; /* 占据所有可用空间 */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止 section 溢出 */
}

.table-frame {
  height: 100%; /* 现在这会起作用，因为 .section 有了高度 */
  overflow-y: auto; /* 当内容超出高度时，启用滚动条 */
}

table {
  width: 100%;
  font-size: 18px;
  border-collapse: collapse; /* 可选：使表格边框更整洁 */
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
