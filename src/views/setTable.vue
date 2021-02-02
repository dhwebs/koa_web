<template>
  <div>
    <div class="top">
      <el-popover
        placement="top-start"
        title="表格配置"
        width="200"
        trigger="hover"
        :content="aurl">
        <h3 slot="reference">表格配置</h3>
    </el-popover>
    </div>
    <el-form inline size="small" label-width="auto">
      <el-form-item label="查询路径">
        <el-input v-model="aurl.url" style="width:200px"></el-input>
      </el-form-item>  
      <el-form-item label="表格高度">
        <el-input v-model="aurl.height" style="width:200px"></el-input>
      </el-form-item> 
      <el-form-item label="是否勾选">
        <el-switch v-model="aurl.select" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item> 
      <el-form-item label="是否分页">
        <el-switch v-model="aurl.noPagination" :active-value='false' :inactive-value="true" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-form-item> 
      <el-form-item label="多级表格" @click="dialogTreeProps=true">
        children<el-input :value="aurl.treeProps.children" style="width:120px"></el-input>
        hasChildren<el-input :value="aurl.treeProps.hasChildren" style="width:120px"></el-input>
      </el-form-item> 
      <el-row>
        <el-col :span="10">
          <el-form-item label="操作按钮" style="width:100%">
            <el-button @click="addAurl2">添加</el-button>
            <dh-table
              :aurl="aurl2"
              @btn-click="btnClick2"
            ></dh-table>
          </el-form-item> 
        </el-col>
        <el-col :span="14">
          <el-form-item label="数组项">
            <el-button @click="addAurl3">添加</el-button>
            <dh-table
              :aurl="aurl3"
              @btn-click="btnClick3"
            ></dh-table>
          </el-form-item> 
        </el-col>
      </el-row>
    </el-form>
    <dh-table
      :aurl="aurl"
      @btn-click="btnClick"
      ref='dhTable'
    ></dh-table>
    <el-dialog
      title="表单对象"
      :visible.sync="dialogVisible"
      append-to-body
      :close-on-click-modal='false'
      width="60%">
      <span>{{aurl}}</span>
    </el-dialog>
  </div>
</template>

<script>
import dhIcon from '../components/dh-icon/index'
import dhTable from '../components/dh-table/index'
export default {
  name:'setTable',
  components:{
    dhTable,dhIcon
  },
  data(){
    return{
      dialogVisible:false,
      aurl:{
        url:'',//查询路径
        list:[],//静态数组
        fileds:[],//数组项
        height:'300px',//表格高度
        select:false,//是否勾选
        treeProps:{
          children:'',
          hasChildren:''
        },//多级表格
        button:[],//操作按钮
        noPagination:false,//无需分页
      },
      aurl2:{
        url:'',//查询路径
        list:[],//静态数组
        fileds:[
          {label:'名称',prop:'key_name',width:'120px',fixed:false,type:'input'},
          {label:'图标',prop:'icon',width:'120px',fixed:false,type:'input'},
          {label:'类型',prop:'type',width:'120px',fixed:false,type:'input'},
        ],//数组项
        height:'300px',//表格高度
        select:false,//是否勾选
        treeProps:{
          children:'',
          hasChildren:''
        },//多级表格
        button:[{key_name:'删除',type:'danger'}],//操作按钮
        noPagination:true,//无需分页
      },
      aurl3:{
        url:'',//查询路径
        list:[],//静态数组
        fileds:[
          {label:'名称',prop:'label',width:'140px',fixed:false,type:'input'},
          {label:'值',prop:'prop',width:'140px',fixed:false,type:'input'},
          {label:'类型',prop:'type',width:'100px',fixed:false,type:'input'},
          {label:'宽度',prop:'width',width:'100px',fixed:false,type:'input'},
          {label:'固定',prop:'fixed',width:'100px',fixed:false,type:'switch'},
        ],//数组项
        height:'300px',//表格高度
        select:false,//是否勾选
        treeProps:{
          children:'',
          hasChildren:''
        },//多级表格
        button:[{key_name:'删除',type:'danger'}],//操作按钮
        noPagination:true,//无需分页
      }
    }
  },
  methods:{
    addAurl2(){
      let obj={}
      this.aurl2.fileds.forEach(item=>{
        obj[item.prop]=''
      })
      this.aurl2.list.push(obj)
      this.aurl.button = this.aurl2.list
      console.log(this.aurl2.list)
    },
    addAurl3(){
      let obj={}
      this.aurl3.fileds.forEach(item=>{
        obj[item.prop]=''
      })
      obj.fixed=false
      this.aurl3.list.push(obj)
      this.aurl.fileds = this.aurl3.list
      console.log(this.aurl3.list)
    },
    btnClick(row,item,i){

    },
    btnClick2(row,item,i){
      console.log(row,item,i)
      this.aurl2.list.splice(i,1)
      this.aurl.button = this.aurl2.list
    },
    btnClick3(row,item,i){
      this.aurl3.list.splice(i,1)
      this.aurl.fileds = this.aurl3.list
    },
    saveTable(){
      this.dialogVisible=true
      let a={ "url": "", "list": [], "fileds": [], "height": "300px", "select": false, "treeProps": { "children": "", "hasChildren": "" }, "button": [], "noPagination": false }
      let b=JSON.parse(JSON.stringify(a))
      console.log(this.aurl,b)
    }
  }
}
</script>

<style>

</style>