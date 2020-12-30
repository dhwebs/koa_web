<template>
  <el-container style="height:100%">
    <el-header class="header" style="padding-left:0;">
      <slot name="header"></slot>
    </el-header>
    <el-container style="height:calc(100% - 80px)">
      <el-aside style="width:210px;height:100%;overflow-x:hidden">
        <el-menu :default-active="defaultActive" unique-opened class="el-menu-vertical-demo" style="width:210px;height:100%" @select='handleSelect' @open="handleOpen" @close="handleClose">
          <dh-submenu :list='authority' index='0'></dh-submenu>
        </el-menu>
      </el-aside>
      <el-main style="padding:0;height:100%">
        <el-tabs v-model="editableTabsValue" v-show="tabsShow" :type="tabsType" closable @tab-remove="removeTab" @tab-click="tabClick">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="item.name"
            style="display:none"
          >
          </el-tab-pane>
            <div style="height:calc(100vh - 102px);overflow:auto;padding:15px;box-sizing:border-box">
              <slot name='body'>
                <keep-alive>
                  <router-view/>
                </keep-alive>
              </slot>
            </div>
        </el-tabs>
        <div v-show="!tabsShow" style="height:calc(100vh - 102px);overflow:auto;padding:15px;box-sizing:border-box">
          <slot name='body'>
            <keep-alive>
              <router-view/>
            </keep-alive>
          </slot>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import dhSubmenu from '../dh-submenu/index'
  export default {
    name: 'dhMain',
    components:{
      dhSubmenu
    },
    props:{
      authority:{
        type:Array,
        default:[]
      },
      initialAuthority:{
        type:Array,
        default:[]
      },
      tabsType:{
        type:String,
        default:'border-card'
      },
      tabsShow:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return{
        defaultActive:'1',
        editableTabsValue:'/main',
        editableTabs:[{name:'/main',title:'用户桌面'}],
      }
    },
    created(){
      if(this.$router.path !== '/main'){
        this.$router.replace('/main')
      }
    },
    watch:{
      $route(to,from){
        console.log(from,to)
        let key=to.path
        let index=this.editableTabs.findIndex(item=>{
          return item.name===key
        })
        if(index==-1){
          let item=this.initialAuthority.find(item=>{
            return item.path === key
          })
          this.editableTabs.push({title:item.name,name:item.path})
        }
        this.editableTabsValue=key
        this.defaultActive=key
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        this.$emit('open',{key,keyPath})
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
        this.$emit('close',{key,keyPath})
      },
      handleSelect(key, keyPath) {
        let index=this.editableTabs.findIndex(item=>{
          return item.name===key
        })
        if(index==-1){
          let item=this.initialAuthority.find(item=>{
            return item.path === key
          })
          this.editableTabs.push({title:item.name,name:item.path})
        }
       this.$emit('select',{key,keyPath})
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let a=this.editableTabsValue
        if (a === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                a = nextTab.name;
              }
            }
          });
        }
        console.log(tabs)
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        if(this.editableTabsValue !== a){
          this.$router.push(a)
        }
      },
      tabClick(item){
        this.$router.push(item.name)
      },
    }
  }
</script>
<style lang="scss">
.el-tabs__nav .el-tabs__item:nth-child(1) span{
    display: none;
 }
 .el-tabs--border-card > .el-tabs__content{
   padding:0
 }
</style>