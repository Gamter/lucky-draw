// pages/dice/dices.js
Page({
  data: {
    diceCount: 4
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

  // 产生色子点数
  generateDot: function () {
    console.log("generateDot");
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
  generateAnim: function (left,top) {
    console.log("generateAnim");
    var diceAnim = wx.createAnimation({
      duration: 400,
      timingFunction: 'linear',
    });
    // 色子移出屏幕
    diceAnim.top("-200rpx").left("-200rpx").step();
    // 色子移入屏幕
    var destinationX = 0,
      destinationY = 0;
    diceAnim.top(top+"rpx").left(left+"rpx").rotate(180).step({ duration: 1000, timingFunction: "ease", delay: 500 });
    return diceAnim.export();
  },

  // 产生色子移动终点位置
  createDicesPos: function () {
    console.log("createDicesPos");
    var dicesPos = [];
    // 色子位置判断
    function judgePos(l,t){
      for(var j = 0; j < dicesPos.length; j++){
        // 判断新产生的色子位置是否与之前产生的色子位置重叠
        if(dicesPos[j].left<l<dicesPos[j].left+146 && dicesPos[j].top<t<dicesPos[j].top+146){
          return false;
        }
      }
      return true;
    }
    for(var i = 0; i < this.data.diceCount; i++){
      var posData = {};
      do{
        // 随机产生色子的可能位置
        posData.left = Math.round(Math.random()*600); // 0~600,根据色子区域和色子的大小计算得出
        posData.top = Math.round(Math.random()*550); // 0~550,根据色子区域和色子的大小计算得出
      }while(!judgePos(posData.left,posData.top));
       dicesPos.push(posData);
    }
    return dicesPos;
  },

  // 摇色子
  onRollTap: function () {
    console.log("roll");
    var that = this;
    var dicesDotData = []; // 所有色子的点数数据
    var dicesAnimData = []; // 所有色子的动画数据
    var dicesPos = this.createDicesPos(); // 所有色子的位置数据
    for (var i = 0; i < this.data.diceCount; i++) {
      dicesDotData[i] = this.generateDot();
      dicesAnimData[i] = this.generateAnim(dicesPos[i].left,dicesPos[i].top);
    }
    // 色子动画数据绑定
    this.setData({
      dicesAnim: dicesAnimData
    })
    // 色子移出屏幕后改变点数，故延迟进行色子点数的数据绑定
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
      that.setData({
        dicesDot: dicesDotData
      })
    }, 400)
  },

  // 减少色子数量
  reduceDice: function () {
    if (this.data.diceCount > 1) {
      this.setData({
        diceCount: this.data.diceCount - 1
      })
    }
  },

  // 增加色子数量
  addDice: function () {
    if (this.data.diceCount < 10) {
      this.setData({
        diceCount: this.data.diceCount + 1
      })
    }
  }
})