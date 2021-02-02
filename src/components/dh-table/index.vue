<template>
  <div>
    <el-table 
      @selection-change="selectionChange" 
      @row-click="onRowClick"
      :data="tableData" 
      :height="aurl.height" 
      :tree-props="aurl.treeProps"
      ref='table'
      highlight-current-row
      v-loading='loading'
      :cell-style="cellStyle"
       row-key="id"
       style="margin-top:20px;box-shadow:0 0 2px 0 #333;width: 100%;">
      <el-table-column type="selection" width="55" v-if="aurl.select" align="center"></el-table-column>
      <el-table-column v-for="(item,i) in aurl.fileds" :key="i" :label="item.label" :width="item.width" :fixed="item.fixed" show-overflow-tooltip align="center">
        <template slot-scope="row">
          <el-image :src="row.row[item.prop] ? (row.row[item.prop].key_name || row.row[item.prop]) : ''" v-if="item.type=='img'"></el-image>
          <i v-else-if="item.type=='icon'" :class="row.row[item.prop] ? (row.row[item.prop].key_name || row.row[item.prop]) : ''" style="font-size:20px"></i>
          <el-input v-else-if="item.type=='input'" v-model="row.row[item.prop]" size="mini" style="width:90%"></el-input>
          <el-switch v-else-if="item.type=='switch'" v-model="row.row[item.prop]"></el-switch>
          <span v-else>{{row.row[item.prop] ? (row.row[item.prop].key_name || row.row[item.prop]) : ''}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="100px" v-if="aurl.button && aurl.button.length" align="center" fixed="right">
        <template slot-scope="row">
          <el-button v-for="(item,i) in aurl.button" @click="btnClick(row.row,item,row.$index)" :key="i" plain size="small" :type="item.type" :icon="item.icon">{{item.key_name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!aurl.noPagination"
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.cursor"
      :page-sizes="[10,30,50,100]"
      :page-size="params.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name:'dhTable',
  props:{
    aurl:{
      type:Object,
      default:{
        url:'',//查询路径
        list:[],//静态数组
        fileds:[],//数组项
        height:'300px',//表格高度
        select:true,//是否勾选
        treeProps:false,//多级表格
        button:[],//操作按钮
        noPagination:false,//无需分页
        filterList:()=>{},//数组过滤方法
      }
    },
    search:{
      type:Object,
      default:()=> {return {}}
    },
    cellStyle:{
      type:Function,
    }
  },
  data(){
    return{
      loading:false,
      tableData:[],
      total:0,
      params:{
        cursor:1,
        limit:10,
      },
    }
  },
  watch:{
    list(newValue, oldValue) {
      console.log(newValue,this.aurl)
      this.aurl.list=newValue
      this.haveList()
    },
  },
  computed: {
    list() {
      console.log('这个是list',this.aurl.list)
      return this.aurl.list
    }
  },
  created(){
    console.log(this.aurl.list)
    this.getTableData()
  },
  mounted(){
  },
  methods:{
    getTableData() {
      this.loading=true
      if(this.aurl.list && this.aurl.list.length){
        this.haveList()
      }else{
        this.noList()
      }
    },
    haveList(){//静态数组
      if(this.aurl.noPagination){
        this.tableData=this.aurl.list
      }else{
        this.tableData=this.aurl.list.slice(this.params.limit*(this.params.cursor-1),this.params.limit*this.params.cursor)
      }
      this.total=this.aurl.list.length
      this.loading=false
    },
    noList(){//动态查询数组
      let params={}
      if(this.aurl.noPagination){
        params=Object.assign({},this.search)
      }else{
        params=Object.assign({},this.search,this.params)
      }
      this.$axios({
        method:'get',
        url:this.aurl.url,
        params:params
      }).then(res=>{
        console.log(res)
        this.total=res.data.total
        if(this.aurl.filterList){
          this.tableData = this.aurl.filterList(res)
        }else{
          this.tableData=res.data.rows
        }
        this.loading=false
      }).catch(err=>{
        this.loading=false
        console.log(err)
      })
    },
    handleSizeChange(val) {
      this.params.limit=val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.params.cursor=val
      this.getTableData()
    },
    selectionChange(sel){
      this.$emit('selection-change',sel)
    },
    onRowClick(row){
      this.$emit('row-click',row)
    },
    btnClick(row,item,i){//操作按钮，row:当前行数据，item:当前点击按钮 ， i:当前点击按钮下标
      this.$emit('btn-click',row,item,i)
    },
    reload(){
      this.handleCurrentChange(1)
    }
  }
}
</script>

<style>

</style>