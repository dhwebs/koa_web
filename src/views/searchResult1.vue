<template>
  <div>
    <div class="top">
      <h3>报价查询</h3>
      <el-button-group>
        <el-button size="mini" type="primary" icon="el-icon-edit">报价历史</el-button>
        <el-button size="mini" type="primary" icon="el-icon-edit">制作报价</el-button>
        <el-button size="mini" type="warning" icon="el-icon-download">导出</el-button>
      </el-button-group>
    </div>
    <el-form size="small" inline label-width="auto" style="margin-top:20px;background:#fbfdff;padding:15px;box-sizing:border-box">
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
      <el-form-item label="航空公司">
        <el-select v-model="params.air" placeholder="请选择" style="width:200px">
          <el-option v-for="item in options3" :key="item" :label="item" :value="item"></el-option>
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
      <el-form-item label="预计毛重">
        <el-input v-model="params.weight"></el-input>
      </el-form-item>
      <el-form-item label="预计体积">
        <el-input v-model="params.volume"></el-input>
      </el-form-item>
      <el-form-item label="生效日期">
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item>
      <el-form-item label=" " label-width="200px">
        <el-button type="info" icon="el-icon-search" size="mini">查询</el-button>
        <el-button size="mini" plain @click="reset">清空</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="tableData" border @selection-change="selChange" style="margin-top:20px;box-shadow:0 0 2px 0 #333;width: 100%;" v-loading="loading">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date1" label="航班号"></el-table-column>
      <el-table-column prop="date2" label="航空公司"></el-table-column>
      <el-table-column prop="date3" label="航班日期"></el-table-column>
      <el-table-column prop="date4" label="起运港"></el-table-column>
      <el-table-column prop="date5" label="目的港"></el-table-column>
      <el-table-column prop="date6" label="货物密度"></el-table-column>
      <el-table-column prop="date7" label="45+指导"></el-table-column>
      <el-table-column prop="date8" label="100+指导"></el-table-column>
      <el-table-column prop="date9" label="300+指导"></el-table-column>
      <el-table-column prop="date10" label="1000+指导"></el-table-column>
      <el-table-column prop="date11" label="MIN指导"></el-table-column>
      <el-table-column prop="date12" label="45+底价1"></el-table-column>
      <el-table-column prop="date13" label="100+底价1"></el-table-column>
      <el-table-column prop="date14" label="300+底价1"></el-table-column>
      <el-table-column prop="date15" label="1000+底价1"></el-table-column>
      <el-table-column prop="date16" label="45+底价2"></el-table-column>
      <el-table-column prop="date17" label="100+底价2"></el-table-column>
      <el-table-column prop="date18" label="300+底价2"></el-table-column>
      <el-table-column prop="date19" label="1000+底价2"></el-table-column>
      <el-table-column prop="date20" label="生效时间"></el-table-column>
      <el-table-column prop="date21" label="失效时间"></el-table-column>
    </el-table>
    <div class="pager">
       <el-pagination
        align='right'
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cursor"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'searchResult1',
  data(){
    return{
      loading:false,
      tableData:[
        {
          date1:'MU02373',
          date2:'东航',
          date3:'07/21 10:25',
          date4:'CAN',
          date5:'MIL',
          date6:'1:140以上',
          date7:'20  7成泡',
          date8:'18 7成泡',
          date9:'10 7成泡',
          date10:'9 7成泡',
          date11:'25 7成泡',
          date12:'17 7成泡',
          date13:'15 7成泡',
          date14:'7 7成泡',
          date15:'6 7成泡',
          date16:'17 7成泡',
          date17:'15 7成泡',
          date18:'7 7成泡',
          date19:'6 7成泡',
          date20:'2020-07-13',
          date21:'2020-07-20',
        }
      ],
      total:10,
      limit:10,
      cursor:1,
      value1:'',
      options1:['PVG','CAN','PEK'],
      options2:['MIL','LOS','FAK'],
      options3:['MU','CA'],
      options4:['1:140以上','1:250以上','1:121-1:140泡','1:111-1:120泡','1:191-1:110泡','1:71-1:90泡','1:50-1:70泡','1:300重','1:500重','1:1000重'],
      options5:['普货','危险品','电池'],
      params:{

      }
    }
  },
  created(){
    for(let i=1;i<11;i++){
      this.tableData[i]=this.tableData[0]
    }
    console.log(this.tableData)
  },
  methods:{
    selChange(val){
      console.log(val)
    },
    handleSizeChange(val){
      console.log(val)
    },
    handleCurrentChange(val){
      console.log(val)
    },
    reset(){

    }
  }
}
</script>
<style lang="scss">
.el-table th{
  background:#eee
}
</style>