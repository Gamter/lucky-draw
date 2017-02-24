// pages/custom/itemSetting/itemSetting.js
Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.itemsData = wx.getStorageSync('itemsData') || [];
    this.setData({
      itemsData: this.itemsData
    })
  },
  addItem: function () {
    this.itemsData.push("");
    this.setData({
      itemsData: this.itemsData
    });

    this.setData({
      itemsData: this.itemsData,
      scrollTop: this.data.itemsData.length * 1000
    });
  },
  removeItem: function (event) {
    var idx = event.currentTarget.dataset.idx;
    this.itemsData.splice(idx, 1);
    this.setData({
      itemsData: this.itemsData
    })
  },
  saveItem: function (event) {
    this.itemsData[this.itemsData.length - 1] = event.detail.value;
  },
  saveItems: function () {
    // 保存项目数据
    wx.setStorageSync('itemsData', this.itemsData);
    // 退回开始页面
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }
})