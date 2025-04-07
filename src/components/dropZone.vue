<template>
  <div class="container" ref="zone" @dragenter="dragEnterZone" @dragover="dragOverZone" @drop="dropZone">
    <div v-for="(el, index) in items" :key="index" draggable="true" 
        @dragstart="dragStartItem(index, el, $event)"
        @dragover="dragOverItem(index, el, $event)" 
        @dragenter="dragEnterItem(index, el, $event)"
        @dragleave="dragLeaveItem(index, el, $event)"
        v-on:click="clickItem(index, el, $event)"
        class="item" 
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
  props: {
		group: {
			type: String,
			// require: true, 
			default: "" 
		},
  },
  data() {
    return {
      items: [
      ],
      draggedItem: null,
      _group: "",
      active: -1
    };
  },
  created() {
  },
  async mounted() {
    this.$mybus.on('sourceDragEnd', e => {
      this.draggedItem = null;
    });
    this.$mybus.on('sourceDragStart', e => {
      this.draggedItem = e;
    });
    this.$mybus.on('group', e => {
      this._group = e;
    });
  },
  unmounted() {},
  methods: {
    clickItem(index, item, e) {
      this.$mybus.emit('item', item);
    },
    dragEnterZone(event) {
      event.preventDefault();
    },
    dragOverZone(event) {
      event.preventDefault();
      if(this.group.length > 0 && this.group != this._group)
        event.dataTransfer.dropEffect = "none";// 不允許放置
    },
    dropZone(event) {
      let data = event.dataTransfer.getData("text/plain");
      if (this.draggedItem) {
        let rect = this.$refs["zone"].getBoundingClientRect();
        const top = event.clientY - rect.top;
        const left = event.clientX - rect.left;
        // console.log("dropZone: " + this.items.indexOf(this.draggedItem))
        if (this.items.indexOf(this.draggedItem) == -1) {
          this.draggedItem.id = Date.now();
          this.items.push(this.draggedItem);
        }
        this.$mybus.emit('item', this.draggedItem);
        this.draggedItem.top = Math.floor(top / this.$cellHeight) * this.$cellHeight;
        this.draggedItem.left = Math.floor(left / 150) * 150;
        this.draggedItem = null;
      }
    },
    dragStartItem(index, item, event) {
      if(event){
        //  none, copy, copyLink, copyMove, link, linkMove, move, all
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", item.text);
      }
      this.draggedItem = item;
    },    
    dragOverItem(index, item, event) {
      event.preventDefault();
    },
    dragEnterItem(index, item, event) {
      if(item != this.draggedItem)
        event.srcElement.classList.add("item-focus")
    },
    dragLeaveItem(index, item, event) {
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
  background: var(--background1);
  position: relative;
  background-image: 
    linear-gradient(to bottom, #eee 0px, #eee 1px, transparent 1px, transparent 50px),
    linear-gradient(to right, #eee 0px, #eee 1px, transparent 1px, transparent 100%)
    ;
  background-size: 100% 50px;
  overflow: hidden;
  padding: 0px 10px;
}

.item {
  position: absolute;
  border: 1px solid #999;
  padding: 5px;
  cursor: move;
  width: 120px;
  font-size: 16px;
  color: var(--color1);
}
.item-focus {
  border: 1px solid red;
}
</style>
