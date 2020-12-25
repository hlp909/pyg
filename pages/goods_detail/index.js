import { request } from "../../request/index.js"
Page({

  
  data: {
    detail:{}
  },
  // 商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取id
    const {goods_id}=options;
    // 请求商品详情
    this.getListDetail(goods_id)
  }, 

  getListDetail(goods_id){
    request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    }).then(ressult => {
      const { message } = ressult.data;
      this.GoodsInfo=message;
      // listDetail是商品详情
      this.setData({
        detail: {
          goods_id: message.goods_id,
          goods_name: message.goods_name,
          goods_number: message.goods_number,
          goods_price: message.goods_price,
          goods_introduce: message.goods_introduce,
          pics: message.pics
        }
      })
    })
  },

//   // 点击轮播图 放大预览
  handlePreviewImage(e){
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
  handleCartAdd(){
    // 1获取缓存中的购物车 数组
    let cart=wx.getStorageSync("cart")||[];
    // 2判断商品对象是否存在于购物车数组中
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      // 3不存在 第一次添加
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo)
    }else{
      // 4已经存在购物车 执行num++
      cart[index].num++;
    }
    // 5把购物车重新添加回缓存中
    wx.setStorageSync("cart",cart);
    // 6弹出加入成功
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,

    })
  },
  
})
