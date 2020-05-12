

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    currentStatus:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log("---------onload获取状态-------------" + options.status);
    var status= -1;
    if (options.status == null || options.status =='undefined'){
      console.log("我是查所有");
      this.setData({ currentStatus:-1});
    }else{
      status = options.status;
      this.setData({ currentStatus: options.status });
    }
    
    this.list(status);

  },
  list: function (status){
    console.log("---------list-------------" + status);
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log("查询参数。。。。。。。。" + res);
        console.log(res);
        wx.request({
          url: app.getUrl() + "/dd_userList.do?userId=" + res.data + "&status=" + status,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            // success
            var da = a.data.newgoods;
            console.log('===========返回参数=================');
            console.log(JSON.stringify(a));
            that.setData({ "list": a.data.dds });
            that.sum();
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
       
      },
      complete: function (res) {
        // complete
      }
    })

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

  all:function(){
    wx.navigateTo({
      url: '../seller_order/seller_order'
    });
  },
  sh:function(event){
    var that = this;
    // 购物车单个删除
    var objectId = event.currentTarget.dataset.objectId;
    console.log(objectId);
    wx.showModal({
      title: '提示',
      content: '确认要收货吗',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: app.getUrl() + "/dd_sh.do?id=" + objectId,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              "content-type": "application/json"
            },
            success: function (a) {
              wx.showToast({
                title: '收货成功',
                icon: 'success',
                complete: function () {
                  that.list(that.data.currentStatus);
                  console.log("");
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


        }
      }
    })
  },
  sqtk: function (event) {
    var that = this;
    // 购物车单个删除
    var objectId = event.currentTarget.dataset.objectId;
    console.log(objectId);
    wx.showModal({
      title: '提示',
      content: '确认要退款吗',
      success: function (res) {
        if (res.confirm) {

          wx.request({
            url: app.getUrl() + "/dd_sqtk.do?id=" + objectId,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              "content-type": "application/json"
            },
            success: function (a) {
              wx.showToast({
                title: '申请退款成功',
                icon: 'success',
                complete: function () {
                  that.list(that.data.currentStatus);
                  console.log("");
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


        }
      }
    })
  },
  pj:function(event){
    var objectId = event.currentTarget.dataset.objectId;
    console.log(objectId);
    wx.navigateTo({
      url: '../pl?id=' + objectId
    });
  }
})