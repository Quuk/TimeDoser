const common = require('../../../common.js');

Page({});

Component({
    data: {
        thisVersion: null,
        versionDetails: null,
        suggestMessage: null,
    },
    methods: {

        // 添加一条留言
        addOne(e) {
            wx.request({
                url: `${common.default.getUrl.url}/message/addMessage`,
                header: common.HEADER,
                method: 'GET',
                data: {
                    message: e.detail.value
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        wx.removeStorageSync('suggestMessage');
                        getMessageInfo(this);
                    } else {
                        wx.showToast({
                            title: 'loading',
                            icon: 'success',
                            mask: true,
                            duration: 500
                        })
                    }
                },
            });
        },
        deleteMessage(e) {
            let this_ = this;
            wx.showModal({
                title: '是否删除?',
                success(res) {
                    if (res.confirm) {
                        deleteMessage(e.currentTarget.dataset['index'], this_);
                    }
                }
            })
        }
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
                        wx.setStorageSync("versionInfo", data.data.data);
                        this_.setData({
                            thisVersion: data.data.data.thisVersion,
                            versionDetails: data.data.data.versionDetails,
                        });
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
        success: data => {
            wx.setStorageSync("suggestMessage", data.data.data);
            this_.setData({
                suggestMessage: data.data.data
            });
        }
    });
}

// 删除一条留言
function deleteMessage(messageId, this_) {
    wx.request({
        url: `${common.default.getUrl.url}/message/deleteMessage`,
        header: common.HEADER,
        data: {
            id: messageId
        },
        success: data => {
            if (data.statusCode === 200 && data.data.code === '000') {
                wx.removeStorageSync('suggestMessage');
                getMessageInfo(this_);
            }
        }
    });
}
