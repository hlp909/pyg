import { request } from "../../request/index.js"
Page({
  data: {
    // 收货地址
    address: {},
    // 购物车商品列表
    goods:null,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNumber: 0,
  },
  onShow() {
    // 每次打开页面时都获取购物车的数据
    const goods = wx.getStorageSync("goods") || null;
    const address=wx.getStorageSync('address') || {}

    Object.keys(goods).forEach(v => {
      if(!goods[v].selected){
        delete goods[v]
      }
      this.setData({
        goods,
        address
      })
    })
    
    // 计算总价格
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
      totalNumber: Number,
    })
  },

  // 立即支付
  handlePay() {
    const { address, goods, totalPrice, totalNumber}=this.data;
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
    // 把对象转化为数组
    let newGoods=Object.keys(goods).map(v=>{
      goods[v].goods_number = goods[v].number;
      return goods[v]
    })
    // 创建订单
    request({
      url:"/my/orders/create",
      method:"POST",
      data:{
        order_price: totalPrice,
        consignee_addr:address.detail,
        goods: newGoods
      },
      header:{
        Authorization:token
      }
    }).then(res=>{
      // 获取订单编号参数
      const {order_number}=res.data.message;
      // 请求支付参数
      request({
        url:"/my/orders/req_unifiedorder",
        method:"POST",
        data:{
          order_number
        },
        header: {
          Authorization: token
        }
      }).then(res=>{
        // pay是对象，包含了所有的支付参数
        const { pay } = res.data.message;
        // 发起支付，调用微信原生的支付窗口
        wx.requestPayment({
          ...pay,
          complete:(res=>{
            wx.showToast({
              title: '扫一扫',
              image: '../../icons/pay.png',
              duration: 5000
            })
          })
        });
      })
    })
  }

})