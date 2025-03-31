<template>
  <div class="frame">
    <div class="header">
      屬性設定
    </div>
    <div class="section">
      <table>
        <tr v-for="n in 10" >
          <td>{{ n }}</td>
        </tr>
      </table>
    </div>
    <div class="fooer"></div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {
    }
  },
  created(){
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
.frame {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  color: rgba(255, 255, 255, 0.85);
  background-color: rgb(81, 90, 110);
  padding: 10px 10px;
  font-size: 20px;
  text-align: center;
  /* border-bottom: 1px solid #eee; */
}

.section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.fooer {
  color: rgba(255, 255, 255, 0.85);
  background-color: rgb(81, 90, 110);
  height: 40p;
}


</style>
