import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url搜索关键字，分类页传递过来的
    query:'',
    // 商品列表，接口请求回来的
    goods:[],
    //是否加载很多
    hasMore:true,
    pageNum:1
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
   this.getList();
  },

// 请求列表数据
  getList(){
    request({
      url: '/goods/search',
      data: {
        query: this.data.query,
        pagenum: this.data.pageNum,
        pagesize: 10
      }
    }).then(result => {
      const { goods } = result.data.message;
      const newGoods = goods.map(v => {
        v.goods_price = Number(v.goods_price).toFixed(2)
        return v;
      })
      this.setData({
        goods: [...this.data.goods, ...newGoods]
      })
    })
  },

  // 加载更多数据
  onReachBottom(){
    // 请求下一页数据
    this.setData({
      pageNum: this.data.pageNum + 1,
      
    })
   
    this.getList();
  }
})