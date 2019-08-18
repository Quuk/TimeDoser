import common from '../../common.js';

Page({
    data: {},
    toStart() {
        wx.navigateTo({
            url: "/pages/timeDoser/timeDoser?minute=" + this.data.minute + "&logName=" + this.data.logName
        });
    }
});

Component({
    data: {
        minute: 44,
        logName: "默认番茄",
        allTask: {}
    },
    created: function () {
        console.log("开始获取任务列表");
        wx.request({
            url: `${common.URL}/planTask/getAllTask`,
            header: common.HEADER,
            method: "POST",
            success: data => {
                if (data.statusCode === 200 && data.data.code === '000') {
                    console.log("allTask请求成功....");
                    console.log(data.data.data)
                }
            }
        });
        console.log("获取任务列表结束");
    },
    methods: {
        toStart() {
            wx.navigateTo({
                url: "/pages/timeDoser/timeDoser?minute=" + this.data.minute + "&logName=" + this.data.logName
            });
        }

    }
});
