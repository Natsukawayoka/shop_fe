import resource from '../../lib/resource';
import city from '../../lib/city';
import tips from '../../lib/tips';
var app = getApp()
Page({
  data: {
    loading: true,
    name: '',
    phone: '',
    country: '',
    address: '',
    id: '',
    addressid: '',
    items: {
      labelText: '设置为默认',
      iconType: 'circle',
      is_default: false
    },
    index: 0,
    tipsData: {
      title: '',
      isHidden: true
    }
  },
  setDefault() {
    const isDefault = this.data.items.is_default;
    const iconColor = !this.data.items.is_default ? '#FF2D4B' : '';

    this.setData({
      items: {
        labelText: '设置为默认',
        iconType: !isDefault ? 'success' : 'circle',
        is_default: !isDefault,
        iconColor
      }
    });
  },
  onLoad:function(options) {
 //   this.setData({ addressid: options.id });
    var that = this;
    console.log("----------options-----------");
    console.log(options);
    if (options.id) {
     
      wx.request({
        url: app.getUrl() + "/address_view.do?id=" + options.id,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          "content-type": "application/json"
        },
        success: function (a) {
          // success
          var da = a.data.newgoods;
          // console.log('===========返回参数=================');
          // console.log(JSON.stringify(a));
          that.setData({ "name": a.data.address.name });
          that.setData({ "address": a.data.address.dz });
          that.setData({ "phone": a.data.address.phone });
          that.setData({ "id": a.data.address.id });
         // that.sum();
        },
        fail: function (res) {
          // fail
        },
        complete: function (res) {
          // complete
        }
      })

    } else {
       
    }
     
  },
  listenerReciverInput(e) {
    this.data.name = e.detail.value;
  },
  listenerPhoneInput(e) {
      this.data.phone = e.detail.value;
    
  },
  listenerAddressInput(e) {
    this.data.address = e.detail.value;
  },
  showToast(title, duartion) {
    const that = this;
    const tipsData = {
      title: title || '',
      duartion: duartion || 2000,
      isHidden: false
    };
    tips.toast(that.data.tipsData);
    that.setData({
      tipsData
    });
    setTimeout(() => {
      tipsData.isHidden = true;
      that.setData({
        tipsData
      });
    }, tipsData.duartion);
  },
  submitBtn() {

    console.log("新增地址");
    console.log("-------------执行onload-----------");
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        // console.log("查询参数。。。。。。。。" + res);
        // console.log(res);
        wx.request({
          url: app.getUrl() + "/address_exUpdate.do?user.id=" + res.data + "&name=" + that.data.name + "&phone=" + that.data.phone + "&dz=" + that.data.address+"&id="+that.data.id,
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          
          header: {
            "content-type": "application/json"
          },
          success: function (a) {
            // success

            console.log('===========返回参数=================');
            console.log(JSON.stringify(a));
         
            wx.navigateTo({
              url: '../addresses/addresses'
            });
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
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    });
  }
});
