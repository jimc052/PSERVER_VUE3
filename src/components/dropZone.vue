<template>
  <div class="container" ref="zone" @dragenter="dragEnterZone" @dragover="dragOverZone" @drop="dropZone">
    <div v-for="(el, index) in items" :key="index" draggable="true" 
        @dragstart="dragStartItem(el, $event)"
        @dragover="dragOverItem(el, $event)" 
        @dragenter="dragEnterItem(el, $event)"
        @dragleave="dragLeaveItem(el, $event)" 
        class="item-target" 
        :style="{
          top: el.top + 'px',
          left: el.left + 'px',
        }">
        {{ el.title }}
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      items: [
      ],
      draggedItem: null,
    };
  },
  created() {
  },
  async mounted() {
    this.$mybus.on('sourceDragEnd', e => {
      this.draggedItem = null;
    });
    this.$mybus.on('sourceDragStart', e => {
      // console.log(e)
      this.draggedItem = e;
    });
  },
  unmounted() {},
  methods: {
    dragEnterZone(event) {
      event.preventDefault();
    },
    dragOverZone(event) {
      event.preventDefault();
      // event.dataTransfer.dropEffect = "none";// 不允許放置
    },
    dropZone(event) {
      let data = event.dataTransfer.getData("text/plain");
      if (this.draggedItem) {
        let rect = this.$refs["zone"].getBoundingClientRect();
        const top = event.clientY - rect.top;
        const left = event.clientX - rect.left;
        // console.log("dropZone: " + this.items.indexOf(this.draggedItem))
        if (this.items.indexOf(this.draggedItem) == -1) {
          this.items.push(this.draggedItem)
        }
        this.draggedItem.top = Math.floor(top / this.$cellHeight) * this.$cellHeight;
        this.draggedItem.left = Math.floor(left / 150) * 150;
        this.draggedItem = null;
      }
    },
    dragStartItem(item, event) {
      if(event){
        //  none, copy, copyLink, copyMove, link, linkMove, move, all
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", item.text);
      }
      this.draggedItem = item;
    },    
    dragOverItem(item, event) {
      event.preventDefault();
    },
    dragEnterItem(item, event) {
      if(item != this.draggedItem)
        event.srcElement.classList.add("item-focus")
    },
    dragLeaveItem(item, event) {
      event.srcElement.classList.remove("item-focus")
    },
  },
  computed: {
  },
  watch: {
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  background-color: white;
  position: relative;
  background-image: 
    linear-gradient(to bottom, #eee 0px, #eee 1px, transparent 1px, transparent 50px),
    linear-gradient(to right, #eee 0px, #eee 1px, transparent 1px, transparent 100%)
    ;
  background-size: 100% 50px;
  overflow: hidden;
  padding: 0px 10px;
}

.item-target {
  position: absolute;
  border: 1px solid #999;
  padding: 5px;
  cursor: move;
  width: 120px;
  font-size: 16px;
}
.item-focus {
  border: 1px solid red;
}
</style>
