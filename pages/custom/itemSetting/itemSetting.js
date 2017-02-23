// pages/custom/itemSetting/itemSetting.js
Page({
  data:{
    itemCount:0,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.itemsData = [];
  },
  addItem:function(){
    this.setData({
      itemCount:this.data.itemCount+1,
    })
  },
  removeItem:function(event){
    var newCout = this.data.itemCount-1;
    this.setData({
      itemCount:newCout
    })
    var idx = event.currentTarget.dataset.idx;
    for(var i = idx;i<this.data.itemCount;i++){

    }
  },
  saveItem:function(event){
    var item = event.detail.value;
        this.itemsData.push(item);
  },
  saveItems:function(){
    // 保存项目数据
    wx.setStorageSync('itemsData', this.itemsData);
    // 退回开始页面
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  }
})