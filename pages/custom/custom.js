// pages/custom/custom.js
Page({
  data: {
    displayItem: "设置",
    noData: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.timer = null;
    this.t = 50;
    this.count = 0;
  },
  onShow: function () {
    // 若没有设置过项目，或清空了项目，则隐藏开始按钮
    if (wx.getStorageSync('itemsData') && wx.getStorageSync('itemsData').length > 0) {
      this.setData({
        noData: false
      })
    } else {
      this.setData({
        displayItem: "设置",
        noData: true
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
      if (this.t < 2000) {
        this.timer = setTimeout(this.roll, this.t);
      } else {
        this.t = 50;
        this.count = 0;
      }
    }
  }
})