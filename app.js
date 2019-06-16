//app.js
App({
    onLaunch: function () {

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
        baseUser: null,
        userInfo: null
    }
});