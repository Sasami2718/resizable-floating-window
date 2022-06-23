import Vue from "vue"

import FloatingComponent from "@/components/floating-component/FloatingComponent.vue"
import FloatingComponentLayout from "@/components/floating-component/FloatingComponentLayout.vue"

const FloatingWindow = function (
  vm,
  title = "title",
  contentComponent = FloatingComponentLayout,
  contentComponentAttr = {
    props: {
      content: "foobar",
    },
  },
  contentComponentSlot = ""
) {
  // vm.$createElement(FloatingComponent, { props: { title: "sanwei" } })
  let floatLayoutComponent = Vue.extend(FloatingComponent)
  let floatLayoutComponentInstance = new floatLayoutComponent({
    propsData: { title: title, backgroundMini: contentComponentAttr.props.backgroundMini },
  })
  floatLayoutComponentInstance.$slots.default = [
    vm.$createElement(contentComponent, contentComponentAttr, contentComponentSlot),
  ]
  floatLayoutComponentInstance.$mount()
  document.body.appendChild(floatLayoutComponentInstance.$el)
  return floatLayoutComponentInstance
}
export default FloatingWindow
export { FloatingWindow }
