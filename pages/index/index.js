// pages/index/index.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
 onRandomNumTap:function(){
   wx.navigateTo({
     url: "../randomNum/randomNum",
   })
 },
 onDiceTap:function(){
   wx.navigateTo({
     url: '../dices/dices',
   })
 },
 onCustomTap:function(){
   wx.navigateTo({
     url: '../custom/custom',
   })
 },
  // 分享功能
  onShareAppMessage:function(){
   
 }
})