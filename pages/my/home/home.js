const common = require('../../../common.js');
const app = getApp();

Page({
    data: {
        userInfo: null,
        baseUser: null
    },
    timeSubmit(data) {
        app.globalData.minute = data.detail.value;
    },
});


Component({
    lifetimes: {
        attached: function () {
            setUserInfo(this);
        }
    },
});


// 验证缓存中是否有用户信息,没有就加上
function setUserInfo(this_) {
    wx.getSetting({
        success: res => {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: res => {
                        this_.setData({
                            userInfo: res.userInfo
                        });
                        login(this_, res.userInfo);
                    }
                });
            }
        }
    })
}

// 登录接口
function login(this_, userInfo) {
    wx.login({
        success: data => {
            wx.request({
                url: `${common.default.getUrl.url}/login/getBaseInfo`,
                header: common.HEADER,
                data: {
                    appCode: data.code,
                    userInfo: userInfo
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        this_.setData({
                            baseUser: data.data.data
                        });
                    }
                }
            });
        }
    });
}

