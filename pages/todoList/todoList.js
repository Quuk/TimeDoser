import common from '../../common.js';

Page({});

Component({
    data: {
        index: null,
        picker: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
        minute: 44,
        logName: "默认番茄",
        allTask: {}
    },
    created: function () {
        console.log("开始获取任务列表");
        getAllTask(this)
    },
    methods: {
        toStart() {
            wx.navigateTo({
                url: "/pages/timeDoser/timeDoser?minute=" + this.data.minute + "&logName=" + this.data.logName
            });
        },
        addOne(data) {
            console.log("添加了一个任务");
            console.log(data.detail.value);

            wx.request({
                url: `${common.URL}/planTask/addOne`,
                header: common.HEADER,
                method: "POST",
                data: {
                    planTask: JSON.stringify({
                        name: data.detail.value.name || "默认番茄",
                        tomatoWorkTime: parseInt(data.detail.value.minute)
                    })
                },
                success: data => {
                    if (data.statusCode === 200 && data.data.code === '000') {
                        getAllTask(this);
                    }
                }
            });
            this.hideModal();
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