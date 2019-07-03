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


        wx.login({
            success: res => {

                // // 获取用户信息
                // wx.request({
                //     url: `${common.getUrl.url}/login/getBaseInfo`,
                //     data: {
                //         appCode: res.code
                //     },
                //     method: 'GET',
                //     header: common.HEADER,
                //     success: data => {
                //         // 存入全局变量
                //         this.globalData.baseUser = data.data.data;
                //         // 存入缓存区
                //         wx.setStorage({
                //             key: 'baseUser',
                //             data: data.data.data
                //         })
                //     }
                // });
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
