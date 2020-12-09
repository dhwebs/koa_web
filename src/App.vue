<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  // import "./style/style.css"
</script>
<style lang="scss">
html,body,#app {
  padding:0;
  margin:0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  overflow-y: hidden;
  min-width: 1000px;
}
p,img{margin:0;padding:0}
h1 {font-size:20px;line-height:32px;margin:0;}
h2 {font-size:18px;line-height:28px;margin:0;}
h3 {font-size:16px;line-height:24px;margin:0;}
h4 {font-size:14px;line-height:20px;margin:0;}
a {text-decoration: none;color: #409EFF;cursor:pointer}
a:link { color: #409EFF;}
a:visited { color: #409EFF;}
a:hover { color: #409EFF;}
a:active { color: #409EFF;}
.right {text-align:right}
.center {text-align:center}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  background: #ddd;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  background: #eee;
}
.top{
  display: flex;
  justify-content: space-between;
}
.top h3{
  font-size: 16px;
    line-height: 24px;
    margin: 0;
}
.header{
  background:#409EFF;
  // border-bottom:1px solid #eee;
}
.el-table th{
  text-align: center;
  background-color: #eee;
}
.el-submenu__title{
  background:#eeeeee40;
}
.el-menu-item.is-active{
  background:#ecf5ff
}
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
