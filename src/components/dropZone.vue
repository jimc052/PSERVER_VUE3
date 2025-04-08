<template>
  <div class="container" ref="zone" 
    @dragenter="dragEnterZone" @dragover="dragOverZone" @drop="dropZone"
  >
    <div v-for="(el, index) in items" :key="index" draggable="true" 
        @dragstart="dragStartItem(index, el, $event)"
        @dragover="dragOverItem(index, el, $event)" 
        @dragenter="dragEnterItem(index, el, $event)"
        @dragleave="dragLeaveItem(index, el, $event)"
        v-on:click="clickItem(index, el, $event)"
        class="item" :class="{ 'item-active': active == index }"
        :style="{
          top: el.top + 'px',
          left: el.left + 'px',
          width: this.$cellWidth + 'px',
          height: this.$cellHeight + 'px',
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
    zone: ""
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
    console.log(this.zone)
    this.$mybus.on('sourceDragEnd', e => {
      this.draggedItem = null;
    });
    this.$mybus.on('sourceDragStart', e => {
      this.draggedItem = e;
    });
    this.$mybus.on('group', e => {
      this._group = e; // "付款資料", "交易明細"
    });
    this.$mybus.on('delAll', e => {
      this.items = [];
      this.active = -1;
    });
  },
  unmounted() {},
  methods: {
    clickItem(index, item, e) {
      this.$mybus.emit('item', item);
      this.active = index;
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
      if (this.draggedItem) {
        let rect = this.$refs["zone"].getBoundingClientRect();
        const top = event.clientY - rect.top;
        const left = event.clientX - rect.left;
        // console.log("dropZone: " + this.items.indexOf(this.draggedItem))
        if (this.items.indexOf(this.draggedItem) == -1) {
          this.draggedItem.id = Date.now();
          this.items.push(this.draggedItem);
          this.active = this.items.length - 1;
        }
        this.$mybus.emit('item', this.draggedItem);
        this.draggedItem.top = Math.floor(top / this.$cellHeight) * this.$cellHeight;
        this.draggedItem.left = Math.floor(left / this.$cellWidth) * this.$cellWidth;
        this.draggedItem = null;
      }
    },
    dragStartItem(index, item, event) {
      if(event){
        //  none, copy, copyLink, copyMove, link, linkMove, move, all
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", item.text);
      }
      this.active = index;
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
  background: var(--background2);
  
  background-image:
    linear-gradient(to bottom, var(--color2) 0px, var(--color2) 1px, transparent 1px, transparent 20px),
    linear-gradient(to right, var(--color2) 0px, var(--color2) 1px, transparent 1px, transparent 20px);
  background-size: 20px 20px;

  overflow: hidden;
  padding: 0px 0px;
  position: relative;
}

.item {
  position: absolute;
  border: 1px solid #999;
  padding: 5px;
  cursor: move;
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  background-color: white;
}
.item-focus {
  border: 1px dotted red;
}
.item-active {
  /* border: 1px solid orangered; */
  background-color: #2d8cf0;
  color: white;
}
</style>
