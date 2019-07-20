const common = require('common.js');

//app.js
App({
    onLaunch: function () {

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo;

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        });

        // 获取用于登录的loginCode
        wx.login({
            success: data => {
                const code = data.code;

                // 查看登录人是否记录在后台系统中,没有则添加
                wx.request({
                    url: `${common.default.getUrl.url}/login/getBaseInfo`,
                    data: {
                        appCode: code
                    },
                    method: 'GET',
                    header: common.HEADER,

                    success: data => {

                        // 如果有数据的话则添加到全局变量中
                        if (data.statusCode === 200 && data.data.code === '000') {
                            this.globalData.baseUser = data.data.data;

                            // 同时存入缓存区
                            wx.setStorage({
                                key: 'baseUser',
                                data: data.data.data
                            })
                        }
                    }
                });
            }
        });

        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: res => {
                            this.globalData.userInfo = res.userInfo;
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        });

        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                this.globalData.Custom = custom;
                this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
            }
        });
    },
    globalData: {
        baseUser: {},
        userInfo: {},
        minute: 25,
    }
});
