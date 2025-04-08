<template>
  <div id="header">
    <div style="flex: 1;">
      <Button type="success" @click="onUpload">上傳</Button>
      <Button type="success" @click="onOpenDialog" style="margin: 0 10px;">文字檔</Button>

      <Select placeholder="請選擇範本" @on-change="onChange" style="width: 100px;">
        <Option v-for="item in options" :value="item" :key="item">
          {{ item }}
        </Option>
      </Select>

      <input type="file" ref="fileInput" @change="onFileSelected" accept=".txt, text/plain" style="display: none;" />
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
      options: [
        "收據",
        "結帳單",
        "標籤"
      ]
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
    onOpenDialog() {
      
    },
    onUpload() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const file = event.target.files[0]; // Get the selected file
      if (!file) {
        console.log("No file selected.");
        return;
      }

      if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
          alert('請選擇一個文字檔 (.txt)');
          event.target.value = null;
          return;
      }


      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedFileContent = e.target.result;
        console.log("檔案內容:");
        console.log(this.uploadedFileContent);
        alert('檔案讀取成功！'); // Simple feedback
      };

      reader.onerror = (e) => {
        console.error("讀取檔案時發生錯誤:", e);
        alert('讀取檔案時發生錯誤！');
      };

      reader.readAsText(file);
      event.target.value = null;
    },
    onChange(e) {
      console.log(e)
    },
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
