import resource from '../../lib/resource';
import tips from '../../lib/tips';
var app = getApp()
Page({
  data: {
    // 设置菊花初始状态
    loading: false,
    addressesList: [],
    defaultId: 0,
    tipsData: {
      title: ''
    }
  },
  setDefaultStyle(list, id) {
    list.forEach((itm) => {
      if (itm) {
        itm.items.is_default = +itm.address_id === id;
        itm.items.iconType = itm.items.is_default ? 'success' : 'circle';
        itm.items.iconColor = itm.items.iconType === 'success' ? '#FF2D4B' : '';
      }
    });
  },
  goEdit(event) {
    const id = event.target.dataset.addressId;
    wx.navigateTo({
      url: "../address-edit2/address-edit?id="+id
    });
  },
  delete(event) {
    var that = this;
    const id = event.target.dataset.addressId;
    wx.request({
      url: app.getUrl() + "/address_delete.do?id=" + id,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "application/json"
      },
      success: function (a) {
        // success

        console.log('===========返回参数=================');
        console.log(JSON.stringify(a));
        that.onLoad();
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
  mr: function (event){
  
  },
  setDefault(event) {
    var that = this;
    const id = event.target.dataset.addressId;
    console.log("设置默认地址" + JSON.stringify(event));
    wx.request({
      url: app.getUrl() + "/address_mr.do?id=" + id,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "application/json"
      },
      success: function (a) {
        // success

        console.log('===========返回参数=================');
        console.log(JSON.stringify(a));
        that.onLoad();
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
    
  },
  onLoad:function() {
    console.log("-------------执行onload-----------");
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log("查询参数。。。。。。。。" + res);
        console.log(res);
        wx.request({
          url: app.getUrl() + "/address_list.do?user.id=" + res.data,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            // success
          
            console.log('===========返回参数=================');
            console.log(JSON.stringify(a));
            that.setData({ "addressesList": a.data.addressesList});
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
       
      },
      complete: function (res) {
        // complete
      }
    })
  
  }
});
