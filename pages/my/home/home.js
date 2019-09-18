import common from "../../../common.js";

const app = getApp();

Page({});
Component({
    data: {
        baseUser: wx.getStorageSync("baseUser"),
    },
    methods: {
        getUserInfo: function (e) {
            app.globalData.userInfo = e.detail.userInfo;
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            });

            // 添加微信资料进缓存
            wx.getUserInfo({
                success: res => {
                    this.setData({userInfo: res.userInfo});
                    wx.setStorageSync('userInfo', res.userInfo);
                }
            });

            // 更新数据库中个人资料
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
        created() {
        }
    },
});

//
// // 验证缓存中是否有用户信息,没有就加上
// function setUserInfo(this_) {
//
//     // 微信基础信息加载
//     wx.getSetting({
//         success: res => {
//             if (res.authSetting['scope.userInfo']) {

//             }
//         }
//     });
//
//     // 全局基础信息加载
//     if (app.globalData.userInfo == null) {
//         app.globalData.userInfo = this_.data.userInfo;
//     }
// }

