<template>
  <div>
    <div class="top">
      <h3>首页设置</h3>
    </div>
    <el-form size="small" inline label-width="80px">
      <el-form-item label="电话">
        <el-input v-model="subData.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="subData.address"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="subData.email"></el-input>
      </el-form-item>
      <el-form-item label="GitHub">
        <el-input v-model="subData.github"></el-input>
      </el-form-item>
      <el-form-item label="logo">
        <el-input v-model="subData.logo"></el-input>
      </el-form-item>
      <el-form-item label="底部">
        <el-input v-model="subData.footer"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-top:20px" size="small" @click="addSwiper">添加</el-button>
    <el-table :data="swiperData" style="width: 100%;margin-top:20px" border>
      <el-table-column align="center" label="标题">
        <template slot-scope="row">
          <el-input v-model="row.row.name" style="width:60%"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="描述">
        <template slot-scope="row">
          <el-input v-model="row.row.remark" style="width:60%"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="按钮">
        <template slot-scope="row">
          <el-input v-model="row.row.button"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="路由">
        <template slot-scope="row">
          <el-input v-model="row.row.path"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="图片">
        <template slot-scope="row">
          <el-input v-model="row.row.img"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270px" align="center">
        <template slot-scope="row">
          <el-button size="small" type='danger' @click="deletedSwiper(row.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" @click="addAuthority" style="margin-top:20px">添加</el-button>
    <el-table :data="tableData" style="width: 100%;margin-top:20px" row-key="index" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column align="center" label="章节名称">
        <template slot-scope="row">
          <el-input v-model="row.row.name" style="width:60%" v-show="row.row.children"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="路由">
        <template slot-scope="row">
          <el-input v-model="row.row.path" v-show="!row.row.children"></el-input>
        </template>
      </el-table-column>
      <el-table-column align="center" label="文章关联">
        <template slot-scope="row">
          <el-select v-model="row.row.order" filterable placeholder="请选择" v-show="!row.row.children" @change="selectChange($event,row.row)">
            <el-option v-for="item in articleList" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="章节宽度">
        <template slot-scope="row">
          <el-input v-model="row.row.span" v-show="!row.row.children"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270px" align="center">
        <template slot-scope="row">
          <el-button type="primary" size="small" @click="addClick(row.row)" v-if="row.row.children">添加</el-button>
          <el-button size="small" type='danger' @click="deleted(row.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="small" @click="updateArticle" style="margin-top:20px">保存</el-button>
  </div>
</template>

<script>
export default {
  name:'setIndex',
  data(){
    return{
      title:'',
      tableData:[],
      swiperData:[],
      index:'',
      articleList:[],
      subData:{
        phone:'',
        address:'',
        email:'',
        github:'',
        logo:'',
        footer:'',
      }
    }
  },
  created(){
    this.getSetIndex()
    this.getAuthority()
  },
  methods:{
    getAuthority(){
      this.$axios({
        method:'get',
        url:'/api/article',
      }).then(res=>{
        this.articleList=res.data.rows
        console.log(this.articleList)
        // this.total=res.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    getSetIndex(){
      this.$axios({
        method:'get',
        url:'/api/setIndex'
      }).then(res=>{
        Object.assign(this.subData,res.data.data)
        this.tableData=JSON.parse(res.data.data.chapter)
        this.swiperData=JSON.parse(res.data.data.swiper)
      }).catch(err=>{
        console.log(err)
      })
    },
    addSwiper(){
      let obj={
        name:'',
        remark:'',
        button:'',
        path:'',
        img:'',
      }
      this.swiperData.push(obj)
    },
    deletedSwiper(index){
      this.swiperData.splice(index,1)
    },
    addAuthority(){
      let obj={
        name:'',
        index:this.tableData.length,
        children:[]
      }
      this.tableData.push(obj)
    },
    addClick(row){
      let obj={
        name:'',
        path:'',
        order:'',
        span:'',
        artTitle:'',
        artImg:'',
        index:row.index + '-' +row.children.length,
      }
      row.children.push(obj)
    },
    selectChange(val,row){
      let item=this.articleList.find(item=>{
        return item.id===val
      })
      row.artTitle=item.title
      row.artImg=item.cover
      console.log(val,row)
    },
    updateArticle(){
      this.subData.chapter=JSON.stringify(this.tableData)
      this.subData.swiper=JSON.stringify(this.swiperData)
      this.$axios({
        method:'post',
        url:'/api/setIndex_update',
        data:this.subData
      }).then(res=>{
        if(res.data.code==200){
          this.$message.success('修改成功')
        }else{
          this.$message.warning(res.data.remark)
        }
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    deleted(row){
      this.$confirm('确定删除该章节吗？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        let index=row.index.toString().split('-')
        console.log(this.tableData,index)
        if(index.length>1){
          let index=row.index.split('-')
          this.tableData[index[0]].children.splice(index[1],1)
        }else{
          console.log('进来了',row.index)
          this.tableData.splice(row.index,1)
        }
      }).catch(action => {
      });
    }
  }
}
</script>

<style>

</style>