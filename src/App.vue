<template>
  <div id="header"></div>
  <div id="section">
    <Elements />
    <SecondWin />
  </div>
  <div id="footer"></div>
</template>

<script>
import Elements from './components/elements.vue';
import SecondWin from './components/secondWin.vue';

export default {
  name: '',
  components: {
    Elements, SecondWin
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
#header, #footer {
  min-height: 30px;
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
