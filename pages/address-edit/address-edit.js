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
    },
    ajx:false

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
  onLoad(options) {
    this.setData({ addressid: options.id });
    var that = this;
 
    if (options.id) {
      resource.fetchDetailAddress(options.id).then((res) => {
        this.data.items.is_default = res.data.is_default;
        this.setData({
          consignee: res.data.consignee,
          mobile: res.data.mobile,
          county: res.data.county,
          province: res.data.province,
          city: res.data.city,
          address: res.data.address,
          loading: false,
          items: this.data.items
        });
        //this.setDefault();
          city.init(that);
      });
    } else {
        city.init(that);
    }
     
  },
  listenerReciverInput(e) {
    var that = this;
    this.data.name = e.detail.value;
  },
  listenerPhoneInput(e) {
    var that = this;
    var phone = e.detail.value;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      this.setData({
        ajx: false
      })
    } else {
      this.setData({
        ajx: true
      })
      this.data.phone = e.detail.value;
    }
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
    if (this.data.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'success',
        duration: 2000
      })
    } else if(this.data.ajx == false) {
      wx.showToast({
        title: '手机号有误',
        icon: 'success',
        duration: 2000
      })
    } else if (this.data.address == "") {
      wx.showToast({
        title: '地址不能为空',
        icon: 'success',
        duration: 2000
      })
    }else{
      console.log("新增地址");
      console.log("-------------执行onload-----------");
      var that = this;
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          console.log("查询参数。。。。。。。。" + res);
          console.log(res);
          wx.request({
            url: app.getUrl() + "/address_exAdd.do?user.id=" + res.data + "&name=" + that.data.name + "&phone=" + that.data.phone + "&dz=" + that.data.address,
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
    }
    


   
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    });
  }
});
