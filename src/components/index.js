import dhIcon from "./dh-icon/index.vue";
import dhSubmenu from "./dh-submenu/index.vue";
import dhMain from "./dh-main/index.vue";
import dhLogin from "./dh-login/index.vue";

const components = [
  dhIcon, dhSubmenu, dhMain, dhLogin
]

const install = function (Vue) {
  // 循环挂载到全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

// 支持script方式引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install, dhIcon, dhSubmenu, dhMain, dhLogin
}