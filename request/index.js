export const request=(params)=>{
    return new Promise((resolve,rejecj)=>{
        wx.request({
            ...params,
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err);
            }

        })
    })
}