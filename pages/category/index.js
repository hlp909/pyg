import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    // 、、分类列表
    cateList:[],
    scrollTop:0
  },

// 左侧菜单的点击事件
  handleClick(e){
    const { index } = e.currentTarget.dataset;
    this.setData({
      current:index,
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取分页数据
    request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(result=>{
      this.setData({
        cateList: result.data.message
        
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})