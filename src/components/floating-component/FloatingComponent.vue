<template>
  <vue-draggable-resizable
    ref="draggable"
    :class="!isMiniSize ? 'background-style-base' : backgroundMini"
    :drag-handle="!isMiniSize ? '.drag-handle' : ''"
    drag-cancel=".drag-cancel"
    :resizable="!isMiniSize"
    :handles="['tl', 'tr', 'br', 'bl']"
    :w="floatWidth"
    :h="floatHeight"
    :z="zindex"
    :x="floatPositionX"
    :y="floatPositionY"
    :min-width="380"
    :min-height="380"
    :on-drag="onDragCallback"
    :on-resize="onResizeCallback"
    :on-drag-start="onDragStartCallback"
    @resizestop="onResizeStop"
    @activated="onActivated"
    @deactivated="onDeactivated"
    @dragstop="onDragStopEvent"
  >
    <button
      v-if="isMiniSize"
      :style="{
        border: 0,
        background: 'transparent',
        width: floatWidth + 'px',
        height: floatHeight + 'px',
        cursor: 'pointer',
      }"
      @click="miniSizeIconClicked"
    ></button>
    <el-container v-show="!isMiniSize">
      <el-header class="drag-handle" style="height: 6vh; background-color: #b3c0d1">
        <span>{{ title }}</span>
        <div class="drag-cancel">
          <el-button
            type="text"
            class="el-icon-mini"
            style="padding: 4px 18px"
            @click="isMiniSize = true"
          ></el-button>
          <el-button
            type="text"
            class="el-icon-max"
            style="padding: 4px 18px"
            @click="isMaxSize = !isMaxSize"
          ></el-button>
          <el-button
            type="text"
            class="el-icon-reset"
            style="padding: 4px 18px"
            @click="resetDefaultFloatPosition"
          ></el-button>
          <el-button
            type="text"
            class="el-icon-close"
            style="padding: 4px 18px"
            @click="close"
          ></el-button>
        </div>
      </el-header>
      <el-main style="padding: 0; overflow: hidden">
        <slot name="default"></slot>
      </el-main>
    </el-container>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable"
