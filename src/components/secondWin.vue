<template>
 <splitpanes class="default-theme" style="margin-left: 5px;">
  <pane min-size="60" max-size="80">
    <splitpanes horizontal>
      <pane min-size="5">
        <DropZone zone="header" />
      </pane>

      <pane min-size="5">
        <DropZone group="交易明細"   zone="detail" />
      </pane>
      
      <pane min-size="40" style="display: flex; flex-direction: column; ">
        <div style="flex: 1;"><DropZone zone="footer1" /></div>

        <DropZone group="付款資料"  zone="payment"
          style="border: 1px solid #2d8cf0; height: 40px; margin: 5px 0px;" 
        />

        <div style="flex: 1;"><DropZone zone="footer2" /></div>
      </pane>
    </splitpanes>
  </pane>
  <pane>
    <Propertys />
  </pane>
</splitpanes>
</template>

<script>
import Propertys from "./propertys.vue";
import { Splitpanes, Pane } from 'splitpanes'; // npm i splitpanes;  https://antoniandre.github.io/splitpanes/
import 'splitpanes/dist/splitpanes.css';
import DropZone from "./dropZone.vue";

export default {
  name: '',
  components: {
    Splitpanes, Pane, Propertys, DropZone
  },
  data() {
    return {
    }
  },
  created() {
    // console.clear();
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
.splitpanes__pane {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* font-family: Helvetica, Arial, sans-serif; */
  /* color: rgba(255, 255, 255, 0.6); */
  /* font-size: 2em; */
}
</style>
