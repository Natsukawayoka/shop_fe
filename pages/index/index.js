const AV = require('../../utils/av-weapp.js')
var app = getApp();
Page({
	data: {
		banner: [],
		goods: [],
  
		bannerHeight: Math.ceil(290.0 / 750.0 * getApp().screenWidth)
	},
	onLoad: function (options) {
    
		// this.loadBanner();
		// this.loadMainGoods();
		// this.getInviteCode(options);
    var that = this;
    wx.request({
      url: app.getUrl() + 'login_uIndex.do', //仅为示例，并非真实的接口地址
      data: {
       
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("返回信息是" + JSON.stringify(res))
        that.setData({
          goods: res.data.goods
        });
        that.setData({
          banner: res.data.banner
        });
      }
    })

	},

	showDetail: function (e) {
		var index = e.currentTarget.dataset.id;
    console.log("点击详情获取的id是：" + index);
		wx.navigateTo({
      url: "../goods/detail/detail?id=" + index
		});
	},
	showCategories: function () {
		// wx.navigateTo({
		// 	url: "../category/category"
		// });
		wx.switchTab({
			url: "../category/category"
		});
	},
	showOrders: function () {
		wx.navigateTo({
			url: "../order/list/list?status=1"
		});
	},
	onShareAppMessage: function () {
		return {
			title: '灵动开源电商系统',
			desc: '一个基于LeanCloud开发的开源电商系统',
			path: '/pages/index/index?uid=4719784'
		}
	},
	showGoods: function () {
		wx.navigateTo({
			url: '../goods/detail/detail?objectId=5816e3b22e958a0054a1d711'
		});
	}
})