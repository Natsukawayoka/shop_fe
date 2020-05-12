// 初始化AV
const AV = require('./utils/av-weapp.js');
const appId = "SgHcsYqoLaFTG0XDMD3Gtm0I-gzGzoHsz";
const appKey = "xdv2nwjUK5waNglFoFXkQcxP";
const url = "http://localhost:8080/";
AV.init({ 
	appId: appId, 
	appKey: appKey,
});

// 授权登录
App({
	onLaunch: function () {
        // auto login via SDK
        var that = this;

             
        wx.login({
          success: function (loginCode) {
            var appid = 'wx66dd1ef36cec2c77'; //填写微信小程序appid  
            var secret = '06d5ad7dfc9fb5006901db6dfceba67d'; //填写微信小程序secret  

            //调用request请求api转换登录凭证  
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&grant_type=authorization_code&js_code=' + loginCode.code,
              header: {
                'content-type': 'application/json'
              },
              
              success: function (res) {
                console.log(res.data.openid) //获取openid  
                wx.request({
                  url: url+'login_bd.do', //仅为示例，并非真实的接口地址
                  data: {
                    openId: res.data.openid
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    console.log("返回用户的id是"+res.data.userId)
                    wx.setStorage({
                      key: 'userId',
                      data: res.data.userId,
                    })
                  }
                })
              }
            })
          }
        });
   

        
		// 设备信息
		wx.getSystemInfo({
			success: function(res) {
				that.screenWidth = res.windowWidth;
				that.screenHeight = res.windowHeight;
				that.pixelRatio = res.pixelRatio;
			}
		});

    
   
	},

  globalData: {
    userInfo: null,

  } ,
  getUrl: function () {
    return "http://localhost:8080/";
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口  
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },  
})
