<template>
  <div>
    <div class="top">
      <h3>页面样式</h3>
    </div>
    <el-row>
      <el-col :span="3">按钮大小</el-col>
      <el-col :span="3"><el-input></el-input></el-col>
      <el-col :span="3"><el-button>按钮</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="3">输入框大小</el-col>
      <el-col :span="3"><el-input></el-input></el-col>
      <el-col :span="3"><el-input></el-input></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:'pageStyle',
  data(){
    return{

    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style>

</style>