import common from "../../common.js";

const app = getApp();

Page({});
Component({
    data: {},
    methods: {
        exit() {
            wx.redirectTo({
                url: '/pages/index/index'
            });
        },
    },
    lifetimes: {
        created() {
        },
    },
});
