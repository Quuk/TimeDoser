App({
    onLaunch: function () {

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
