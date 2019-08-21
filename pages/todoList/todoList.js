import common from '../../common.js';

Page({});

Component({
    data: {
        minute: 44,
        logName: "默认番茄",
        form_minute: 25,  // 页面默认25分钟
        allTask: {}
    },
    created: function () {
        getAllTask(this)
    },
    methods: {
        toStart(e) {
            let minute = e.currentTarget.dataset.minute;
            let name = e.currentTarget.dataset.name;

            wx.navigateTo({
                url: "/pages/timeDoser/timeDoser?minute=" + minute + "&logName=" + name
            });
        },
        addOne(data) {
            wx.request({
                url: `${common.URL}/planTask/addOne`,
                header: common.HEADER,
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
        deleteOne(e) {
            wx.request({
                url: `${common.URL}/planTask/deleteOne`,
                header: common.HEADER,
                dataType: 'json',
                method: "POST",
                data: {
                    taskId: e.currentTarget.dataset.id
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        common.sout("删除成功");

                        // 重新加载页面
                        getAllTask(this);
                    }
                }
            });
        },
        showModal(e) {
            this.setData({
                showModal: true
            })
        },
        hideModal(e) {
            this.setData({
                showModal: false
            })
        },
        PickerChange(e) {
            this.setData({
                index: e.detail.value
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
    wx.request({
        url: `${common.URL}/planTask/getAllTask`,
        header: common.HEADER,
        method: "POST",
        success: data => {
            if (data.statusCode === 200 && data.data.code === '000') {
                that.setData({allTask: data.data.data});
            }
        }
    });
}