// pages/custom/custom.js
var utils = require("../../utils/utils.js");
Page({
  data: {
    title: "自定义抽奖",
    displayItem: "设置",
    hideBtn: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.timer = null;
    this.t = 50;
    this.count = 0;
    // 摇一摇
    utils.shake(this.start);
  },
  onShow: function () {
    // 根据数据的缓存情况进行设置
    if(wx.getStorageSync('customTitle')){
      this.setData({
        title:wx.getStorageSync('customTitle')
      })
    }
    if (wx.getStorageSync('itemsData') && wx.getStorageSync('itemsData').length > 0) {
      this.setData({
        hideBtn: false
      })
    } else {
      this.setData({
        displayItem: "设置",
        hideBtn: true
      })
    }
  },
  onHide: function () {
    // 页面隐藏
    clearInterval(this.timer);
    this.t = 50;
    this.count = 0;
  },
  setItem: function () {
    wx.navigateTo({
      url: 'itemSetting/itemSetting'
    })
  },

  start: function () {
    this.setData({
      hideBtn:true
    })
    clearTimeout(this.timer);
    this.roll();
  },
  roll: function () {
    var itemsData = wx.getStorageSync('itemsData');
    var idx = Math.floor(Math.random() * itemsData.length);
    this.setData({
      displayItem: itemsData[idx].item
    })
    // 先每50毫秒变化一次，如此变化50次后变化间隔逐渐变大，直到停止
    this.count++;
    if (this.count < 50) {
      this.timer = setTimeout(this.roll, 50);
    } else {
      this.t *= 1.5;
      if (this.t < 1500) {
        this.timer = setTimeout(this.roll, this.t);
      } else {
        this.t = 50;
        this.count = 0;
        this.setData({
          hideBtn:false
        })
      }
    }
  },
   // 分享功能
  onShareAppMessage:function(){
   
 }
})