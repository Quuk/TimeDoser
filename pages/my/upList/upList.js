import common from "../../../common.js";

const app = getApp();


Page({});

Component({
    data: {
        thisVersion: null,
        versionDetails: null,
        suggestMessage: null,
        inputValue: null,
        baseUser: wx.getStorageSync("baseUser"),
        userInfo: wx.getStorageSync("userInfo"),
    },
    methods: {

        // 添加一条留言
        addOne(e) {
            this.setData({
                'inputValue': ''
            });

            wx.request({
                url: `${common.URL}/message/addMessage`,
                header: common.HEADER,
                data: {
                    message: e.detail.value
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        wx.removeStorageSync('suggestMessage');
                        getMessageInfo(this);
                    } else {
                        wx.showToast({
                            title: '添加失败',
                            icon: 'loading',
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
    created: function () {
    },
    attached: function () {
        getDevelopInfo(this); // 获取更新信息
        getMessageInfo(this); // 获取留言板信息
        console.log(this.data.userInfo);

    },
});


// 获取更新信息
function getDevelopInfo(this_) {
    wx.request({
        url: `${common.URL}/version/queryVersionUpdate`,
        header: common.HEADER,
        method: 'GET',
        success: data => {
            if (data.statusCode === 200 && data.data.code === '000') {
                this_.setData({
                    thisVersion: data.data.data.thisVersion,
                    versionDetails: data.data.data.versionDetails,
                });
            }
        }
    });
}

// 获取留言板信息
function getMessageInfo(this_) {
    wx.request({
        url: `${common.URL}/message/queryAllMessage`,
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
        url: `${common.URL}/message/deleteMessage`,
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
