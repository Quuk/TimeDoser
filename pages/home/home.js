import common from "../../common.js";

const app = getApp();

Page({});
Component({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        baseUser: wx.getStorageSync("baseUser"),
        amimationIndex: null
    },
    methods: {
        toMyspase() {
            console.log("dododo");
            const animation = wx.createAnimation({
                duration: 1000
            });
            animation.scale(20).step();
            animation.opacity(0.8).step();
            this.setData({
                amimationIndex: animation.export()
            })
        }
    }
});
