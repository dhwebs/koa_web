<template>
  <el-container style="height:100%">
    <el-header class="header" style="padding-left:0;">
      <el-row>
        <el-col :span="4">
          <h1 style="color:#fff;text-align:center;width:160px;line-height:60px;padding:0">喜洋物流</h1>
        </el-col>
        <!-- <el-col :span="6">
          <img id="u986_img" style="display:block;height:59px" src="../assets/image/u52.png"/>
        </el-col> -->
        <el-col :span="2" :offset="12">
          <p style="color:#fff;text-align:center;width:160px;line-height:60px;padding:0;cursor:pointer" @click='logout'><i class="el-icon-user-solid"></i> 注销</p>
        </el-col>
        <el-col :span="3" >
          <p style="color:#fff;text-align:center;width:160px;line-height:60px;padding:0"><i class="el-icon-phone"></i> 86 0336273636</p>
        </el-col>
        <el-col :span="3">
          <p style="color:#fff;text-align:center;width:160px;line-height:60px;padding:0"><i class="el-icon-message"></i> service@HYL.com</p>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height:calc(100% - 80px)">
      <el-aside style="width:220px;height:100%">
        <el-menu default-active="1" class="el-menu-vertical-demo" style="width:210px;height:100%" @select='handleSelect' @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>运价平台</span>
            </template>
            <!-- <el-menu-item-group> -->
              <el-menu-item index="/searchResult1">
                <template slot="title">
                  <i class="el-icon-s-unfold"></i>
                  <span>报价查询</span>
                </template>
              </el-menu-item>
              <el-submenu index="1-3">
                <template slot="title">
                  <i class="el-icon-s-unfold"></i>
                  <span>制作报价</span>
                </template>
                <el-menu-item index="/price">
                  <template slot="title">
                    <i class="el-icon-s-unfold"></i>
                    <span>报价</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/priceInfo">
                  <template slot="title">
                    <i class="el-icon-s-unfold"></i>
                    <span>报价详情</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/approval">
                  <template slot="title">
                    <i class="el-icon-s-unfold"></i>
                    <span>报价审批页面</span>
                  </template>
                </el-menu-item>
                <el-menu-item index="/priceList">
                  <template slot="title">
                    <i class="el-icon-s-unfold"></i>
                    <span>报价单</span>
                  </template>
                </el-menu-item>
              </el-submenu>
            <!-- </el-menu-item-group> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return{

      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.$router.push(key)
      },
      logout(){
        this.$router.push('/')
      }
    }
  }
</script>
