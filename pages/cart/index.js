// pages/cart/index.js
Page({
  data:{
    // 收货地址
    address:{},
    // 购物车商品列表
    goods:null
    // 总价格
    // totalPrice:0,
    // // 总数量
    // totalNumber:0
  },

  // 点击获取收货地址
  handleAddress(){
    wx.chooseAddress({
      // 成功的方法
      success:(res)=> {
      //  设置收货地址
        this.setData({
          address:{
            userName: res.userName,
            telNumber: res.telNumber,
            detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
          }
        })
      }
    })
  },
  onShow(){
    // 每次打开页面时都获取购物车的数据
    const goods=wx.getStorageSync("goods")||null; 
    this.setData({
      goods
    })
  },

  // 点击取消选中状态
  handleSelected(){
    this.setData({
      selected:!this.data.selected
    })
  },

  // 数量减1
  handleReduce(e){
    const { id } = e.target.dataset;
    const { goods } = this.data;
    if (goods[id].number>1){
      // 数量减1
      goods[id].number--;  
      // 修改data值
      this.setData({
        goods
      });
      wx.setStorageSync('goods', goods)
    }else{
      // 判断数量是否小于等于1
      wx.showModal({
        title: '提示',
        content: '是否要删除该商品？',
        success:(res)=> {
          if (res.confirm) {
           delete goods[id];
          }
          // 由于showModal是异步的，所以需要把修改data的值放到success中来

          // 修改data值
          this.setData({
            goods
          });
          wx.setStorageSync('goods', goods)
        }
      })
    }
   
  },
  // 输入框输入数量
  handleInput(e){

  },
  // 数量+1
  handleAdd(e){
    const {id} = e.target.dataset;
    const {goods}=this.data;
    goods[id].number++;
    this.setData({
      goods
    });
    wx.setStorageSync('goods',goods)
  }
})