import common from '../../common.js';

let app = getApp();

Page({});

Component({
    data: {
        minute: 44,
        logName: "默认番茄",
        form_minute: 25,  // 页面默认25分钟
        allTask: {}
    },
    created: function () {

        // 检查token
        checkToken(this);

        // 加载页面数据
        if (app.globalData.token != null) {
            getAllTask(this);
        }
    },
    methods: {

        // 开始任务
        toStart(e) {
            let minute = e.currentTarget.dataset.minute;
            let name = e.currentTarget.dataset.name;
            let id = e.currentTarget.dataset.id;

            wx.navigateTo({
                url: "/pages/timeDoser/timeDoser?minute=" + minute + "&logName=" + name + "&id=" + id
            });
        },

        // 添加任务
        addOne(data) {

            if (data.detail.value.minute === "0") {
                common.sout("时间不可设置为0");
                return;
            }

            wx.request({
                url: `${common.URL}/planTask/addOne`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X_Auth_Token': app.globalData.token
                },
                dataType: 'json',
                method: "POST",
                data: {
                    name: data.detail.value.name || "默认番茄",
                    minute: parseInt(data.detail.value.minute)
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {

                        common.sout("添加成功");

                        // 重新加载页面
                        wx.removeStorage({key: 'allTask'});
                        getAllTask(this);

                        // 清空表格数据
                        this.setData({
                            form_name: '',
                            form_minute: 25
                        })
                    }
                }
            });
            this.hideModal();
        },

        // 删除任务
        deleteOne(e) {
            wx.request({
                url: `${common.URL}/planTask/deleteOne`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X_Auth_Token': app.globalData.token
                },
                dataType: 'json',
                method: "POST",
                data: {
                    taskId: e.currentTarget.dataset.id
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        common.sout("删除成功");

                        // 重新加载页面
                        wx.removeStorage({key: 'allTask'});
                        getAllTask(this);
                    }
                }
            });
        },


        // 监测输入
        minuteCheck(e) {
            this.setData({form_minute: e.detail.value.replace(/[^0-9]/ig, "")})
        },

        // 重新开始任务
        toReStart(e) {
            common.sout("重新开始此项任务");
            wx.request({
                url: `${common.URL}/planTask/restartOne`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X_Auth_Token': app.globalData.token
                },
                dataType: 'json',
                method: "POST",
                data: {
                    taskId: e.currentTarget.dataset.id
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        // 重新加载页面
                        wx.removeStorage({key: 'allTask'});
                        getAllTask(this);
                    }
                }
            });
        },

        // 展示添加弹窗
        showModal() {
            this.setData({
                showModal: true
            })
        },

        // 隐藏添加弹窗
        hideModal() {
            this.setData({
                showModal: false
            })
        },
    }
});

/**
 * 查询所有任务
 *
 * @param that
 */
function getAllTask(that) {
    wx.getStorage({
        key: 'allTask',
        success(res) {
            that.setData({allTask: res.data});
        },
        fail() {
            wx.request({
                url: `${common.URL}/planTask/getAllTask_12`,
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X_Auth_Token': app.globalData.token
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        that.setData({allTask: data.data.data});
                        wx.setStorage({
                            key: 'allTask',
                            data: data.data.data
                        })
                    }
                }
            });
        }
    });
}


// 检查token(微信首次登录的一个大坑...)
function checkToken(that) {
    let token = app.globalData.token;
    if (token === "" || token === null) {
        // 避免操作
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            mask: true,
            duration: 10000
        });

        // 登录接口
        wx.login({
            success: data => {
                wx.request({
                    url: `${common.URL}/login/getBaseInfo`,
                    header: common.HEADER_NOTOKEN,
                    data: {appCode: data.code},
                    success: requsData => {
                        if (requsData.statusCode === 200 && requsData.data.code === '000') {
                            app.globalData.token = requsData.data.data.token;

                            // 存入缓存区
                            wx.setStorage({
                                key: 'baseUser',
                                data: requsData.data.data
                            });

                            // 存入全局变量
                            app.globalData.baseUser = requsData.data.data;

                            // 重新加载页面
                            getAllTask(that);

                            wx.hideToast();
                            return requsData.data.data.token;
                        }
                    }
                });
            }
        });
    } else {
        return token;
    }
}