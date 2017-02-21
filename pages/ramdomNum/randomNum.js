// pages/ramdomNum/randomNum.js
Page({
  data:{
    num1:1,
    num2:100,
    result:"?",
    btn:"开始",
    btnBg:"#333"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      this.timer = null;
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
    clearInterval(this.timer);
  },
  onUnload:function(){
    // 页面关闭
    clearInterval(this.timer);
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

  start:function(event){
    console.log(event);
    if(this.data.btn == "开始"){
      this.timer=setInterval(this.roll,100);
      this.setData({
        btn:"停止"
      })
    }else{
      clearInterval(this.timer);
      this.setData({
        btn:"开始"
      })
    }
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
  }
})