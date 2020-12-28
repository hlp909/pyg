import { request } from "../../request/index.js"
Page({
  // 用户同意授权后的事件方法，获取token所需要的的前4个参数
  handleGetUserInfo(res){
    const { encryptedData, rawData, iv, signature } = res.detail;

    // 获取code
    wx.login({
      success(res2){
        const {code}=res;

        // 请求必须要放在回调函数中
        request({
          uel:'/users/wxlogin',
          method:"POST",
          data:{
            encryptedData, rawData, iv, signature, code
          }
        }).then(res3=>{
          console.log(res3)
        })
      }
    })
  }
 
})