import {
  request
} from "../../request/index.js"
Page({


  data: {
    detail: {}
  },
  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取id
    const {
      goods_id
    } = options;
    // 请求商品详情
    this.getListDetail(goods_id)
  },

  getListDetail(goods_id) {
    request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    }).then(ressult => {
      const {
        message
      } = ressult.data;
      this.GoodsInfo = message;
      // listDetail是商品详情
      this.setData({
        detail: message
      })
    })
  },

  //   // 点击轮播图 放大预览
  handlePreviewImage(e) {
    // 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_big);
    // 接收传递过来的图片路径
    const current = e.currentTarget.dataset.url;

    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },

  // 点击 加入购物车
  handleCartAdd() {
    // 1获取缓存中的购物车 数组
    let goods = wx.getStorageSync("goods") || {};
    const {
      goods_id,
      goods_name,
      goods_price,
      goods_small_logo
    } = this.data.detail;

    //判断商品是否已经在购物车中
    const number = goods[goods_id] ? goods[goods_id].number + 1 : 1;
    console.log(number)
    //  前面四个属性是商品详情提供的（需要在购物车页面中渲染）
    // number， selected属性是自己定义给购物车页面使用的
    goods[goods_id] = {
      goods_id,
      goods_name,
      goods_price,
      goods_small_logo,
      number,
      selected: true
    }

    // 5把购物车重新添加回缓存中
    wx.setStorageSync("goods", goods);
    // 6弹出加入成功
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    })
  },

})