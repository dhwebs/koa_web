<template>
  <div>
    <div class="top">
      <h3>文章列表</h3>
      <el-button-group>
        <el-button size="small" type="primary" icon="el-icon-edit" @click="addArticle">添加</el-button>
        <el-dialog :title="title" :visible.sync="dialogArticle" width="1000px">
          <el-form size="small" label-width="auto">
            <el-form-item label="标题">
              <el-input v-model="subData.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="subData.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="封面">
              <el-input v-model="subData.cover"></el-input>
            </el-form-item>
            <el-form-item label="内容">
              <el-input v-model="subData.content"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button size="small" plain @click="dialogArticle=false">取消</el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="saveArticle" v-if="title=='添加文章'">保存</el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="updateArticle" v-else>保存</el-button>
          </div>
        </el-dialog>
        <el-button size="small" type="primary" icon="el-icon-edit">导入</el-button>
        <el-button size="small" type="warning" icon="el-icon-download">导出</el-button>
      </el-button-group>
    </div>
    <el-form size="small" inline label-width="auto" style="margin-top:20px;background:#fbfdff;padding:15px;box-sizing:border-box">
      <el-form-item label="标题">
        <el-input v-model="params.title"></el-input>
      </el-form-item>
      <el-form-item label=" " label-width="200px">
        <el-button type="info" icon="el-icon-search" size="small" @click="handleCurrentChange(1)">查询</el-button>
        <el-button size="small" plain @click="reset">清空</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="tableData" border :cell-style='rowStyle' style="margin-top:20px;box-shadow:0 0 2px 0 #333;width: 100%;" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="subtitle" label="副标题"></el-table-column>
      <el-table-column prop="content" label="内容" show-overflow-tooltip></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="cover" label="封面"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="createdAt" label="发表日期"></el-table-column>
      <el-table-column prop="updatedAt" label="修改日期"></el-table-column>
      <el-table-column label="操作" width="180px" align="center">
        <template slot-scope="row">
          <el-button type="primary" size="small" @click="updateClick(row.row)">修改</el-button>
          <el-button size="small" type='danger' @click="reset(row.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pager">
       <el-pagination
        align='right'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.cursor"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="params.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'article',
  data(){
    return{
      loading:false,
      params:{
        cursor:1,
        limit:10,
        title:''
      },
      total:0,
      tableData:[],
      dialogArticle:false,
      title:'添加文章',
      subData:{
        title:'',
        subtitle:'',
        content:'',
        cover:'',
        author:'',
        authorId:'',
      }
    }
  },
  created(){
    this.getArtical()
  },
  methods:{
    getArtical() {
      this.$axios({
        method:'get',
        url:'/api/article',
        params:this.params
      }).then(res=>{
        console.log(res)
        this.tableData=res.data.rows
        this.total=res.data.total
      }).catch(err=>{
        console.log(err)
      })
    },
    handleSizeChange(val) {
      this.params.limit=val
      this.getArtical()
    },
    handleCurrentChange(val) {
      this.params.cursor=val
      this.getArtical()
    },
    rowStyle({row}){
      if(row.state==1){
        row.state='正常'
      }
    },
    reset() {
      this.params.title=''
    },
    addArticle(){
      this.dialogArticle=true
      this.title='添加文章'
    },
    saveArticle(){
      this.subData.author=this.$store.state.user.name
      this.subData.authorId=this.$store.state.user.id
      this.$axios({
        method:'post',
        url:'/api/article_add',
        data:this.subData
      }).then(res=>{
        if(res.data.state==201){
          this.dialogArticle=false
          this.$message.success('添加成功')
          this.handleCurrentChange(1)
        }else{
          this.$message.warning(res.data.remark)
        }
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    updateClick(item){
      this.dialogArticle=true
      this.title='修改文章'
      Object.assign(this.subData,item)
    },
    updateArticle(){
      this.$axios({
        method:'post',
        url:'/api/article_update',
        data:this.subData
      }).then(res=>{
        if(res.data.state==200){
          this.dialogArticle=false
          this.$message.success('修改成功')
          this.handleCurrentChange(1)
        }else{
          this.$message.warning(res.data.remark)
        }
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
  }
}
</script>

<style>

</style>