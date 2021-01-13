<template>
  <el-container style="height:100%">
    <dh-main ref='dhmain' :initialAuthority='initialAuthority' :authority='authority' @select='handleSelect' @open="handleOpen" @close="handleClose">
      <el-header class="header" style="padding-left:0;" slot="header">
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
    </dh-main>
  </el-container>
</template>

<script>
  import dhMain from '../components/dh-main/index'
  import {mapState} from 'vuex'
  export default {
    name: 'Home',
    components:{
      dhMain
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
    computed:{...mapState(['authority','initialAuthority'])},
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect({key}) {
        this.$router.push(key)
      },
      logout(){
        this.$router.push('/')
      },
      tabClick(item){
        console.log(item)
        this.defaultActive=item.name
        this.$router.push(item.name)
      },
      handleChange(key,keyPath){
        this.$refs.dhmain.handleSelect('/home1',{name:'用户桌面2',path:'/home1'})
        // this.$emit('add','/home1')
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