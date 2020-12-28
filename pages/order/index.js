// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 、地址
    address:wx.getStorageSync("address")||{},
    // 购物车商品
    goods:wx.getStorageSync("goods")||{},
    // 总价格
    totalPrice:0
  },

  onLoad(){
    this.handleAllPrice();
  },

   // 封装计算总价格
  handleAllPrice(e) {
    let { goods } = this.data;
    let Price = 0;
    let Number = 0;
    // 开始计算，v就是key,也就是商品id
    Object.keys(goods).forEach(v => {
      // 当前的商品必须是选中的
      if (goods[v].selected) {
        Price += (goods[v].goods_price * goods[v].number);
        Number += goods[v].number;
      }
    })
    this.setData({
      totalPrice: Price,
      totalNumber: Number
    })
  },

  // 立即支付
  handlePay(){
    
  }

})