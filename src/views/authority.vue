<template>
  <div>
    <div class="top">
      <h3>权限管理</h3>
      <el-button-group>
        <el-button size="small" type="primary" icon="el-icon-edit" @click="addAuthority">添加</el-button>
        <el-dialog :title="title" :visible.sync="dialogArticle" width="1000px">
          <el-form size="small" label-width="auto">
            <el-form-item label="名称">
              <el-input v-model="subData.name"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="subData.icon"></el-input>
            </el-form-item>
            <el-form-item label="别名">
              <el-input v-model="subData.alias"></el-input>
            </el-form-item>
            <el-form-item label="路由">
              <el-input v-model="subData.path"></el-input>
            </el-form-item>
            <el-form-item label="权限等级">
              <el-input v-model="subData.grade"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="subData.order"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button size="small" plain @click="dialogArticle=false">取消</el-button>
            <el-button type="primary" icon="el-icon-edit" size="small" @click="saveArticle">保存</el-button>
            <!-- <el-button type="primary" icon="el-icon-edit" size="small" @click="saveChildArticle" v-if="title=='添加子权限'">保存</el-button> -->
          </div>
        </el-dialog>
        <el-button size="small" type="primary" icon="el-icon-edit">导入</el-button>
        <el-button size="small" type="warning" icon="el-icon-download">导出</el-button>
      </el-button-group>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top:20px" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="alias" label="别名"></el-table-column>
      <el-table-column prop="path" label="路由"></el-table-column>
      <el-table-column prop="icon" label="图标"></el-table-column>
      <el-table-column prop="grade" label="权限级别"></el-table-column>
      <el-table-column label="操作" width="270px" align="center">
        <template slot-scope="row">
          <el-button type="primary" size="small" @click="addClick(row.row)">添加</el-button>
          <el-button type="primary" size="small" @click="updateClick(row.row)">修改</el-button>
          <el-button size="small" type='danger' @click="deleted(row.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'authority',
  data(){
    return{
      tableData:[],
      title:'添加权限',
      dialogArticle:false,
      subData:{},
      belongId:''
    }
  },
  created(){
    this.getAuthority()
  },
  methods:{
    getAuthority(){
      this.$axios({
        method:'get',
        url:'/api/authority'
      }).then(res=>{
        console.log(res)
        this.tableData = res.data.rows.filter(item=>{
          return !item.belongId
        })
        this.recursion2(this.tableData,res.data.rows)
      }).catch(err=>{
        console.log(err)
      })
    },
    recursion(list){
      list.forEach(item=>{
        if(item.children){
          item.children=JSON.parse(item.children)
          this.recursion(item.children)
        }
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
    addAuthority(){
      this.title='添加权限'
      this.dialogArticle=true
    },
    saveArticle(){
      if(this.belongId) this.subData.belongId=this.belongId
      this.$axios({
        method:'post',
        url:'/api/authority_add',
        data:this.subData
      }).then(res=>{
        if(res.data.state==201){
          this.dialogArticle=false
          this.$message.success('添加成功')
          this.getAuthority()
        }else{
          this.$message.warning(res.data.remark)
        }
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    addClick(row){
      this.title='添加子权限'
      this.belongId=row.id
      console.log(row,this.belongId)
      this.dialogArticle=true
    },
    updateClick(row){
      this.title='修改权限'
      this.dialogArticle=true
    },
    deleted(row){
      
    }
  }
}
</script>

<style>

</style>