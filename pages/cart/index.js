import { request } from "../../request/index.js"
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
        // 把收获地址保存到本地
        wx.setStorageSync("address", this.data.address);
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
    let { goods } = this.data;
    if (goods[id].number<=1){
      // 判断数量是否小于等于1
      wx.showModal({
        title: '提示',
        content: '是否要删除该商品？',
        success: (res) => {
          if (res.confirm) {
            // 删除商品
            delete goods[id];
            // 由于showModal是异步执行，所以需要把修改data值的方式放到success中

            // 判断对象是否是一个空对象
            if (Object.keys(goods).length === 0) {
              goods = false;
            }

            // 修改data的值
            this.setData({
              goods
            });
            // 保存到本地
            wx.setStorageSync("goods", goods);
            // 计算总价格
            this.handleAllPrice();
          }
        }
      })
    }else{
      // 数量减1
      goods[id].number--;
      // 封装修改data值，并保存到本地
      this.getdata()
      // 计算总价格
      this.handleAllPrice();
    }
  },

  // 输入框输入数量
  handleInput(e){
    const { id } = e.target.dataset;
    let { goods } = this.data;
    goods[id].number=+e.detail.value
    // 修改data值
    this.setData({
      goods
    });
  },

  bindChange(e){
    const { id } = e.target.dataset;
    let { goods } = this.data;
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
    let {goods}=this.data;
    goods[id].number++;
    // 封装修改data值，并保存到本地
    this.getdata()
    // 计算总价格
    this.handleAllPrice();
  },

  // 点击选中状态取反
  handleSelected(e) {
    const { id } = e.target.dataset;
    let { goods } = this.data;
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
    let { goods } = this.data;
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
    let { goods } = this.data;
    // 修改data值
    this.setData({
      goods
    });
    // 保存到本地
    wx.setStorageSync('goods', goods)
  },

  // 全选状态
  handleAllSelected(){
    let { goods } = this.data;
    let allSelected=true;
    // 判断有一个是否没选中的
    Object.keys(goods).forEach(v=>{
      if(!goods[v].selected){
        allSelected = false;
      }
    })

    this.setData({
      allSelected
    })
  },

  // 点击全选按钮事件
  handleAllSelectedEvent(){
    let { goods,allSelected } = this.data;

    // 循环取反状态，取反是根据allSelected
    Object.keys(goods).forEach(v=>{
      goods[v].selected=!allSelected
    })
    // 修改data值
    this.setData({
      goods,
      // 判断全选状态
      allSelected:!allSelected
    });
    // 保存到本地
    wx.setStorageSync('goods', goods)
    // 计算总价格
    this.handleAllPrice();
  },

  // 结算订单
  handleCheckout(){
    // 测试提交
  //   const { goods, totalPrice,address } = this.data;
  //   // 把对象转化为数组
  //   const goodsArr=Object.keys(goods).map(v=>{
  //     goods[v].goods_number = goods[v].number;
  //     return goods[v];
  //   })

  //   // 提交订单
  //   request({
  //     url:"/my/orders/create",
  //     method:"POST",
  //     data:{
  //       order_price: totalPrice,
  //       consignee_addr:address.detail,   //一般情况地址是个对象，而不是一个字符串，接口问题
  //       goods:goodsArr
  //     }
  //   }).then(res=>{
  //     console.log(res)
  //   })
  // 判断本地是否有token,如果有token就转到支付页，没有的话就跳转到登录页
    

  if(wx.getStorageSync("token")){
    wx.navigateTo({
      url: '/pages/order/index',
    })
  }else{
    wx.navigateTo({
      url: '/pages/auth/index',
    })
  }

  }

})