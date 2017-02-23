// pages/custom/custom.js
Page({
  data:{
    displayItem:"设置",
    isRolling:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.timer=null;
  },
  setItem:function(){
    wx.navigateTo({
      url: 'itemSetting/itemSetting'
    })
  },
  start:function(){
    var that=this;
    var itemsData=wx.getStorageSync('itemsData');
    this.setData({
      isRolling:true
    })
    clearInterval(this.timer);
    this.timer=setInterval(function(){
       var idx = Math.floor(Math.random()*itemsData.length);
       that.setData({
         displayItem:itemsData[idx]
       })
    },100);
  },
  stop:function(){
    clearInterval(this.timer);
    this.setData({
      isRolling:false
    })
  }
})