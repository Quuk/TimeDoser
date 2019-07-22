const app = getApp();
const common = require('../../../common.js');

Page({});

Component({
    data: {
        thisVersion: null,
        versionDetails: null,
        suggestMessage: null
    },

    // 在组件实例进入页面节点树时执行
    attached: function () {

        // 获取版本更新信息
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
                    }
                }
            });
        }

        // 留言板
        wx.request({
            url: `${common.default.getUrl.url}/message/queryAllMessage`,
            header: common.HEADER,
            method: 'GET',

            success: data => {
                console.log(data.data.data);
                this.setData({
                    suggestMessage: data.data.data
                });
            }
        });
    }
});