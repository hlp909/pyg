import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 地址
    address:wx.getStorageSync("address")||{},
    // 购物车商品
    goods:wx.getStorageSync("goods")||{},
    // 总价格
    totalPrice:0,
    // 总数量
    totalNumber: 0
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
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

  // 发起支付
  handlePay(){
    const {goods, address, totalPrice}=this.data;
    const newGoods=Object.keys(goods).map(v=>{
      goods[v].goods_number=goods[v].number;
      return goods[v];
    })

    // 创建订单成功
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
      // 获取订单编号
      const {order_number}=res.data.message;
      // 请求支付的参数
      request({
        url:"/my/orders/req_unifiedorder",
        method:"POST",
        data:{
          order_number
        },
        header:{
          Authorization: wx.getStorageSync("token")
        }
      }).then(res=>{
        // pay是对象，包含了所有的支付参数
        const { pay } = res.data.message;

        // 发起支付,调用微信的原生支付窗口
        wx.requestPayment({
          ...pay,
          success: () => {
            // 把本地的goods列表中selected为true的商品删除掉
            let newGoods = wx.getStorageSync("goods")
            newGoods = newGoods.filter(v=>!v.selected)
            wx.setStorageSync('goods', newGoods)
          }
      })
      })
    })
  }

})