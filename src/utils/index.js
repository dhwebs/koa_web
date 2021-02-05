let utils={
  accAdd : function (arg1, arg2){//加法
    if (arg1 == '' || arg1 == null) {
      arg1 = 0;
    }
  
    if (arg2 == '' || arg2 == null) {
      arg2 = 0;
    }
  
    var r1, r2, m, c;
  
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
  
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
  
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
  
    if (c > 0) {
      var cm = Math.pow(10, c);
  
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      } else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    } else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
  
    return ((arg1 + arg2) / m).toFixed(2);
  },
  accSub : function (arg1, arg2) { //减法
    if (arg1 == '' || arg1 == null) {
      arg1 = 0;
    }
  
    if (arg2 == '' || arg2 == null) {
      arg2 = 0;
    }
  
    var r1, r2, m, n;
  
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
  
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
  
    m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
  
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(2);
  },
  accMul : function (arg1, arg2) {//乘法
    if (arg1 == '' || arg1 == null) {
      arg1 = 0;
    }
  
    if (arg2 == '' || arg2 == null) {
      arg2 = 0;
    }
  
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
  
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
  
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
  
    return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(2);
  },
  accChu : function (arg1, arg2) { //除法
    if (arg1 == '' || arg1 == null) {
      arg1 = 0;
    }
  
    if (arg2 == '' || arg2 == null) {
      arg2 = 0;
    }
  
    var t1 = 0,
        t2 = 0,
        r1,
        r2;
  
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
  
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
  
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2 * Math.pow(10, t2 - t1)).toFixed(2);
  },
  numberChinese : function (str) {//金额转中文
    var num = parseFloat(str);
    var strOutput = "",
        strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
    num += "00";
    var intPos = num.indexOf('.');
  
    if (intPos >= 0) {
      num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
    }
  
    strUnit = strUnit.substr(strUnit.length - num.length);
  
    for (var i = 0; i < num.length; i++) {
      strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i, 1), 1) + strUnit.substr(i, 1);
    }
  
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");
  },
  validate:(formName,that)=> {
    for(let i of formName){
      let k=false
      that.$refs[i].validate((valid) => {
        k = valid
      });
      if(!k) return false
    }
    return true
  },
  resetFields:(formName,that)=> {
    for(let i of formName){
      that.$refs[i].resetFields();
    }
  },
}
export default utils;