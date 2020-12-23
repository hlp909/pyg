import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url搜索关键字，分类页传递过来的
    query:'',
    // 商品列表，接口请求回来的
    goods:[]
  },

  /**
   * 生命周期函数--监听页面加载    
   */
  onLoad: function (options) {
    const {query}=options;
    this.setData({
      query
    });
    // 请求列表数据
    request({
      url:'/goods/search',
      data:{
        query:query,
        pagenum:1,
        pagesize:10
      }
    }).then(result => {
      const {goods}=result.data.message;
      const newGoods=goods.map(v=>{
        v.goods_price=Number(v.goods_price).toFixed(2)
        return v;
      })
      this.setData({
        goods: newGoods
      })
    })
  },
})