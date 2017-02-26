// pages/dice/dices.js
var utils = require("../../utils/utils.js");
Page({
  data: {
    diceCount: 1,
    dicesData:[],
    hideBtn:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.dotsData = {
      1: "5",
      2: "28",
      3: "357",
      4: "1379",
      5: "13579",
      6: "134679"
    };
    this.timer = null;
    this.animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
    });

    // 读取色子数量
    if(wx.getStorageSync('diceCount')){
      this.setData({
        diceCount:wx.getStorageSync('diceCount')
      })
    }

    // 摇一摇
    utils.shake(this.onRollTap);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },

  // 产生色子点数
  createDotData: function () {
    var num = Math.ceil(Math.random() * 6);
    var diceData = this.dotsData[num];
    var dotsHidden = {};
    for (var i = 1; i <= 9; i++) {
      if (diceData.indexOf(i) > -1) {
        dotsHidden[i] = "black";
      } else {
        dotsHidden[i] = "white";
      }
    };
    return dotsHidden;
  },

  // 产生色子动画
  createAnim: function (left, top) {
    // 色子移入屏幕
    this.animation.top(top + "rpx").left(left + "rpx").rotate(Math.random()*180).step({ duration: 1000, timingFunction: "ease-out" });
    return this.animation.export();
  },

  // 产生色子移动终点位置
  createDicesPos: function () {
    var dicesPos = [];
    // 色子位置判断
    function judgePos(l, t) {
      for (var j = 0; j < dicesPos.length; j++) {
        // 判断新产生的色子位置是否与之前产生的色子位置重叠
        if ((dicesPos[j].left-146 < l && l < dicesPos[j].left + 146) && (dicesPos[j].top-146 < t && t < dicesPos[j].top + 146)) {
          return false;
        }
      }
      return true;
    }
    for (var i = 0; i < this.data.diceCount; i++) {
      var posData = {},
          left = 0,
          top = 0;
      do {
        // 随机产生色子的可能位置
        left = Math.round(Math.random() * 600); // 0~600,根据色子区域和色子的大小计算得出
        top = Math.round(Math.random() * 550); // 0~550,根据色子区域和色子的大小计算得出
      } while (!judgePos(left,top));
      posData.left = left;
      posData.top = top;
      dicesPos.push(posData);
    }
    return dicesPos;
  },

  // 设置色子数据
  setDicesData: function (diceCount) {
    var dicesData = [];

    // 色子动画数据
    var dicesPos = this.createDicesPos(); // 所有色子的位置数据
    for (var i = 0; i < diceCount; i++) {
      var diceData = {};
      diceData.anim = this.createAnim(dicesPos[i].left, dicesPos[i].top);
      diceData.dots = this.createDotData();
      dicesData.push(diceData);
    }
    this.setData({ dicesData: dicesData });
    
  },

  // 摇色子
  onRollTap: function () {
    // 设置色子移出动画
    var newData = this.data.dicesData;
    if(newData.length < this.data.diceCount){
      for(var i = 0; i < this.data.diceCount;i++){
        var data = {};
        newData.push(data);
      }
    }
    for (var i = 0; i < newData.length; i++) {
      this.animation.left("-233rpx").top("123rpx").rotate(-180).step();
      newData[i].anim = this.animation.export();
      this.setData({ dicesData: newData });
    }
    
    var that = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function(){
      // 色子改变点数并移入屏幕
      that.setDicesData(that.data.diceCount);
    },1400)
    
  },

  // 减少色子数量
  reduceDice: function () {
    if (this.data.diceCount > 1) {
      this.setData({
        diceCount: this.data.diceCount - 1
      });
      wx.setStorageSync('diceCount', this.data.diceCount);
    }
  },
  // 增加色子数量
  addDice: function () {
    if (this.data.diceCount < 9) {
      this.setData({
        diceCount: this.data.diceCount + 1
      });
      wx.setStorageSync('diceCount', this.data.diceCount);
    }
  },
  // 分享功能
  onShareAppMessage:function(){
   
 }
})