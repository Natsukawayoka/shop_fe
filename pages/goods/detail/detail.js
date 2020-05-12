const AV = require('../../../utils/av-weapp.js')
var app = getApp();
Page({
	data: {
		goods: {},
    pls: [],
		current: 0,
		galleryHeight: getApp().screenWidth
	},
	onLoad: function(options) {
		var id = options.id;

    console.log("------------商品详情页得到商品id是：" + id);
    var that = this;
    wx.request({
      url: app.getUrl() + 'goods_view.do', //仅为示例，并非真实的接口地址
      data: {
        id: id
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
          pls: res.data.pls
        });
      }
    })

	},
	getGoodsById: function(id) {
		var that = this
		var query = new AV.Query('Goods');
        // 生成商品对象
        query.get(goodsId).then(function (goods) {
			// console.log(goods);
			that.setData({
				goods: goods
			});
		// 成功获得实例
	}, function (error) {
		// 异常处理
	});
    },
    addCart: function() {
    	this.insertCart(this.data.goods);
	},
	insertCart: function (goods) {
    var that = this;
    console.log("加。。");
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log("缓存查数据");
        console.log(res);
        wx.request({
          url: app.getUrl() + "/car_exAdd.do?goodsId=" + goods.id + "&userId=" + res.data,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            if (a.data.result == 1) {
              wx.showToast({
                title: '加入购物车成功',
                icon: 'success',
                complete: function () {
                  wx.switchTab({
                    url: '/pages/cart/cart'
                  })
                }
              })
            } else {

            }
          },
          fail: function (res) {
            wx.redirectTo({
              url: "/pages/shop/login/login"
            })
          },
          complete: function (res) {
            // complete
          }
        })
      },
      fail: function (res) {
        // fail
        wx.redirectTo({
          url: "/pages/shop/login/login"
        })
      },
      complete: function (res) {
        // complete
      }
    })

     
	},
	showCartToast: function () {
		wx.showToast({
			title: '已加入购物车',
			icon: 'success',
			duration: 1000
		});
	},
	previewImage: function (e) {
		wx.previewImage({
			//从<image>的data-current取到current，得到String类型的url路径
			current: this.data.goods.get('images')[parseInt(e.currentTarget.dataset.current)],
			urls: this.data.goods.get('images') // 需要预览的图片http链接列表
		})
	},
	showCart: function () {
		wx.switchTab({
			url: '../../cart/cart'
		});
	}
});