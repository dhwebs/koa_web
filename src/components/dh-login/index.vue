<template>
  <div class="login" type="border-card" v-loading="loading">
    <!-- company-img -->
    <!-- <div class="left-side" :style="'background-image:url('+ require('../assets/image/login-banner.png') +')'" v-show="!registerShow"></div> -->
    <div class="left-side" v-show="!registerShow">
      <el-image style="width:100%;height:100%" :src="bigImg?bigImg:'https://w.wallhaven.cc/full/8o/wallhaven-8o7q82.jpg'"></el-image>
    </div>
    <div class="right-side" v-show="!registerShow">
      <div class="logo-img">
        <!-- logo -->
        <el-image style="width:100%;height:100%" :src="subImg?subImg:'https://w.wallhaven.cc/full/8o/wallhaven-8o7q82.jpg'"></el-image>
      </div>
      <el-form :model="form" size="mini" ref="form" label-width="100px" class="demo-ruleForm">
        <p class="title">账号登录</p>
        <el-form-item label="用户帐号" prop='username' :rules="{required: true, message: '用户帐号不能为空', trigger: 'blur'}">
          <el-input v-model="form.username" placeholder="用户帐号" prefix-icon="el-icon-user" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop='password' :rules="{ required: true, message: '请输入登录密码', trigger: 'blur' }">
          <el-input v-model="form.password" type="password" @keydown.enter.native="onLogin" placeholder="登录密码" prefix-icon="el-icon-lock" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-checkbox v-model="rememberPassword" >记住密码</el-checkbox>
        </el-form-item>
        <el-form-item label="" label-width="0" style="width:60%;margin:10px auto">
          <el-button type="primary" @click="onLogin" class="entry" :disabled='disabled'>登录</el-button>
        </el-form-item>
        <p style="color:#0f88cd;text-align:center;font-size:11px;cursor:pointer" @click="registerShow=true">没有账号？ 点击注册</p>
      </el-form>
      <div class="copyright">
        <span><a target="_blank" href="https://github.com/dhwebs">@2020 大海</a></span>
      </div>
    </div>
    
    <el-form label-width="100px" :model='subData' ref='register' size="small" v-show="registerShow" style="padding:50px 25%">
      <p class="title">注册账号</p>
      <el-form-item label="公司名称" prop='company' :rules="{required: true, message: '公司名称不能为空', trigger: 'blur'}">
        <el-input v-model="subData.company" placeholder="公司名称"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop='name' :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
        <el-input v-model="subData.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop='phone' :rules="{ required: true, message: '请输入手机号码', trigger: 'blur' }">
        <el-input v-model="subData.phone" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='password' :rules="{ required: true, message: '请输入密码', trigger: 'blur' }">
        <el-input v-model="subData.password" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop='password2' :rules="{ required: true, message: '请输入确认密码', trigger: 'blur' }">
        <el-input v-model="subData.password2" type="password" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-button type="primary" @click="onRegister" class="entry" style="width:150px;margin:0 auto" :disabled='disabled'>注册</el-button>
      <p style="color:#0f88cd;text-align:center;font-size:11px;cursor:pointer;margin-top:20px" @click="registerShow=false">已有账号？ 点击登录</p>
    </el-form>
  </div>  
</template>

<script>
  export default {
    name: "dhLogin",
    props:['bigImg','subImg'],
    data() {
      return {
        disabled:false,
        rememberPassword: false,
        repwd: false,
        cookiepwd: '',
        loading: false,
        form: {},
        registerShow:false,
        subData:{
          company:'',
          name:'',
          phone:'',
          password:'',
          password2:'',
        },
        authority:[]
      };
    },
    methods: {
      onLogin() {
        console.log(this.$utils)
        if(this.$utils.validate(['form'],this)){
          this.disabled=true
          setTimeout(()=>{
            this.disabled=false
          },2000)
          this.$emit('login',this.form)
        }
      },
      onRegister() {
        console.log(this.$utils.validate(['register'],this))
        if(!this.$utils.validate(['register'],this)){
          console.log('进来了')
          this.$utils.resetFields(['register'],this)
          return
        }
        if(this.subData.password !== this.subData.password2){
          this.$message.warning('两次密码不一致')
          return
        }
        this.disabled=true
        setTimeout(()=>{
          this.disabled=false
        },2000)
        
        this.$emit('register',this.subData)
      },
    }
  }
</script>
<style scoped>
  .login {width: 1000px;height: 529px;position: absolute;
    top: 50%;left: 50%;background: #fff;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    -webkit-box-shadow: 0 0 18px 3px #cfcfcf;
    box-shadow: 0 0 18px 3px #cfcfcf;}
  .left-side{width: 703px;height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background:#0f88cd;
    background-position: 50%}
  .right-side{width: 297px;height: 100%;
    position: absolute;top: 0;right: 0;background: #fff;}
  .logo-img{width: 145px;margin: 65px auto 0;}
  .logo-img img{display: block;width: 100%;}
  .copyright{width: 100%;position: absolute;left: 0;
    bottom: 10px;line-height: 1.5;text-align: center;}
  .copyright span a{font-size: 12px;color: #a9a9a9;}
  .title{text-align: center;font-size: 18px;color: #7e7c7c;margin: 30px 0px;}
  .entry{display: block;width: 100%;height: 37px;
    color: #fff;background: #0f88cd;
    font-size: 16px;border-radius: 37px;
    border: none;outline: none;
    margin-top: 34px;cursor: pointer;
    -webkit-box-shadow: 0 0 4px #0f88cd;
    box-shadow: 0 0 4px #0f88cd;}
  .account{padding: 0px;margin: 0 50px;}
  .account li{list-style-type: none;margin-bottom: 15px;}
  .remember{padding-top: 5px;}
  .remember
  .register{
    display: block;
    text-align: center;
  }
  .el-checkbox{color: #a9a9a9 !important;}
  .form-item {padding-bottom: 5px;display: flex;
    line-height: 45px;border-bottom: 0.5px solid #e3e5e8;box-sizing: border-box;}
  .form-item:hover{border-bottom: 0.5px solid #999;}
  .form-item input{border: 1px solid #fff;outline:none;}
  .user-icon{
    width: 2em;
    height: 2em;
    fill: #9a0506;
    margin-right: 2px;
    }
  .el-checkbox__original{z-index: 0 !important;}
  input::-webkit-input-placeholder{color: #a9a9a9;}
  .copyright2{
    padding-top: 30px;
    font-size: 12px;
    color: #a9a9a9;
    text-align: center;
  }
</style>
