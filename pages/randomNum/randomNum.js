// pages/ramdomNum/randomNum.js
Page({
  data:{
    num1:1,
    num2:100,
    result:"?",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      this.timer = null;
      this.t = 50; //数字正常变化的时间间隔
      this.count = 0;// 数字正常变化的次数，大于这个次数后数字变化速度逐渐变慢
  },
  onHide:function(){
    // 页面隐藏
    clearInterval(this.timer);
    this.t= 50;
    this.count = 0;
  },
  

  setNum1:function(event){
    var num = parseInt(event.detail.value);
    this.setData({
      num1:num
    });
  },
 
  setNum2:function(event){
    var num = parseInt(event.detail.value);
    this.setData({
      num2 : num
    })
  },

  // start:function(event){
  //   if(this.data.btn == "开始"){
  //     this.timer=setInterval(this.roll,100);
  //     this.setData({
  //       btn:"停止"
  //     })
  //   }else{
  //     clearInterval(this.timer);
  //     this.setData({
  //       btn:"开始"
  //     })
  //   }
  // },

  start:function(){
    clearTimeout(this.timer);
    this.roll();
  },

  roll:function(){
    var max,min;
    if(this.data.num1 < this.data.num2){
      min = this.data.num1;
      max = this.data.num2;
    }else{
      min = this.data.num2;
      max = this.data.num1;
    }

    var result = min + Math.round(Math.random()*(max - min));
    this.setData({
      result:result
    })
    // 让数字先每50毫秒变化一次，如此变化50次后变化间隔逐渐变大，直到停止
    this.count++;
    if(this.count < 50){
      this.timer = setTimeout(this.roll,50);
    }else{
      this.t *= 1.5;
      if(this.t < 2000){
        this.timer = setTimeout(this.roll,this.t);
      }else{
        this.t = 50;
        this.count = 0;
      }
    }
  }
})