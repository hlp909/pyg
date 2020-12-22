// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {query}=options;
    this.setData({
      query
    })
  },

 
})