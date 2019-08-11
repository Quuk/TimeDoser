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
            })
        }
    },
    lifetimes: {
        created: function () {
            // 用户数据加载
            setUserInfo(this);
        },
        attached: function () {

        },
    },
});


// 验证缓存中是否有用户信息,没有就加上
function setUserInfo(this_) {

    // 微信基础信息加载
    if (!this_.data.hasUserInfo) {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this_.setData({
                                userInfo: res.userInfo,
                                hasUserInfo: true,
                            });
                        }
                    });
                }
            }
        })
    }

    // 用户基础信息加载
    if (this_.data.baseUser === '' || this_.data.baseUser === null) {
        login(this_);
    } else {
        this_.setData({
            baseUser: app.globalData.baseUser
        });
    }


}

// 登录接口
function login(this_) {


    wx.login({
        success: data => {
            console.log(app.globalData.baseUser);


            wx.request({
                url: `${common.URL}/login/getBaseInfo`,
                header: common.HEADER,
                data: {
                    appCode: data.code,
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        this_.setData({
                            baseUser: data.data.data
                        });
                        // 存入全局变量
                        app.globalData.baseUser = data.data.data;
                        console.log(app.globalData.baseUser)

                        // 存入缓存区
                        wx.setStorage({
                            key: 'baseUser',
                            data: data.data.data
                        });
                    }
                }
            });
        }
    });
}

