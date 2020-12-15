<template>
  <div class="index">
    <nav>
      <div class="nav">
        <img :src="(website.logo && website.logo.length) ? website.logo[0].url :''" alt="logo">
        <div class="right">
          <p @click="jump('home')">首页</p>
          <p v-for="section in sectionList" @click="jump(section.name)">{{section.name}}</p>
          <p @click="jump('contact')">联系我们</p>
          <p @click="login">登录</p>
        </div>
      </div>
    </nav>
    
    <router-view></router-view>
    <div class="order ours" id="contact">
      <div style="width:1170px;margin:0 auto">
        <div class="o-box1">联系我们</div>
        <el-row :gutter="20">
          <el-col :span="6" >
            <div class="o-box3">
              <i class="o-i fa fa-phone"></i>
              <p>{{website.phone}}</p>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="o-box3">
              <i class="o-i fa fa-building"></i>
              <p>{{website.address}}</p>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="o-box3">
              <i class="o-i fa fa-envelope"></i>
              <p>{{website.email}}</p>
            </div>
          </el-col>
          <el-col :span="6" >
            <div class="o-box3">
              <i class="o-i fa fa-clock-o"></i>
              <p>{{website.github}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer">
      <el-row style="height:70px">
        <el-col :span="10" :offset="3">
          <p class="f-p1">Copyright © {{website.footer}}</p>
        </el-col>
        <el-col :span="8" :offset="3">
          <p class="f-p1 f-p2">
            <a href="http://www.miitbeian.gov.cn" target="_blank" rel="nofollow">{{website.beian}}</a>
          </p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name:'index',
  data(){
    return {
      website:{},
      sectionList:[

      ],
    }
  },
  created(){
    this.getSetIndex();
  },
  mounted() {
    if(this.$route.path !== '/'){
      this.$router.push({path:'/'});
    }
  },
  methods:{
    getSetIndex(){
      this.$axios({
        method:'get',
        url:'/api/setIndex'
      }).then(res=>{
        Object.assign(this.website,res.data.data)
        this.sectionList=JSON.parse(res.data.data.chapter)
      }).catch(err=>{
        console.log(err)
      })
    },
    jump(domId){
      // 当前窗口正中心位置到指定dom位置的距离
      //页面滚动了的距离
      if(this.$route.path !== '/'){
        this.$router.push({path:'/'});
      }
      this.$nextTick(()=>{
        let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; 
        //指定dom到页面顶端的距离
        setTimeout(()=>{//不加延时出现dom获取不到的情况
          let dom = document.getElementById(domId);
          console.log('dom',dom,domId)
          if(!dom) return
          let domHeight = dom.offsetTop+60;
          //滚动距离计算
          let S = Number(height) - Number(domHeight)+100;
          console.log('dom',S)
          //判断上滚还是下滚
          if(S<0){
            //下滚
            S = Math.abs(S);
            window.scrollBy({ top: S, behavior: "smooth" });
          }else if(S==0){
            //不滚
            window.scrollBy({ top: 0, behavior: "smooth" });
          }else{
            //上滚
            S = -S
            window.scrollBy({ top: S, behavior: "smooth" });
          }
        },200)
      })
    },
    login(){
      this.$router.push('/login')
    },
  }
}
</script>

<style lang='scss'>
nav{
  z-index: 100;
  position: sticky;
  top: 0;
  background:rgb(255,255,255);
  box-sizing: border-box;
  height: 90px;
  // padding:0 10%;
  color:#000;
  width: 100%;
  .nav{
    height: 90px;
    max-width: 1150px;
    margin:0 auto;
    display: flex;
    align-items: center;
  }
}

.nav img{
  height: 60px;
}
.nav .right{
  flex:1
}
.nav .right p{
  display: inline-block;
  padding:20px;
  cursor: pointer;
}

.swbox{
  background: red;
  position: relative;
  min-height: 400px;
}
.swbox .img{
  width: 100%;
  height: 100%;
}
.titleBackground{
  background:rgba(4, 8, 59, 0.685);
  position: absolute;
  top: 0;
  height: 400px;
  width: 100vw;
}
.content{
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
  margin:auto;
  text-align:center;
  color:#fff;
  z-index: 110;
  line-height: 80px;
}
.content h4{
  font-size: 36px;
  color: #fff;
  line-height: 80px;
}
.content p{
  color: #fff;
  margin: 40px auto;
  line-height: 20px;
  width: 800px;
  text-align: center;
  margin-bottom: 0px;
}
.banner{
  box-sizing: border-box;
  margin-top: 60px;
  padding: 40px;
  height: 256px;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.banner .b-box1{
  width: 100px;
}
.banner .b-box1 .img{
  font-size: 36px;
}
.banner .b-box2{
  flex:1
}
.banner .b-box2-form .el-form-item{
  margin-bottom:4px
}
.order{
  box-sizing: border-box;
  width: 100%;
  margin-top: 60px;
  min-height: 460px;
  padding: 60px;
  background: #fcfcfc;
}
.o-box1{
  width:80px;
  margin: 0 auto;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  padding:20px;
  border-bottom: 2px solid #03a9f4;
}
.o-box2{
  margin-top: 60px;
  text-align: center;
  /* height: 215px; */
}
.o-box2 img{
  width: 100%;
  height: 170px;
}
.news{
  background:#fff;
  margin-top: 0px;
}
.ours{
  background:#03a9f4;
  margin-top: 0px;
}
.ours .o-box1{
  width: 200px;
  color:#fff
}
.o-i{
  display: block;
  margin:20px auto;
  font-size: 40px;
}
.o-box3{
  margin-top: 60px;
  font-size: 14px;
  height:130px;
  border: 1px solid rgba(255, 255, 255, 0.253);
  color:#fff;
  text-align: center;
}
.o-box3 img{
  display: block;
  margin:20px auto;
  height: 40px;
  width: 40px;
}
.footer{
  height: 70px;
  width: 100%;
  background-color: #000;
}
.f-p1{
  line-height: 70px;
  color: #fff;
  font-size: 16px;
}
.f-p2{
  color: #03a9f4;
}
.compBox{
  /* width: 1190px; */
  /* margin: 50px auto; */
  background: #fcfcfc;
  box-sizing: border-box;
  padding: 50px 0;
}
.compchild{
  width: 1190px; 
  margin:0 auto;
}
</style>