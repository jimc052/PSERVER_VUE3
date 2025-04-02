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
    this.$mybus.on('resize', e => {
      this.onResize();
    })
    this.onResize();
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
