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
        <el-button type="info" icon="el-icon-search" size="small" @click="getArtical">查询</el-button>
        <el-button size="small" plain @click="reset">清空</el-button>
      </el-form-item>
    </el-form>
    <dh-table
      :aurl="aurl"
      :search="params"
      :cellStyle="rowStyle"
      @btn-click="btnClick"
      ref='dhTable'
    />
  </div>
</template>

<script>
import dhTable from '../components/dh-table/index'
export default {
  name:'articles',
  components:{
    dhTable
  },
  data(){
    return{
      loading:false,
      params:{
        title:''
      },
      dialogArticle:false,
      title:'添加文章',
      subData:{
        title:'',
        subtitle:'',
        content:'',
        cover:'',
        author:'',
        authorId:'',
      },
      aurl:{
        url:'/api/article',
        height:'450px',
        select:true,
        button:[
          {key_name:'修改',type:'primary'},
          {key_name:'删除',type:'danger'}
        ],
        fileds:[
          {label:'标题',prop:'title'},
          {label:'副标题',prop:'subtitle'},
          {label:'内容',prop:'content'},
          {label:'作者',prop:'author'},
          {label:'封面',prop:'cover',type:'img'},
          {label:'状态',prop:'state'},
          {label:'发表日期',prop:'createdAt'},
          {label:'修改日期',prop:'updatedAt'},
        ],
      },
    }
  },
  created(){
    // this.getArtical()
  },
  methods:{
    getArtical() {
      this.$refs.dhTable.reload()
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
        if(res.data.code==201){
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
        if(res.data.code==200){
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
    btnClick(row,item,i){
      if(item.key_name=='修改'){
        this.updateClick(row)
      }else if(item.key_name=='删除'){
        this.reset(row)
      }
    }
  }
}
</script>

<style>

</style>