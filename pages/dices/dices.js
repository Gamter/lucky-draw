// pages/dice/dices.js
Page({
  data: {
    diceCount: 4,
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
    this.setDicesData(0);
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
  createAnim: function (left,top) {
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
    var dicesPos = [];
    // 色子位置判断
    function judgePos(l,t){
      for(var j = 0; j < dicesPos.length; j++){
        // 判断新产生的色子位置是否与之前产生的色子位置重叠
        if((dicesPos[j].left<l && l<dicesPos[j].left+146) && (dicesPos[j].top<t && t<dicesPos[j].top+146)){
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

  // 设置色子数据
  setDicesData:function(diceCount){
    var dicesData = [];

    // 色子是否显示和色子动画数据
    var dicesPos = this.createDicesPos(); // 所有色子的位置数据

    for(var i = 0; i<9; i++){
      var diceData = {};
      if(i < diceCount){
        diceData.hidden = false;
        diceData.anim = this.createAnim(dicesPos[i].left,dicesPos[i].left);
      }else{
        diceData.hidden = true;
        diceData.anim = null;
      }
      dicesData.push(diceData);
    };
    this.setData({dicesData:dicesData});

    //色子点数数据
    var that = this;
    this.timer=setTimeout(function(){

      for(var j = 0; j < diceCount; j++){
        dicesData[j].dots = that.createDotData();
      }
      that.setData({
        dicesData:dicesData
      })
    },400);

  },

  // 摇色子
  onRollTap: function () {
    this.setDicesData(this.data.diceCount);
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