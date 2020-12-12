<template>
<div>
  <div v-for="(item,i) in list" :key='i'>
    <el-submenu :index="index+'-'+i" v-if="item.type=='title'">
      <template slot="title">
        <i :class="item.icon?item.icon:'el-icon-s-unfold'"></i>
        <span>{{item.name}}</span>
      </template>
      <div v-for="(item2,k) in item.children" :key="k">
        <el-menu-item :index="item2.path" v-if="item2.type=='route'">
          <template slot="title" >
            <i :class="item2.icon?item2.icon:'el-icon-s-unfold'"></i>
            <span>{{item2.name}}</span>
          </template>
        </el-menu-item>
      </div>
      <dh-submenu :list='item.children' v-if="item.children && item.children.length" :index="index+'-'+i"></dh-submenu>
    </el-submenu>
  </div>
</div>
</template>

<script>
export default {
  name:'dhSubmenu',
  props:['list','index'],
}
</script>

<style>

</style>