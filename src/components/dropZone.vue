<template>
  <div class="container" :class="{gradient: items.length > 0}" ref="zone" 
    @dragenter="dragEnterZone" @dragover="dragOverZone" @drop="dropZone"
    @dblclick="onDoubleClick"
  >
    <div class="placeholder-text" v-if="items.length == 0">
      <div>{{ zone }}</div>
      <div v-if="zone == 'header' || zone == 'detail'">
        {{"Double Clcik to Edit"}}</div>
    </div>
   
    <div v-for="(el, index) in items" :key="index" draggable="true" 
        @dragstart="dragStartItem(index, el, $event)"
        @dragover="dragOverItem(index, el, $event)" 
        @dragenter="dragEnterItem(index, el, $event)"
        @dragleave="dragLeaveItem(index, el, $event)"
        v-on:click="clickItem(index, el, $event)"
        class="item" 
        :class="{
          'item-active': active == index, 
          // customerize: active != index && typeof el.props == 'object' && typeof el.props.text == 'string' && el.props.text.length > 0 
        }"
        :style="{
          top: el.top + 'px',
          left: el.left + 'px',
          width: this.$cellWidth + 'px',
          height: this.$cellHeight + 'px',
        }">
        {{ typeof el.props == "object" && typeof el.props.text == "string" && el.props.text.length > 0 
          ? el.props.text : el.title 
        }}
    </div>
  </div>
</template>

<script>
let groupSource = "", dropEffect = undefined;
export default {
  name: '',
  components: {},
  props: {
		group: {
			type: String,
			default: "" 
		},
    zone: "",
  },
  data() {
    return {
      items: [
      ],
      prop: undefined,
      draggedItem: null,
      active: -1
    };
  },
  created() {
  },
  async mounted() {
    this.$mybus.on('sourceDragStart', e => {
      groupSource = ("付款資料" == e.group || "交易明細" == e.group) ? e.group : ""; 
      dropEffect = typeof e.zone == "string" && e.zone == "any" ? "copy" : undefined;
      this.draggedItem = {title: e.title};
    });
    this.$mybus.on('sourceDragEnd', e => {
      this.draggedItem = null;
    });

    this.$mybus.on('delAll', e => {
      this.items = [];
      this.active = -1;
      this.draggedItem = null;
    });
    this.$mybus.on("item", e => {
      if(e.zone != this.zone) {
        this.draggedItem = null;
        this.active = -1;
      }
    })
    this.$mybus.on("item-update", e => {
      // console.log(JSON.stringify(e, null, 2))
      if(e.id == this.zone) {
        this.prop = e.props;
      } else if(e.zone == this.zone) {
        let index = this.items.findIndex(el => el.id == e.id);
        if(index != -1) {
          this.items[index].props = e.props;
        }
      }
    })
    // this.$mybus.emit('item-update', obj);
  },
  unmounted() {},
  methods: {
    onDoubleClick() {
      if((this.zone == "detail" || this.zone == "header") && this.items.length > 0 ) {
        if(typeof this.prop == "object") {
          delete this.prop.text;
        }
        
        this.$mybus.emit('section-props', {
          zone: this.zone,
          props: this.prop,
        });
      }
    },
    clickItem(index, item, e) {
      this.$mybus.emit('item', {
        zone: this.zone,
        item,
        index
      });
      this.active = index;
    },
    dragEnterZone(event) {
      event.preventDefault();
    },
    dragOverZone(event) {
      event.preventDefault();

      if(typeof dropEffect != "undefined")
        event.dataTransfer.dropEffect = dropEffect
      else {
        if(("付款資料" == this.group || "交易明細" == this.group) && (this.group != groupSource))
          event.dataTransfer.dropEffect = "none"; // "none" 不允許放置
        else if(("付款資料" == groupSource || "交易明細" == groupSource) && (this.group != groupSource))
          event.dataTransfer.dropEffect = "none"; // "none" 不允許放置
      } 
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
        this.$mybus.emit('item', {
          zone: this.zone,
          item: this.draggedItem,
          index: this.active
        });
        this.draggedItem.top = Math.floor(top / this.$cellHeight) * this.$cellHeight;
        this.draggedItem.left = Math.floor(left / this.$cellWidth) * this.$cellWidth;
        this.draggedItem = null;
      }
    },
    dragStartItem(index, item, event) {
      dropEffect = "move";
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
    overflow: hidden;
    padding: 0px 0px;
    position: relative;
  }

  .gradient {
    background: var(--background1);

    /* background-image: radial-gradient(var(--color1) 1px, transparent 0);
    background-size: 20px 20px; */

    background-image:
    linear-gradient(to bottom, var(--color2) 0px, var(--color2) 1px, transparent 1px, transparent 20px),
    linear-gradient(to right, var(--color2) 0px, var(--color2) 1px, transparent 1px, transparent 20px);
    background-size: 20px 20px;

    position: relative;
  }

  .placeholder-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    background: var(--background1);
    color: var(--color1);

  }
  .placeholder-text > div:nth-child(1) {
    font-weight: 900;
  }
  .placeholder-text > div:nth-child(2) {
    font-size: 20px;
    color: var(--color2);
  }

  .item {
    position: absolute;
    /* border: 1px solid #2db7f5; */
    border-radius: 5px;
    padding: 5px;
    cursor: move;
    text-align: center;
    vertical-align: middle;
    font-size: 16px;
    background-color: #c5c8ce;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .item-focus {
    border: 1px dotted #ff9900;
  }
  .item-active {
    /* border: 1px solid orangered; */
    background-color: #5cadff;
    color: white;
  }
</style>
