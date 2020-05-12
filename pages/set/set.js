Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasuserinfo: "未获取",
    pageNo: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getUserInfo({
      success: function (getuserinfo) {
        that.data.hasuserinfo = true;
        that.setData(that.data);
      },
      fail: function (fres) {
        that.data.hasuserinfo = false;
        that.setData(that.data);
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
  clickme: function () {
    let that = this;
    wx.openSetting({
      success: function (osrs) {
        // 出发条件是返回的时候
        console.log("Aaaa");
        wx.getUserInfo({
          success: function (getuserinfo) {
            that.data.hasuserinfo = true;
            that.setData(that.data);
          },
          fail: function (fres) {
            that.data.hasuserinfo = false;
            that.setData(that.data);
          }
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})