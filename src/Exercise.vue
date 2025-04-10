<template>
  <div id="header">
    <Button type="success" @click="onClick">轉換</Button>
    <div style="flex: 1;"></div>
    <Button type="warning" icon="md-swap" style="margin-left: 10px;" 
      @click="onClickSwap"/>
  </div>
  <div id="section">
    <textarea ref="textarea1" @input="onInput"></textarea>
    <textarea ref="textarea2"></textarea>
  </div>
</template>

<script>
import {sample} from "./system/sample.js"

export default {
  name: 'Exercise',
  components: {},
  data() {
    return {
    };
  },
  created() {
  },
  async mounted() {
    this.$refs.textarea1.value = localStorage.getItem("PSERVER");
    if(this.$refs.textarea1.value.trim().length > 0)
      this.onClick()
  },
  unmounted() {},
  methods: {
    onClick() {
      console.clear();
      let s = this.$refs.textarea1.value.trim(), result = "";
      if(s.indexOf("{") == 0) {
        let json = JSON.parse(s);
        if(typeof json["props"] == "object") {
          if(json["props"].beep == true) {
            result += "BEEP#\n"
          }
          if(typeof json["props"].prnSize == "number") { // ;[#PrnSize:80]
            result += `;[#PrnSize:${json["props"].prnSize}]\n`
          }
        }

      } else {
        let json = this.$parseText(this.$refs.textarea1.value.trim());
        result = JSON.stringify(json, null, 2);
      }
      
      this.$refs.textarea2.value = result;
    },
    onInput(){
      localStorage.setItem("PSERVER", this.$refs.textarea1.value)
    },
    onClickSwap() {
      localStorage.setItem("page", "App");
      location.reload();
    },
  },
  computed: {
  },
  watch: {
  }
};
</script>

<style scoped>
#header,
#footer {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#header {
  padding: 10px;
  background-color: var(--background1);
  border-bottom: 3px solid #eee;
}

#section {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* height: 100%; */
  /* width: 100%; */
}
textarea {
  flex: 1;
  margin: 0px 5px;
  height: calc(100% - 10px);
  font-size: 20px;
  padding: 5px;
}
textarea + textarea {
  /* margin-left: 10px; */
}
</style>
