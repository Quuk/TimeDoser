const common = require('../../../common.js');

Page({});

Component({
    data: {
        thisVersion: null,
        versionDetails: null,
        suggestMessage: null,
    },
    methods: {
        addOne(e) {
            this.setData({
                messageInput: e.detail.value
            });
            console.log(e.detail.value)
        },
    },
    attached: function () {
        getDevelopInfo(this); // 获取更新信息
        getMessageInfo(this); // 获取留言板信息
    },
});


// 获取更新信息
function getDevelopInfo(this_) {
    wx.getStorage({
        key: 'versionInfo',
        success(res) {
            this_.setData({
                thisVersion: res.data.thisVersion,
                versionDetails: res.data.versionDetails,
            });
        },
        fail() {
            wx.request({
                url: `${common.default.getUrl.url}/version/queryVersionUpdate`,
                header: common.HEADER,
                method: 'GET',
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        this_.setData({
                            thisVersion: data.data.data.thisVersion,
                            versionDetails: data.data.data.versionDetails,
                        });
                        wx.setStorageSync("versionInfo", data.data.data);
                    }
                }
            });
        }
    });
}


// 获取留言板信息
function getMessageInfo(this_) {
    wx.request({
        url: `${common.default.getUrl.url}/message/queryAllMessage`,
        header: common.HEADER,
        method: 'GET',
        success: data => {
            this_.setData({
                suggestMessage: data.data.data
            });
        }
    });
}

// 添加一条留言信息
