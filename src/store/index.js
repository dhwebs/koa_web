import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{},
    authority:[],
    initialAuthority:[]
  },
  mutations: {
    SETUSER(state,value){
      state.user=value
    },
    SETINITIALAUTHORITY(state,value){
      state.initialAuthority=value
    },
    SETAUTHORITY(state,value){
      state.authority=value
    },
  },
  actions: {
  },
  modules: {
  }
})
