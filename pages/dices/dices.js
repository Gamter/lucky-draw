// pages/dice/dices.js
Page({
  data: {
    diceCount:4
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
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },

  diceChange:function() {
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
      this.setData({
        dotsHidden: dotsHidden
      });
    },
    
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onRollTap: function () {
    var that = this;

    var diceAnim = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
    });
    // 色子移出屏幕
    diceAnim.top("-200rpx").left("-200rpx").step();
    // 点数变化
    clearTimeout(this.timer);
    this.timer = setTimeout(this.diceChange,400);
     // 色子移入屏幕
    diceAnim.top("70%").left("50%").rotate(180).step({ duration: 1000, timingFunction: "ease",delay:500 });

    this.setData({
      animationData:diceAnim.export()
    })
  },
  reduceDice:function(){
    if(this.data.diceCount > 1){
      this.setData({
        diceCount:this.data.diceCount - 1
      })
    }
  },
  addDice:function(){
    if(this.data.diceCount < 10){
      this.setData({
        diceCount:this.data.diceCount + 1
      })
    }
  }
})