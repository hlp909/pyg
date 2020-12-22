export const request=(params)=>{
  // 定义公共的url
  const baseurl ='https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve,rejecj)=>{
        wx.request({
            ...params,
            url:baseurl+params.url,
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err);
            }

        })
    })
}