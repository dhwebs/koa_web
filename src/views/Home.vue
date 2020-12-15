<template>
  <el-container style="height:100%">
    <el-header class="header" style="padding-left:0;">
      <el-row>
        <el-col :span="4">
          <h1 style="color:#fff;text-align:center;width:160px;line-height:60px;padding:0">大海的后台</h1>
        </el-col>
        <el-col :span="5" :offset="15">
          <el-menu style="color:#fff" class="el-menu-demo" mode="horizontal" background-color='#409EFF' text-color='#fff' @select='handleChange'>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu" style="color:#fff;font-size:16px"></i>更换主题</template>
              <el-menu-item index="1-1">蓝色</el-menu-item>
              <el-menu-item index="1-2">红色</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">{{$store.state.user.name}}(管理员)</template>
              <el-menu-item index="2-1">修改密码</el-menu-item>
              <el-menu-item index="2-2">退出系统</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
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
  import dhSubmenu from '../components/dh-submenu'
  import {mapState} from 'vuex'
  export default {
    name: 'Home',
    components:{
      dhSubmenu
    },
    data(){
      return{
        defaultActive:'1',
        editableTabsValue:'/main',
        editableTabs:[{name:'/main',title:'用户桌面'}],
        urldata:[
          {name:'/pageStyle',title:'页面样式'},
          {name:'/article',title:'文章列表'},
          {name:'/searchResult1',title:'报价查询'},
          {name:'/price',title:'报价'},
          {name:'/authority',title:'权限管理'},
        ]
      }
    },
    created(){
      if(this.$router.path !== '/main'){
        this.$router.replace('/main')
      }
    },
    computed:{...mapState(['authority','initialAuthority'])},

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.editableTabsValue=key
        let index=this.editableTabs.find(item=>{
          return item.name==key
        })
        if(!index){
          let item=this.initialAuthority.find(item=>{
            return item.path==key
          })
          console.log(item,this.initialAuthority)
          let obj={title:item.name,name:item.path}
          this.editableTabs.push(obj)
        }
        this.$router.push(key)
      },
      logout(){
        this.$router.push('/')
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
        this.editableTabsValue = activeName;
        this.$router.push(activeName)
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },
      tabClick(item){
        console.log(item)
        this.defaultActive=item.name
        this.$router.push(item.name)
      },
      handleChange(key,keyPath){
        console.log(key,this.authority,this.$store.state.authority)
        if(key=='2-2'){
          sessionStorage.clear()
          this.$router.push('/')
        }
      }
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