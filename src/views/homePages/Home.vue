<template>
  <div>
    <el-carousel :interval="3000" trigger="click" arrow="never" height="400px" id="home">
      <el-carousel-item v-for="banner in bannerList" >
        <div class="swbox">
          <el-image class="img" :src="banner.img" :alt="banner.name" fit="fill"></el-image>
          <div class="titleBackground"></div>
          <div class="content">
            <h4>{{ banner.name }}</h4>
            <p>{{banner.remark}}</p>
            <el-button v-if="banner.article_entity" type="primary" @click="knowMore(banner)">了解更多</el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <template v-for="(section,k) in sectionList">
      <div v-if="section.url" style="width:1170px;margin:0 auto" :id="section.name">
         <component v-bind:is="section.comp"></component> 
      </div>
      <div v-else :key='k' :style="{background: k%2==0?'#fcfcfc':'#fff'}" class="order" style="margin-top:0" :id="section.name">
        <div style="width:1170px;margin:0 auto">
          <div class="o-box1">{{section.name}}</div>
          <el-row :gutter="20">
            <el-col :span="section.span" v-for="(item,i) in section.children" :key='i'>
              <div class="o-box2" @click="show(item)">
                <el-button v-if="item.icon" type="primary" :icon="item.icon" circle></el-button>
                <!-- <img v-else :src="item.small_image?item.small_image[0].url:'@/../static/images/wuliu1.jpg'" alt=""> -->
                <!-- <p>{{item.name}} </p> -->
                <p>{{item}} </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {                  
      sectionList:[{key_name:1,rows:[1,2,34,4,5,5]}],
      bannerList:[
        {image:[{url:''}],key_name:123}
      ],
      website:{}
    }
  },
  mounted(){
    this.getSetIndex();
  },
  methods:{
    getSetIndex(){
      this.$axios({
        method:'get',
        url:'/api/setIndex'
      }).then(res=>{
        Object.assign(this.website,res.data.data)
        this.bannerList=JSON.parse(res.data.data.swiper)
        this.sectionList=JSON.parse(res.data.data.chapter)
      }).catch(err=>{
        console.log(err)
      })
    },
    knowMore(item){//了解更多
      //this.$router.push({path:'/cloud/app/tms/www/article', query:item.article_entity});
    },
    show(item){//新闻资讯
      //this.$router.push({path:'/cloud/app/tms/www/article', query:item});
    }
  }
}
</script>
