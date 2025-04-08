<template>
  <div id="header">
    <div style="flex: 1;">
      <Button type="success">上傳</Button>
      <Button type="success" style="margin-left: 10px;">文字檔</Button>
    </div>
      <!-- <Button type="error">Error</Button> -->

      <RadioGroup v-model="platform" type="button"  button-style="solid" @on-change="changePlatform">
        <Radio label="JabezPOS"></Radio>
        <Radio label="new2POS"></Radio>
      </RadioGroup>

      <Button type="warning" icon="md-trash" @click="onClickTrash" style="margin-left: 10px;"></Button>
  </div>
  <div id="section">
    <Elements />
    <SecondWin />
  </div>
  <div id="footer"></div>
</template>

<script>
import { ref, provide } from 'vue';
import Elements from './components/elements.vue';
import SecondWin from './components/secondWin.vue';

export default {
  name: '',
  components: {
    Elements, SecondWin
  },
  data () {
    return {
      platform: "JabezPOS",
    }
  },
  created(){
	},
	async mounted() {
    this.$mybus.emit('platform', this.platform);
    window.onresize = () => {
      return (() => {
        this.$mybus.emit('resize', { hight: document.body.clientHeight, width: document.body.clientWidth });
      })()
    }
  },
	unmounted() {
  },
  methods: {
    onClickTrash() {
      this.$mybus.emit('delAll');
    },
    changePlatform(val) {
      this.$mybus.emit('platform', val);
    }
  },
  computed: {
  }
}
</script>

<style scoped>
#header, #footer {
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
