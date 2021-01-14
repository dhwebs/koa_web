<template>
  <el-container style="height:100%">
    <el-header class="header" style="padding-left:0;">
      <slot name="header"></slot>
    </el-header>
    <el-container style="height:calc(100% - 80px)">
      <el-aside style="height:100%;overflow-x:hidden" :style="{width:!isCollapse?'210px':'48px'}">
        <el-menu :default-active="defaultActive" unique-opened class="el-menu-vertical-demo" :collapse="isCollapse" style="height:100%" @select='handleSelect' @open="handleOpen" @close="handleClose">
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
                <keep-alive :include="keepList">
                  <component :is='com' :query='query' @add-tabs="handleSelect"></component>
                </keep-alive>
              </slot>
            </div>
        </el-tabs>
        <div v-if="!tabsShow" style="height:calc(100vh - 102px);overflow:auto;padding:15px;box-sizing:border-box">
          <slot name='body'>
            <keep-alive :include="keepList">
              <component :is='com' :query='query' @add-tabs="handleSelect"></component>
            </keep-alive>
          </slot>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  //子组件调用父组件添加tabs  例：this.$emit('add-tabs','/home1',{name:'用户桌面2',path:'/home1'})
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
      tabsType:{//tabs类型
        type:String,
        default:'border-card'
      },
      tabsShow:{//是否展示tabs切换
        type:Boolean,
        default:true
      },
      isCollapse:{//侧边栏菜单折叠
        type:Boolean,
        default:false
      },
    },
    data(){
      return{
        defaultActive:'1',
        editableTabsValue:'/main',
        editableTabs:[{name:'/main',title:'用户桌面',key_name:'main'}],
        keepList:[],
        com:'',
        query:'',
      }
    },
    created(){
      if(this.$router.path !== '/main'){
        this.$router.replace('/main')
      }
    },
    watch:{
      editableTabs(val){
        console.log('动态监听',val)
        this.keepList=val.map(item=>{
          return item.key_name
        })
        console.log('this.keepList',this.keepList)
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
      handleSelect(key, keyPath, query) {
        this.editableTabsValue=key
        this.defaultActive=key
        let index=this.editableTabs.findIndex(item=>{
          return item.name===key
        })
        if(index==-1){
          let item=this.initialAuthority.find(item=>{
            return item.path === key
          })
          if(item){
            this.editableTabs.push({title:item.name,name:item.path,key_name:item.path.substring(1)})
          }else{
            this.editableTabs.push({title:keyPath.name,name:keyPath.path,key_name:keyPath.path.substring(1)})
          }
        }
        console.log('this.keepList',this.keepList)
        this.query=query
        this.com=this.FindComponent(key)
        console.log('路由查组件',key,this.$router.options.routes)
        if(!this.com) this.$emit('select',{key,keyPath})
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
        this.editableTabs = tabs.filter(tab => {
          return tab.name !== targetName
        });
        if(this.editableTabsValue !== a){
          this.defaultActive=a
          this.editableTabsValue=a
          this.com=this.FindComponent(a)
          if(!this.com){
            this.$router.push(a)
          }
        }
      },
      tabClick(item){
        this.defaultActive=item.name
        this.com=this.FindComponent(item.name)
        if(!this.com){
          this.$router.push(item.name)
        }
      },
      FindComponent(url){//通过路由找组件
        for(let l1 in this.$router.options.routes) {
          for(let l2 in this.$router.options.routes[l1].children) {
            var item=this.$router.options.routes[l1].children[l2];
            if(item.path==url) {
              return item.component;
            }
          }
        }
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
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
  }
</style>