<template>
  <div>
    <div class="top">
      <h3>报价审批</h3>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange" style="margin-top:40px">
      <el-collapse-item title="信息" name="0">
        <el-form size="small" class="formView" inline label-width="120px" style="padding-top:10px;box-sizing:border-box;">
          <el-form-item label="报价单号">
            <el-input value="HYL201903837271" readonly></el-input>
          </el-form-item>
          <el-form-item label="报价人">
            <el-input value="kevin" readonly></el-input>
          </el-form-item>
          <el-form-item label="报价日期">
            <el-input value="2020-07-14 16:23" readonly></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="货物信息" name="1">
        <el-form size="small" class="formView" inline label-width="120px" style="padding-top:10px;box-sizing:border-box;">
          <el-form-item label="起运港">
            <el-select v-model="params.start" placeholder="请选择" style="width:200px">
              <el-option v-for="item in options1" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目的港">
            <el-select v-model="params.end" placeholder="请选择" style="width:200px">
              <el-option v-for="item in options2" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="货物密度">
            <el-select v-model="params.density" placeholder="请选择" style="width:200px">
              <el-option v-for="item in options4" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="货物类型">
            <el-select v-model="params.type" placeholder="请选择" style="width:200px">
              <el-option v-for="item in options5" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计件数">
            <el-input v-model="params.num"></el-input>
          </el-form-item>
          <el-form-item label="预计重量">
            <el-input v-model="params.weight"></el-input>
          </el-form-item>
          <el-form-item label="预计体积">
            <el-input v-model="params.volume"></el-input>
          </el-form-item>
          <el-form-item label="预计走货时间">
            <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="其他费用添加" name="2">
        <el-form class="formView" size="small" inline label-width="120px" style="padding-top:10px;box-sizing:border-box" v-for="(item,i) in moneyList" :key='i'>
          <el-form-item label="费用名称">
            <el-select v-model="item.params.start" placeholder="请选择" style="width:200px">
              <el-option v-for="item in options7" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计费单位">
            <el-select v-model="item.params.end" placeholder="请选择" style="width:200px">
              <el-option v-for="item in options8" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="币种">
            <el-select v-model="item.params.air" placeholder="请选择" style="width:200px">
              <el-option v-for="item in options9" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="item.params.money"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="备注信息" name="3">
        <el-form size="small" class="formView" inline label-width="120px" style="padding-top:10px;box-sizing:border-box;">
          <el-form-item label="备注信息">
            <el-input v-model="params.remark"></el-input>
          </el-form-item>
        </el-form>
      </el-collapse-item>
      <el-collapse-item title="报价方案" name="4">
        <dh-table
          :aurl="aurl"
          :fileds="fileds"
          @btn-click="deleteOne"
          @selection-change="selChange"
          ref='dhTable1'
        ></dh-table>
      </el-collapse-item>
      <el-collapse-item title="审批参考" name="5">
        <dh-table
          :aurl="aurl2"
          :fileds="fileds"
          ref='dhTable2'
        ></dh-table>
        <el-row class="formView" style="margin-top:20px;padding:10px;box-sizing:border-box;color:#4683c5" v-for="(item,i) in moneyList" :key='i'>
          <el-col :span="6">提交日期：2020-07-14 16:23</el-col>
          <el-col :span="4">{{i==0?'部门经理':i==1?'航线经理':'总经理'}}</el-col>
          <el-col :span="4">报价人：kevin</el-col>
          <el-col :span="6">审批日期：2020-07-14 16:23</el-col>
          <el-col :span="4">
            <el-button type="primary" size="mini">审核</el-button>
            <el-button type="warning" size="mini">拒绝</el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import dhTable from '../components/dh-table/index'
  export default {
    name: 'price',
    components:{
      dhTable
    },
    data(){
      return{
        loading:false,
        value1:'',
        options1:['PVG','CAN','PEK'],
        options2:['MIL','LOS','FAK'],
        options3:['MU','CA'],
        options4:['1:140以上','1:250以上','1:121-1:140泡','1:111-1:120泡','1:191-1:110泡','1:71-1:90泡','1:50-1:70泡','1:300重','1:500重','1:1000重'],
        options5:['普货','危险品','电池'],
        options6:['广州喜洋','领道软件'],
        options7:['报关费','制单费','其他'],
        options8:['JOB'],
        options9:['人民币','美金','港币'],
        
        params:{

        },
        
        aurl:{
          height:'450px',
          select:true,
          button:[
            {key_name:'删除',type:'danger'}
          ],
          list:[
          {
            date1:'MU02373',
            date3:'07/21 10:25',
            date2:'东航',
            date6:'1:140以上',
            date7:'20  7成泡',
            date20:'2020-07-13',
            date21:'2020-07-20',
          }
        ],
        },
        fileds:[
          {label:'航空公司',prop:'date1'},
          {label:'航班号',prop:'date3'},
          {label:'航班日期',prop:'date2'},
          {label:'货物密度',prop:'date6'},
          {label:'指导',prop:'date7'},
          {label:'生效时间',prop:'date20'},
          {label:'失效时间',prop:'date21'},
        ],
        aurl2:{
          list:[
            {
              date1:'MU02373',
              date2:'东航',
              date6:'1:140以上',
              date7:'20  7成泡',
              date20:'15 7成泡',
              date21:'12 7成泡',
            }
          ],
        },
        fileds2:[
          {label:'航班号',prop:'date1'},
          {label:'航空公司',prop:'date2'},
          {label:'货物密度',prop:'date6'},
          {label:'参考单价',prop:'date7'},
          {label:'公司底价1',prop:'date20'},
          {label:'公司底价2',prop:'date21'},
        ],
        moneyList:[{params:{}},{params:{}},{params:{}},],
        activeNames:['0','1','2','3','4','5']
      }
    },
    created(){
      for(let i=1;i<2;i++){
        this.aurl2.list[i]=this.aurl2.list[0]
        this.aurl.list[i]=this.aurl.list[0]
      }
    },
    methods:{
      reset(){

      },
      selChange(val){
        console.log(val)
      },
      handleChange(val){
        console.log(val)
      },
      deleteOne(item){
        console.log(item)
      }
    }
  }
</script>

<style lang="scss">
.el-table th{
  background:#eee
}
.el-collapse-item__header{
  background-color:rgb(70, 131, 197);
  color:#fff;
  height: 40px;
  padding:10px;
  box-sizing:border-box;
}
.formView {
  /deep/
 .el-form--inline .el-form-item{
    background:rgb(235, 241, 249);
    margin:0
  }
  .el-form-item--mini.el-form-item,.el-form-item--small.el-form-item{
    padding:2px 0;
    // margin-bottom:0px;
    // border-top:1px solid rgb(196, 210, 233);
    // border-bottom:1px solid rgb(196, 210, 233);
    // background:rgb(209, 225, 247);
  }
}
</style>