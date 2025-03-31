<template>
  <div id="header">
    <div style="flex: 1;"></div>
      <RadioGroup v-model="platform" type="button"  button-style="solid" @on-change="changePlatform">
        <Radio label="JabezPOS"></Radio>
        <Radio label="newPOS"></Radio>
      </RadioGroup>
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

let _platform = "JabezPOS";

export default {
  name: '',
  components: {
    Elements, SecondWin
  },
  data () {
    return {
      platform: "",
      resize: 0
    }
  },
  created(){
    // console.clear();
    provide('platform', _platform);
    this.platform = _platform;
    console.log(this.platform)

    provide('resize', this.resize);
	},
	async mounted() {
    window.onresize = () => {
      return (() => {
        this.resize = document.body.clientHeight;
        console.log(this.resize)
      })()
    }
  },
	unmounted() {
  },
  methods: {
    changePlatform: (val) => { // 還沒寫
      // console.log("changePlatform: " + val);
    }
  },
  computed: {
  }
}
</script>

<style scoped>
#header, #footer {
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
}
#header {
  border-bottom: 1px solid #eee;
}
#footer {
  border-top: 1px solid #eee;
}
#section {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* height: 100%; */
  /* width: 100%; */
}
</style>
