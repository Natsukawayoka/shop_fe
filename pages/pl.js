// pages/pl.js
var app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
   id:"",
   content:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("---------商品id-----------" + options.id);
    this.setData({ id: options.id});
  },

  listenerAddressInput:function(e){
    this.setData({ content: e.detail.value });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
   submitBtn() {

    console.log("新增评论");
    console.log("-------------执行onload-----------");
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log("查询参数。。。。。。。。" + res);
        console.log(res);
        wx.request({
          // that.data.id
          url: app.getUrl() + "/pl_exAdd.do?user.id=" + res.data + "&goods.id=" + that.data.id + "&content=" + that.data.content ,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT

          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            // success

            console.log('===========返回参数=================');
            console.log(JSON.stringify(a));
            wx.showToast({
              title: '评论成功',
              icon: 'success',
              complete: function () {
                wx.navigateTo({
                  url: '../../seller_order/seller_order?status=4'
                });
              }
            })
           
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      },
      fail: function (res) {
        console.log('===========查询缓存失败=================');
        wx.redirectTo({
          url: "/pages/shop/login/login"
        })
      },
      complete: function (res) {
        // complete
      }
    })



  },
})