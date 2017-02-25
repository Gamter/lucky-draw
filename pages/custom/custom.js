// pages/custom/custom.js
Page({
  data:{
    displayItem:"设置",
    isRolling:false,
    noData:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.timer=null;
  },
  onShow:function(){
    // 若没有设置过项目，或清空了项目，则隐藏开始按钮
    if(wx.getStorageSync('itemsData')&&wx.getStorageSync('itemsData').length>0){
      this.setData({
        noData:false
      })
    }else{
      this.setData({
        displayItem:"设置",
        noData:true
      })
    }
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
         displayItem:itemsData[idx].item
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