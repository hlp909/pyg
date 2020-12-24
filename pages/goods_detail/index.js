import { request } from "../../request/index.js"
Page({

  
  data: {
    detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取id
    const {goods_id}=options;
    // 请求商品详情
    request({
      url:'/goods/detail',
      data:{
        goods_id
      }
    }).then(ressult=>{
      const { message } = ressult.data;
      // listDetail是商品详情
      this.setData({
        detail: message
      })
    })
  },

  
})