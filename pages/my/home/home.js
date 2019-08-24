import common from "../../../common.js";

const app = getApp();

Page({});
Component({
    data: {
        baseUser: wx.getStorageSync("baseUser"),
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    methods: {
        getUserInfo: function (e) {
            app.globalData.userInfo = e.detail.userInfo;
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            });
            wx.request({
                url: `${common.URL}/user/updateUserInfo`,
                header: {
                    'X_Auth_Token': this.data.baseUser.token
                },
                data: {userInfo: e.detail.userInfo},
            })
        }
    },
    lifetimes: {
        created: function () {

            // 如果点击了同意使用用户信息就把用户信息加上去
            if (!this.data.hasUserInfo) {
                setUserInfo(this);
            }
        },
        attached: function () {

        },
    },
});


// 验证缓存中是否有用户信息,没有就加上
function setUserInfo(this_) {

    // 微信基础信息加载
    wx.getSetting({
        success: res => {
            if (res.authSetting['scope.userInfo']) {
                wx.getUserInfo({
                    success: res => {
                        this_.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true,
                        });
                        app.globalData.userInfo = res.userInfo;
                        wx.setStorage({
                            key: 'userInfo',
                            data: res.userInfo
                        });
                    }
                });
            }
        }
    });

    // 全局基础信息加载
    if (app.globalData.userInfo == null) {
        app.globalData.userInfo = this_.data.userInfo;
    }
}

