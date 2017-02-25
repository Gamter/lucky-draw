// pages/custom/custom.js
Page({
  data: {
    displayItem: "设置",
    hideBtn: true
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.timer = null;
    this.t = 50;
    this.count = 0;
    // 摇一摇
      this.lastX=0;
      this.lastY=0;
      this.lastZ=0;
      var that = this;
      wx.onAccelerometerChange(function(res){
        if(that.lastX){
          var deltaX = Math.abs(res.x-that.lastX),
            deltaY=Math.abs(res.y-that.lastY),
            deltaZ=Math.abs(res.z-that.lastZ);
            if(deltaX > 0.9 || deltaY>0.9 || deltaZ>0.9){
              that.start();
            }
        }
        that.lastX = res.x;
        that.lastY = res.y;
        that.lastZ = res.z;
      })
  },
  onShow: function () {
    // 若没有设置过项目，或清空了项目，则隐藏开始按钮
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
  }
})