import common from "../../../common.js";

const app = getApp();

Page({});
Component({
    data: {
        baseUser: wx.getStorageSync("baseUser")
    },
    methods: {
        getUserInfo: function (e) {

            // 如果用户同意授权
            if (e.detail.userInfo !== undefined) {
                let that = this;

                // 添加微信资料进缓存
                wx.getUserInfo({
                    success: res => {
                        app.globalData.userInfo = res.userInfo;
                        wx.setStorageSync('userInfo', res.userInfo);
                    }
                });

                // 更新数据库中个人资料
                wx.request({
                    url: `${common.URL}/user/updateUserInfo`,
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X_Auth_Token': app.globalData.token
                    },
                    method: "POST",
                    data: {userInfo: JSON.stringify(e.detail.userInfo)},
                    success(res) {
                        wx.setStorage({
                            key: 'baseUser',
                            data: res.data.data
                        });
                        that.setData({baseUser: res.data.data});
                        app.globalData.baseUser = res.data.data;
                    }
                });
            }
        }
    },
    lifetimes: {
        created() {
            checkData(this);
        },
    },
});

// 数据校验
function checkData(that) {

    // 个人主页出现了数据加载异常bug
    if (that.data.baseUser === null || that.data.baseUser === "" ||
        that.data.baseUser.avatarUrl === null || that.data.baseUser.avatarUrl === "") {
        that.setData({baseUser: wx.getStorageSync("baseUser")});
    }
}