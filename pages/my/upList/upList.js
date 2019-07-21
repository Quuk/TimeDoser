const app = getApp();
const common = require('../../../common.js');

Page({});

Component({
    data: {
        thisVersion: null,
        versionDetails: null
    },

    // 在组件实例进入页面节点树时执行
    attached: function () {
        // 在这里获取更新信息
        if (this.data.thisVersion == null && this.data.versionDetails == null) {
            wx.request({
                url: `${common.default.getUrl.url}/version/queryVersionUpdate`,
                header: common.HEADER,
                method: 'GET',

                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        this.setData({
                            thisVersion: data.data.data.thisVersion,
                            versionDetails: data.data.data.versionDetails,
                        });
                        console.log(this.data.versionDetails);
                    }
                }
            });
        }
    }
});