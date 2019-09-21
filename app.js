import common from 'common.js';

App({
    onLaunch: function () {

        common.sout("加载中...");
        // 登录接口
        wx.login({
            success: data => {
                wx.request({
                    url: `${common.URL}/login/getBaseInfo`,
                    header: common.HEADER_NOTOKEN,
                    data: {appCode: data.code},
                    method: "POST",
                    success: data => {
                        if (data.statusCode === 200 && data.data.code === '000') {
                            // 存入全局变量
                            this.globalData.baseUser = data.data.data;
                            this.globalData.token = data.data.data.token;
                            wx.setStorageSync('token', data.data.data.token);

                            // 存入缓存区
                            wx.setStorage({
                                key: 'baseUser',
                                data: data.data.data
                            });

                            wx.hideToast();
                        }
                    }
                });
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
        baseUser: null,  // 账户信息
        userInfo: null,  // 微信信息
        token: null      // token
    }
});
