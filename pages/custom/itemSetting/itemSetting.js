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
    var itemData = {
      item:"",
      inputFocus:true
    };
    this.itemsData.push(itemData);
    this.setData({
      itemsData: this.itemsData,
    });
    this.setData({
      scrollTop: 6666
    })
  },
  removeItem: function (event) {
    var idx = event.currentTarget.dataset.idx;
    this.itemsData.splice(idx, 1);
    this.setData({
      itemsData: this.itemsData
    })
  },
  onInputFocus:function(){
    // 输入框聚焦时隐藏添加项目按钮和删除项目按钮
    this.setData({
      hideBtn:true
    })
  },
  onInputBlur: function (event) {
    var idx = event.currentTarget.dataset.idx;
    var itemValue = event.detail.value;
    this.itemsData[idx].item = itemValue;
    this.itemsData[idx].inputFocus = false;
    // 输入框失焦时显示添加项目按钮和删除项目按钮
    this.setData({
      hideBtn:false
    })
  },
  saveAndback: function () {
    // 保存项目数据
    wx.setStorageSync('itemsData', this.itemsData);
    // 退回开始页面
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }
})