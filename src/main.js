import Vue from "vue"
import App from "./App.vue"
import { Container, Main, Header, Button } from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.config.productionTip = false

Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Button)
new Vue({
  render: (h) => h(App),
}).$mount("#app")
