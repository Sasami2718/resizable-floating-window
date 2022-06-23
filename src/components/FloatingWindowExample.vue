<template>
  <div>
    <vue-draggable-resizable w="auto" h="auto" :handles="[]">
      <button @click="showFloatingWindow">Show floating window1</button>
    </vue-draggable-resizable>
    <vue-draggable-resizable :x="300" w="auto" h="auto" :handles="[]">
      <button @click="showFloatingWindow2">Show floating window2</button>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable"
import "vue-draggable-resizable/dist/VueDraggableResizable.css"
import FloatingWindow from "@/components/floating-component"
import FloatingComponentLayout from "@/components/floating-component/FloatingComponentLayout"
export default {
  name: "FloatingWindowExample",
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      floatingWindowInstance: null,
      floatingWindowInstance2: null,
    }
  },
  methods: {
    showFloatingWindow() {
      console.log("clicked")
      if (this.floatingWindowInstance != null) {
        // 再次点击若已经存在window实例, 则关闭该window实例
        this.floatingWindowInstance.close(this.floatingWindowInstance)
        return
      }
      this.floatingWindowInstance = FloatingWindow(
        this,
        "Title window 1",
        FloatingComponentLayout,
        {
          props: {
            content: "foobar",
            backgroundMini: "background-style-transparent",
          },
        },
        "\n<custom component inner slot.>\n"
      )
      this.floatingWindowInstance.setOnCloseListener(() => {
        console.log("OnClose")
        this.floatingWindowInstance = null
      })
      this.floatingWindowInstance.setOnResumeSizeListener((resumeFromMax) => {
        console.log("ResumeSize: from max: ", resumeFromMax)
      })
      this.floatingWindowInstance.setOnResizeStopListener(() => {
        console.log("OnResizeStop")
      })
      this.floatingWindowInstance.setOnMaxListener(() => {
        console.log("OnMax")
      })
      this.floatingWindowInstance.setOnDefaultSizeListener(() => {
        console.log("OnDefaultSize")
      })
    },
    showFloatingWindow2() {
      console.log("clicked")
      if (this.floatingWindowInstance2 != null) {
        this.floatingWindowInstance2.close(this.floatingWindowInstance2)
        return
      }
      this.floatingWindowInstance2 = FloatingWindow(
        this,
        "Title window 2",
        FloatingComponentLayout,
        {
          props: {
            content: "foobar",
            backgroundMini: "background-style-transparent",
          },
        },
        "content slot"
      )
      this.floatingWindowInstance2.setOnCloseListener(() => {
        console.log("OnClose")
        this.floatingWindowInstance2 = null
      })
      this.floatingWindowInstance2.setOnResumeSizeListener((resumeFromMax) => {
        console.log("ResumeSize: from max: ", resumeFromMax)
        if (!resumeFromMax) {
          return
        }
      })
      this.floatingWindowInstance2.setOnResizeStopListener(() => {
        console.log("OnResizeStop")
      })
      this.floatingWindowInstance2.setOnMaxListener(() => {
        console.log("OnMax")
      })
      this.floatingWindowInstance2.setOnDefaultSizeListener(() => {
        console.log("OnDefaultSize")
      })
    },
  },
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
