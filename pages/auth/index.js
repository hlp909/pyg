import { request } from "../../request/index.js"
Page({

  // 用户同意授权后的事件方法，获取token所需要的的前4个参数
  handleGetUserInfo(res){

    const { encryptedData, rawData, iv, signature } = res.detail;
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    // 获取code
    wx.login({
      success(res2){
        const {code}=res2;

        // 请求必须要放在回调函数中
        request({
          url:'/users/wxlogin',
          method:"POST",
          data:{
            encryptedData, 
            rawData,
            iv, 
            signature, 
            code
          }
        }).then(res3=>{
          // 把token保存到本地
          wx.setStorageSync("token",token);
          // 返回上一个页面
          wx.navigateBack();
        })
      }
    })
  }
 
})