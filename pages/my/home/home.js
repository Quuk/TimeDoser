const app = getApp();

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        minute: 25
    },
    toUpdataInfoPage() {
        wx.navigateTo({
            url: '/pages/temp/temp'
        })
    },
    timeSubmit(data) {
        app.globalData.minute = data.detail.value;
    }
});


Component({
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached: function () {

            // 获取登录人信息
            if (app.globalData.userInfo) {
                this.setData({
                    userInfo: app.globalData.userInfo,
                    hasUserInfo: true
                })
            } else if (this.data.canIUse) {
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                app.userInfoReadyCallback = res => {
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            } else {
                // 在没有 open-type=getUserInfo 版本的兼容处理
                wx.getUserInfo({
                    success: res => {
                        app.globalData.userInfo = res.userInfo;
                        this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true
                        })
                    }
                })
            }
        }
    },
});
