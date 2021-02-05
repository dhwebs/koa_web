<template>
  <!-- <div class="login" type="border-card" v-loading="loading">
    <div class="left-side" style="background-image:url('https://w.wallhaven.cc/full/8o/wallhaven-8o7q82.jpg');background-size:100% 100%" v-show="!registerShow"></div>
    <div class="right-side" v-show="!registerShow">
      <div class="logo-img">
        <img src="../assets/image/u986.png" alt="logo"/>
      </div>
      <el-form :model="form" status-icon ref="form" label label-width="100px" class="demo-ruleForm">
        <p class="title" v-copy>账号登录</p>
        <ul class="account">
          <li class="form-item">
            <i class="fa fa-user" style="color:#0f88cd;font-size:20px;width:20px;padding:5px"></i>
            <span class="user-icon"></span>
            <input placeholder="用户帐号" v-model="form.username" v-copy @keydown.enter="changeTab" />
          </li>
          <li class="form-item">
            <i class="fa fa-lock" style="color:#0f88cd;font-size:20px;width:20px;padding:5px"></i>
            <span class="user-icon"></span>
            <input id="password" type="password" placeholder="登录密码" v-copy v-model="form.password" auto-complete="off" @keydown.enter="onLogin" />
          </li>
          <li class="remember">
              <el-checkbox v-model="rememberPassword" >记住密码</el-checkbox>
          </li>
          <li>
            <el-button type="primary" @click="onLogin" class="entry" :disabled='disabled'>登录</el-button>
          </li>
        </ul>
        <p style="color:#0f88cd;text-align:center;font-size:11px;cursor:pointer" @click="registerShow=true">没有账号？ 点击注册</p>
      </el-form>
      <div class="copyright">
        <span><a target="_blank" href="https://github.com/dhwebs">@2020 大海</a></span>
      </div>
    </div>
    
      <el-form label-width="100px" size="small" v-show="registerShow" style="padding:50px 25%">
        <p class="title">注册账号</p>
        <el-form-item label="公司名称">
          <el-input v-model="subData.company" placeholder="公司名称" rules="{ required: true, message: '请输入姓名', trigger: 'change' }"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="subData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="subData.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="subData.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="subData.password2" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onRegister" class="entry" style="width:150px;margin:0 auto" :disabled='disabled'>注册</el-button>
        <p style="color:#0f88cd;text-align:center;font-size:11px;cursor:pointer;margin-top:20px" @click="registerShow=false">已有账号？ 点击登录</p>
      </el-form>
  </div> -->
  <dh-login></dh-login>
</template>

<script>
import dhLogin from '../components/dh-login/index'
  export default {
    name: "Login",
    components:{
      dhLogin
    },
    data() {
      return {
        disabled:false,
        visiable: false,
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
    mounted() {
    },
    methods: {
      changeTab(){
      },
      loadAccountInfo() {
      },
      show() {
        this.visiable = true;
      },
      hide() {
        this.visiable = false;
      },
      onLogin() {
        this.disabled=true
        setTimeout(()=>{
          this.disabled=false
        },2000)
        this.$axios({
          method:'post',
          url:'/api/login',
          data:{
            name:this.form.username,
            password:this.form.password
          }
        }).then(res=>{
          console.log(res)
          if(res.data.code==200){
            this.$message.success(res.data.remark)
            this.$store.commit('SETUSER',res.data.data)
            this.$store.commit('SETINITIALAUTHORITY',res.data.author)
            console.log(this.$store.state.user)
            this.authority = res.data.author.filter(item=>{
              return !item.belongId
            })
            this.recursion2(this.authority,res.data.author)
            this.$store.commit('SETAUTHORITY',this.authority)
            this.$router.push('/main')
          }else{
            console.log('登录失败')
            this.$message.warning(res.data.remark)
          }
        }).catch(err=>{
          this.$message.warning(err.data.remark)
          console.log(err)
        })
      },
      
      recursion2(arr,list){
        arr.forEach(item=>{
          item.children=list.filter(child=>{
            return child.belongId === item.id
          })
          if(item.children && item.children.length){
            this.recursion2(item.children,list)
          }
        })
      },
      onRegister() {
        this.disabled=true
        setTimeout(()=>{
          this.disabled=false
        },2000)
        this.$axios({
          method:'post',
          url:'/api/register',
          data:this.subData
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
        
      },

      onBack() {
      }
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
