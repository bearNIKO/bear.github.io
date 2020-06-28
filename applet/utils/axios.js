class Axios{
  get(url,data,token,formType){
    // 对get请求的封装
    return this.request('GET',url,data,token,formType)
  }
  put(url,data,formType,token){
    return this.request('PUT',url,data,token,formType,token)
  }
  delete(url,data,formType,token){
    return this.request('DELETE',url,data,formType,token)
  }
   post(url,data,token,formType){
     return this.request('POST',url,data,token,formType,)
   }
   request(method,url,data,token,formType){
     //将wx默认的request 封装成 promise 
    return  new Promise((resolve,reject)=>{
      var contentType = formType?'application/x-www-form-urlencoded':'application/json'
      wx.request({
        url:url,
        method:method,
        data:data,
        header:{
          "Authorization":"Bear"+token,
          "content-type":contentType
          // 注意上传格式   默认是json
        },
        success(res){
          resolve(res.data)
        },
        fail(err){
          reject(err)
        }
      })
     })
   }
}
module.exports = new Axios()