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
        <el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab" @tab-click="tabClick">
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="item.name"
            style="height:calc(100vh - 102px);overflow:auto"
          >
          <div style="padding:15px">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </div>
          </el-tab-pane>
        </el-tabs>
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
    props:['authority','initialAuthority'],
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
          return item.name==key
        })
        if(index==-1){
          let item=this.initialAuthority.find(item=>{
            return item.path==key
          })
          let obj={title:item.name,name:item.path}
          this.editableTabs.push(obj)
        }
        this.editableTabsValue=key
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
       this.$emit('select',{key,keyPath})
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.$router.push(activeName)
      },
      tabClick(item){
        console.log(item)
        this.defaultActive=item.name
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