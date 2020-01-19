const app = getApp();

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        baseUser: wx.getStorageSync("baseUser"),
    },

    startTime: function () {
        console.log("开始了");

        this.animate('#box', [
            {opacity: 1.0, rotate: 0, backgroundColor: '#FF0000'},
            {opacity: 0.5, rotate: 45, backgroundColor: '#00FF00', offset: 0.9},
            {opacity: 0.0, rotate: 90, backgroundColor: '#FF0000'},
        ], 5000, function () {
            this.clearAnimation('#box', {opacity: true, rotate: true}, function () {
                console.log("清除了#container上的动画属性")
            })
        }.bind(this))
        this.animate('.block1', [
                {scale: [1, 1], rotate: 0, ease: 'ease-out'},
                {scale: [1.5, 1.5], rotate: 45, ease: 'ease-in', offset: 0.9},
                {scale: [2, 2], rotate: 90},
            ], 5000, function () {
                this.clearAnimation('.block1', {scale: true, rotate: true}, function () {
                    console.log("清除了.block1上的动画属性")
                })
            }.bind(this)
        )
    },
    start: function () {
        console.log("点击了开始");

        // this.animate('#main', [
        //     {scale: [1, 1], filter: none},
        //     {scale: [0.5, 0.5],filter: grayscale(100%)},
        // ], 1000)

    }
});
