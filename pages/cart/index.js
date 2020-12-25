// pages/cart/index.js
Page({
  data:{
    // 收货地址
    address:{}
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
  }
  // 点击添加收货地址
  // handleChooseAddress() {
  //   // 1获取 权限状态
  //   wx.getSetting({
  //     success: (res) => {
  //       // 2获取权限状态 主要发现一些 属性名很怪异的时候 都要用 []形式来获取属性值
  //       const scopeAddress = res.authSetting["scope.address"]
  //       if (scopeAddress === true || scopeAddress === undefined) {
  //         wx.chooseAddress({
  //           success: (res1) => {
  //             console.log(res1)
  //           },
  //         });
  //       } else {
  //         // 3用户 以前拒绝过授予权限 先诱导用户打开授权页面
  //         wx.openSetting({
  //           success: (res2) => {
  //             // 4可以调用 收货地址代码
  //             wx.chooseAddress({
  //               success: (res3) => {
  //                 console.log(res3);
  //               }
  //             });
  //           }
  //         })
  //       }
  //     }
  //   })
  // }

})