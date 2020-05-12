
var app = getApp()
Page({
	data:{
		carts: [],
		minusStatuses: [],
		selectedAllStatus: false,
		total: '',
		startX: 0,
		itemLefts: []
	},

  
	bindMinus: function(e) {
		// loading提示
	
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].num;
    var carId = this.data.carts[index].carId;
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
    console.log("修改以后的num:" + num);
    this.updateNum(carId, num);
	
	},
	bindPlus: function(e) {
		
    var index = parseInt(e.currentTarget.dataset.index);
    var num = this.data.carts[index].num;
    num ++;
    var carId = this.data.carts[index].carId;
    console.log("修改以后的num:" + num);
    this.updateNum(carId, num);
	},
	bindManual: function(e) {
		// wx.showLoading({
		// 	title: '操作中',
		// 	mask: true
		// });
		// var index = parseInt(e.currentTarget.dataset.index);
		// var carts = this.data.carts;
		// var num = parseInt(e.detail.value);
		// carts[index].set('quantity', num);
		// // 将数值与状态写回
		// this.setData({
		// 	carts: carts
		// });
		// carts[index].save().then(function () {
		// 	wx.hideLoading();
		// });
		// this.sum();
	},
	bindManualTapped: function() {
		// 什么都不做，只为打断跳转
	},
	bindCheckbox: function(e) {
	
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/
		//拿到下标值，以在carts作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
    console.log("购物车下标是：" + index);
    console.log("点击选中购物车以后的数据是：" + JSON.stringify(this.data.carts));
		//原始的icon状态
    var selected = this.data.carts[index].selected;

    console.log("当前状态是：" + selected);
		var carts = this.data.carts;
		// 对勾选状态取反
    var id = carts[index].carId;
    console.log("当前购物车id是：" + id);
		// 写回经点击修改后的数组
    this.updateSelect(id);

		this.sum();
    console.log("点击复选框炒作完毕");
	},
	
	bindCheckout: function() {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log("查询参数。。。。。。。。" + res);
        console.log(res);
        wx.request({
          url: app.getUrl() + "/dd_exAdd.do?userId=" + res.data,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            console.log("执行接轨-------------------------");
            console.log(JSON.stringify(a));
            // success
            if (a.data.res == 0){
               wx.showToast({
                title: '请选择默认地址',
                icon: 'success',
                complete: function () {
                 
                }
              })
            }
            if (a.data.res == 1) {
              wx.showToast({
                title: '请选择商品',
                icon: 'success',
                complete: function () {

                }
              })
            }
            if (a.data.res == 2) {
              wx.showToast({
                title: '结算成功',
                icon: 'success',
                complete: function () {
                  wx.navigateTo({
                    url: '../seller_order/seller_order?status=0'
                  });
                }
              })
            }
            
           
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
  list:function(){
    
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log("查询参数。。。。。。。。" + res);
        console.log(res);
        wx.request({
          url: app.getUrl() + "/car_userList.do?userId=" + res.data,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            // success
            var da = a.data.newgoods;
            console.log('===========返回参数=================');
            console.log(JSON.stringify(a));
            that.setData({ "carts": a.data.listgoods });
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
	delete: function (e) {
		var that = this;
		// 购物车单个删除
		var objectId = e.currentTarget.dataset.objectId;
		console.log(objectId);
		wx.showModal({
			title: '提示',
			content: '确认要删除吗',
			success: function(res) {
				if (res.confirm) {
        
          wx.request({
            url: app.getUrl() + "/car_delete.do?id=" + objectId,
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              "content-type": "application/json"
            },
            success: function (a) {
              that.list();
              console.log("成功执行修改select");
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
	calcIds: function () {
		// 遍历取出已勾选的cid
		// var buys = [];
		var cartIds = [];
		for (var i = 0; i < this.data.carts.length; i++) {
			if (this.data.carts[i].get('selected')) {
				// 移动到Buy对象里去
				// cartIds += ',';
				cartIds.push(this.data.carts[i].get('objectId'));
			}
		}
		if (cartIds.length <= 0) {
			wx.showToast({
				title: '请勾选商品',
				icon: 'success',
				duration: 1000
			})
		}
		return cartIds;
	},
	reloadData: function() {
		// auto login
		var that = this;
		var user = AV.User.current();
		var query = new AV.Query('Cart');
		var minusStatuses = [];
		query.equalTo('user',user);
		query.include('goods');
		query.find().then(function (carts) {
			for(var i = 0; i < carts.length; i++){
				minusStatuses[i] = carts[i].get('quantity') <= 1 ? 'disabled' : 'normal';
			}
			// console.log(carts);
			that.setData({
				carts: carts,
				minusStatuses: minusStatuses
			});
			// sum
			that.sum();
		});

	},
	onShow: function() {
    this.list();
	},
	sum: function() {
		var carts = this.data.carts;
		// 计算总金额
   
		var total = 0;
		for (var i = 0; i < carts.length; i++) {
      console.log("-------------start-----------------");
      console.log("当前i是："+i);
      console.log("当前select是：" + carts[i].selected);
      if (carts[i].selected) {
        console.log("当前num是：" + carts[i].num);
        console.log("当前price是：" + carts[i].goods.price);
        total += carts[i].num * carts[i].goods.price;
			}
      console.log("-------------end-----------------");
		}
    console.log("计算总金额" + total)
		total = total.toFixed(2);
		// 写回经点击修改后的数组
    console.log("计算总金额" + total)
		this.setData({
			carts: carts,
			total: total
		});
	},
	showGoods: function (e) {
		// 点击购物车某件商品跳转到商品详情
		var objectId = e.currentTarget.dataset.objectId;
		wx.navigateTo({
			url: '../goods/detail/detail?id=' + objectId
		});
	},
	touchStart: function (e) {
		var startX = e.touches[0].clientX;
		this.setData({
			startX: startX,
			itemLefts: []
		});
	},
	touchMove: function (e) {
		var index = e.currentTarget.dataset.index;
		var movedX = e.touches[0].clientX;
		var distance = this.data.startX - movedX;
		var itemLefts = this.data.itemLefts;
		itemLefts[index] = -distance;
		this.setData({
			itemLefts: itemLefts
		});
	},
	touchEnd: function (e) {
		var index = e.currentTarget.dataset.index;
		var endX = e.changedTouches[0].clientX;
		var distance = this.data.startX - endX;
		// button width is 60
		var buttonWidth = 60;
		if (distance <= 0) {
			distance = 0;
		} else {
			if (distance >= buttonWidth) {
				distance = buttonWidth;
			} else if (distance >= buttonWidth / 2){
				distance = buttonWidth;
			} else {
				distance = 0;
			}
		}
		var itemLefts = this.data.itemLefts;
		itemLefts[index] = -distance;
		this.setData({
			itemLefts: itemLefts
		});
	},
  updateSelect:function(id){
    console.log("修改当前购物车id选中状态" + id);
    var that = this;
    wx.request({
      url: app.getUrl() + "/car_updateSelect.do?id=" + id,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "application/json"
      },
      success: function (a) {
        that.list();
        console.log("成功执行修改select");
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  updateNum:function(carId, num){
    console.log("修改当前购物车id数量状态" + carId);
    console.log("修改当前购物车num数量状态" + num);
    var that = this;
    wx.request({
      url: app.getUrl() + "/car_updateNum.do?id=" + carId + "&num=" + num,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "application/json"
      },
      success: function (a) {
        that.list();
        console.log("成功执行修改Num");
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  }
})