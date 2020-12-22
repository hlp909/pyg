import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    cateList:[],
    floorList:[]
  },

  /**
   * 页面开始加载 就会触发
   */
  onLoad: function (options) {
    // 1发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })  
    //   }
    // });
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList(){
    request({
      url:"/home/swiperdata" }).then(result=>{
        this.setData({
                  swiperList:result.data.message
                }) 
    })
  },

   // 获取导航数据
   getCateList(){
    request({
      url:"/home/catitems" }).then(result=>{
        this.setData({
          cateList:result.data.message
        }) 
    })
  },
  // 获取楼层数据
  getFloorList(){
    request({
      url:"/home/floordata"}).then(result=>{
        this.setData({
          floorList:result.data.message
        }) 
    })
  }
})