export default {
  name: "FloatLayoutComponent",
  components: { VueDraggableResizable },
  props: {
    title: {
      type: String,
      default: "Drag Only Here",
      required: false,
    },
    z: {
      type: Number,
      default: 10,
      required: false,
    },
    backgroundMini: {
      type: String,
      default: "background-style-transparent",
      required: false,
    },
    onActivatedCallback: {
      type: Function,
      default: () => {},
      required: false,
    },
  },
  data() {
    return {
      onMaxCallback: () => {},
      onDefaultSizeCallback: () => {},
      onCloseCallback: () => {},
      onResumeSizeCallback: () => {},
      onResizeStopCallback: () => {},
      onResizeListener: () => {},
      zindex: 10,
      floatPositionX: 0,
      floatPositionY: 0,
      floatWidth: 1,
      floatHeight: 1,
      isMiniSize: false,
      isMaxSize: false,
      dragStartPositionX: 0,
      dragStartPositionY: 0,
      dragStopPositionX: 0,
      dragStopPositionY: 0,
      floatWidthLast: 1,
      floatHeightLast: 1,
      floatPositionXLast: 0,
      floatPositionYLast: 0,
    }
  },
  watch: {
    isMaxSize: function (newValue, oldValue) {
      if (newValue && !oldValue) {
        this.storeLastSizeAndPosition()
        this.floatPositionX = 0
        this.floatPositionY = 0
        this.floatWidth = document.documentElement.clientWidth
        this.floatHeight = document.documentElement.clientHeight
        this.onMaxCallback()
      } else if (!newValue && oldValue) {
        this.resumeSizeAndPosition(true)
      }
    },
    isMiniSize: function (newValue, oldValue) {
      if (newValue && !oldValue) {
        this.storeLastSizeAndPosition()
        this.floatWidth = 128
        this.floatHeight = 128
        this.floatPositionX = document.documentElement.clientWidth - this.floatWidth - 64
        this.floatPositionY = document.documentElement.clientHeight - this.floatHeight - 64
      } else if (!newValue && oldValue) {
        this.resumeSizeAndPosition(false)
      }
    },
  },
  mounted() {
    this.resetDefaultFloatPosition()
  },
  methods: {
    getFloatPositionX() {
      return Math.floor((document.documentElement.clientWidth - this.floatWidth) / 2)
    },

    getFloatPositionY() {
      return Math.floor((document.documentElement.clientHeight - this.floatHeight) / 2)
    },
    getFloatWidth() {
      return Math.floor(document.documentElement.clientWidth * 0.8)
    },
    getFloatHeight() {
      return Math.floor(document.documentElement.clientHeight * 0.8)
    },
    resetDefaultFloatPosition() {
      this.floatWidth = this.getFloatWidth()
      this.floatHeight = this.getFloatHeight()
      this.floatPositionX = this.getFloatPositionX()
      this.floatPositionY = this.getFloatPositionY()
      this.isMiniSize = false
      this.isMaxSize = false
      this.onDefaultSizeCallback()
    },
    storeLastSizeAndPosition() {
      this.floatWidthLast = this.floatWidth
      this.floatHeightLast = this.floatHeight
      this.floatPositionXLast = this.floatPositionX
      this.floatPositionYLast = this.floatPositionY
    },
    resumeSizeAndPosition(resumeFromMax) {
      this.floatWidth = this.floatWidthLast
      this.floatHeight = this.floatHeightLast
      this.floatPositionX = this.floatPositionXLast
      this.floatPositionY = this.floatPositionYLast
      this.onResumeSizeCallback(resumeFromMax)
    },
    // close button
    close() {
      // destroy the vue listeners, etc
      this.$destroy()

      // remove the element from the DOM
      this.$el.parentNode.removeChild(this.$el)
      this.onCloseCallback()
    },
    setOnMaxListener(callback) {
      this.onMaxCallback = callback
    },
    setOnDefaultSizeListener(callback) {
      this.onDefaultSizeCallback = callback
    },
    setOnCloseListener(callback) {
      this.onCloseCallback = callback
    },
    setOnResizeListener(callback) {
      this.onResizeListener = callback
    },
    setOnResizeStopListener(callback) {
      this.onResizeStopCallback = callback
    },
    setOnResumeSizeListener(callback) {
      this.onResumeSizeCallback = callback
    },
    onActivated() {
      this.zindex += 2
      console.log("onActivated: ", this.zindex)
      this.onActivatedCallback()
    },
    onDeactivated() {
      this.zindex -= 1
      console.log("onDeactivated: ", this.zindex)
    },
    onResizeCallback(handle, x, y, w, h) {
      if (y < 0) {
        return false
      }
      if (
        this.floatPositionX !== x ||
        this.floatPositionY !== y ||
        this.floatWidth !== w ||
        this.floatHeight !== h
      ) {
        this.floatPositionX = x
        this.floatPositionY = y
        this.floatWidth = w
        this.floatHeight = h
        this.onResizeListener()
      }
    },
    onDragCallback(x, y) {
      if (y < 0) {
        // y = 0
        return false
      }
      this.floatPositionX = x
      this.floatPositionY = y
    },
    onDragStopEvent(x, y) {
      if (!this.isMiniSize) {
        return
      }
      console.log(
        "onDragStopEvent: x:",
        x,
        "; y: ",
        y,
        "; startPositionX: ",
        this.dragStartPositionX,
        "; startPositionY: ",
        this.dragStartPositionY,
        "; this.isMiniSize: ",
        this.isMiniSize
      )
      this.dragStopPositionX = x
      this.dragStopPositionY = y
    },
    onDragStartCallback() {
      if (!this.isMiniSize) {
        return
      }
      console.log(
        "onDragStartCallback: start: x: ",
        this.floatPositionX,
        "; y: ",
        this.floatPositionY
      )
      this.dragStartPositionX = this.floatPositionX
      this.dragStartPositionY = this.floatPositionY
      this.dragStopPositionX = this.floatPositionX
      this.dragStopPositionY = this.floatPositionY
    },
    miniSizeIconClicked() {
      if (!this.isMiniSize) {
        return
      }
      if (
        Math.abs(this.dragStartPositionX - this.dragStopPositionX) < 5 &&
        Math.abs(this.dragStartPositionY - this.dragStopPositionY) < 5
      ) {
        this.isMiniSize = false
      }
    },
    onResizeStop() {
      console.log("onResizeStop")
      this.onResizeStopCallback()
    },
  },
}
</script>

<style scoped>
.drag-handle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
.drag-cancel {
  display: flex;
  flex-direction: row;
}
.background-style-base {
  border: 1px solid #b3c0d1;
  box-shadow: 0 2px 4px -1px rgb(179 192 209 / 20%), 0 4px 5px 0 rgb(179 192 209 / 14%),
    0 1px 10px 0 rgb(179 192 209 / 12%);
  background-color: #e7e1cd;
  position: fixed;
}
.background-style-transparent {
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3) url("~@/assets/mini.svg") center no-repeat;
  box-shadow: 0 2px 4px -1px rgb(179 192 209 / 20%), 0 4px 5px 0 rgb(179 192 209 / 14%),
    0 1px 10px 0 rgb(179 192 209 / 12%);
  position: fixed;
}
.el-icon-close {
  background: url("~@/assets/close.svg") center no-repeat;
  background-size: contain;
}
.el-icon-close:before {
  content: "a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-reset {
  background: url("~@/assets/reset_select.svg") center no-repeat;
  background-size: contain;
}
.el-icon-reset:before {
  content: "a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-max {
  background: url("~@/assets/maximize.svg") center no-repeat;
  background-size: contain;
}
.el-icon-max:before {
  content: "a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-mini {
  background: url("~@/assets/minimize.svg") center no-repeat;
  background-size: contain;
}
.el-icon-mini:before {
  content: "a";
  font-size: 12px;
  visibility: hidden;
}
.el-icon-mini-task {
  background: url("~@/assets/minimize.svg") center no-repeat;
  background-size: contain;
}
.el-icon-mini-task:before {
  content: "aa";
  font-size: 12px;
  visibility: hidden;
}
.el-container.is-vertical {
  height: 100%;
}
</style>
