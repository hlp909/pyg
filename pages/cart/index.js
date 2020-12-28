// pages/cart/index.js
Page({
  data:{
    // 收货地址
    address:{},
    // 购物车商品列表
    goods:null,
    // 总价格
    totalPrice:0,
    // 总数量
    totalNumber:0,
    // 全选状态
    allSelected:true
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

    // 计算总价格
    this.handleAllPrice();
  },

  // 数量减1
  handleReduce(e){
    const { id } = e.target.dataset;
    const { goods } = this.data;
    if (goods[id].number>1){
      // 数量减1
      goods[id].number--;  
      // 封装修改data值，并保存到本地
      this.getdata()
      // 计算总价格
      this.handleAllPrice();
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

          // 封装修改data值，并保存到本地
          this.getdata()
          // 计算总价格
          this.handleAllPrice();
        }
      })
    }
  },

  // 输入框输入数量
  handleInput(e){
    const { id } = e.target.dataset;
    const { goods } = this.data;
    goods[id].number=+e.detail.value
    // 修改data值
    this.setData({
      goods
    });
  },

  bindChange(e){
    const { id } = e.target.dataset;
    const { goods } = this.data;
    const value = +e.detail.value
    if(value===0){
      goods[id].number=1;
    }
    // 封装修改data值，并保存到本地
    this.getdata()
    // 计算总价格
    this.handleAllPrice();
  },

  // 数量+1
  handleAdd(e){
    const {id} = e.target.dataset;
    const {goods}=this.data;
    goods[id].number++;
    // 封装修改data值，并保存到本地
    this.getdata()
    // 计算总价格
    this.handleAllPrice();
  },

  // 点击选中状态取反
  handleSelected(e) {
    const { id } = e.target.dataset;
    const { goods } = this.data;
    goods[id].selected = !goods[id].selected
    // 封装修改data值，并保存到本地
    this.getdata()
    // 计算总价格
    this.handleAllPrice();
    // 判断全选状态
    this.handleAllSelected()
  },

  // 封装计算总价格
  handleAllPrice(e){
    const { goods } = this.data;
    let Price=0;
    let Number = 0;
    // 开始计算，v就是key,也就是商品id
    Object.keys(goods).forEach(v=>{
      // 当前的商品必须是选中的
      if(goods[v].selected){
        Price += (goods[v].goods_price * goods[v].number);
        Number += goods[v].number;
      }
    })
    this.setData({
      totalPrice: Price,
      totalNumber:Number
    })
  },

  // 封装修改data值，并保存到本地
  getdata(){
    const { goods } = this.data;
    // 修改data值
    this.setData({
      goods
    });
    // 保存到本地
    wx.setStorageSync('goods', goods)
  },

  // 全选状态
  handleAllSelected(){
    const { goods } = this.data;
    let allSelected=true;
    Object.keys(goods).forEach(v=>{
      if(!goods[v].selected){
        allSelected = false;
      }
    })

    this.setData({
      allSelected
    })
  }
})