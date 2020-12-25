// pages/cart/index.js
Page({
  // 点击添加收货地址
  addAddress() {
    wx.chooseAddress({
      success: function(res) {
        console.log(res)
      }
    })
  }

})