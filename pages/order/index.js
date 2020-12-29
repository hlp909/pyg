import { request } from "../../request/index.js"
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

  onLoad: function (options){
    this.handleAllPrice();
  },

   // 封装计算总价格
  handleAllPrice() {
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
    const {goods, address, totalPrice}=this.data;
    const newGoods=Object.keys(goods).map(v=>{
      goods[v].goods_number=goods[v].number;
      return goods[v];
    })

    request({
      url:"/my/orders/create",
      method:"POST",
      data:{
        order_price:totalPrice,
        consignee_addr:address.detail,
        goods: newGoods
      },
      header:{
        Authorization:wx.getStorageSync("token")
      }
    }).then(res=>{
      console.log(res)
    })
  }

})