1. Project IDX 專案是在 Safari run


---------------------------------
拖曳事件

https://pjchender.blogspot.com/2017/08/html5-drag-and-drop-api.html
draggable="true" 

1. 來源區
  1-1. dragstart, dragend
  1-2. 在 dragstart 中
    event.dataTransfer.effectAllowed = "copy";
    event.dataTransfer.setData("text/plain", item.text);

2. 目標區
  2-1. dragenter, dragover, dragleave; drop
  2-2. 在 dragover 中
    event.dataTransfer.dropEffect = "none";// 不允許放置
  2-3. 在 drop 
    let rect = this.$refs["target-b"].getBoundingClientRect();
    const top = event.clientY - rect.top;
    const left = event.clientX - rect.left;

    if (this.bItems.indexOf(this.draggedItem) !== -1) {
      this.draggedItem.top = Math.floor(top / 50) * 50;
      this.draggedItem.left = Math.floor(left / 100) * 100;
      this.draggedItem = null;
    } else {
      // 從 A div 拖曳到 B div
      this.bItems.push({
        ...this.draggedItem,
        top: Math.floor(top / 50) * 50, // 限制在格線內
        left: Math.floor(left / 100) * 100, // 假設格線寬度為 100px
      });
      this.draggedItem = null;
    }

