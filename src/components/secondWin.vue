<template>
 <splitpanes class="default-theme">
  <pane min-size="60" max-size="80">
    <splitpanes horizontal>
      <pane min-size="10">
        <DropZone zone="header" />
      </pane>

      <pane min-size="10">
        <DropZone  />
      </pane>
      
      <pane min-size="20">
        
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
