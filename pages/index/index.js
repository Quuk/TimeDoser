import common from '../../common.js';

const ajax = require('../../utils/ajax.js');

let app = getApp();

Page({});

Component({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        minute: 44,
        logName: "默认番茄",
        formName: "",
        formMinute: 25,  // 页面默认25分钟
        allTask: wx.getStorageSync("allTask"),
        checkProject: false,   // 是否点击项目
        createProject: false,  // 创建项目窗口
        nowUpdataProjectId: null,  // 现在修改的项目ID
    },
    created: function () {
        getAllTask(this);
    },
    methods: {

        // 番茄时钟快速设置时长
        setTime(e) {
            this.setData({formMinute: e.currentTarget.dataset.min});
        },

        // 开始任务
        toStart(e) {
            let minute = e.currentTarget.dataset.minute;
            let name = e.currentTarget.dataset.name;
            let id = e.currentTarget.dataset.id;

            wx.navigateTo({
                url: "/pages/timeDoser/timeDoser?minute=" + minute + "&logName=" + name + "&id=" + id
            });

            this.createOneClose();
        },

        toHomePage() {
            wx.navigateTo({
                url: "/pages/my/home/home"
            });
        },

        createOneOpen() {
            this.setData({
                createProject: true,
                nowUpdataProjectId: null  // 关掉修改窗口
            });

            this.animate('#am-project-create', [
                {scale: [1.1, 1.1], opacity: 0},
                {scale: [1, 1], opacity: 1},
            ], 100);
        },

        createOneClose() {
            this.setData({createProject: false});
            this.animate('#am-project-create', [
                {scale: [1.1, 1.1], opacity: 0},
                {scale: [1, 1], opacity: 1},
            ], 100);
        },

        // 添加任务
        addOne() {
            let min = this.data.formMinute;
            let name = this.data.formName;

            if (min === "0") {
                common.sout("时间不可设置为0");
                return;
            }

            ajax.myRequest({
                url: '/planTask/addOne',
                data: {
                    name: name || "默认番茄",
                    minute: parseInt(min)
                },
                success: () => {
                    common.sout("添加成功");
                    getAllTask(this);

                    // 清空表格数据
                    this.setData({
                        formName: '',
                        formMinute: 25
                    })
                }
            });

            this.createOneClose();
        },

        // 删除任务
        deleteOne(e) {
            ajax.myRequest({
                url: '/planTask/deleteOne',
                data: {taskId: e.currentTarget.dataset.id},
                success: () => {
                    common.sout("删除成功");
                    getAllTask(this);
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
            ajax.myRequest({
                url: '/planTask/restartOne',
                method: 'get',
                data: {taskId: e.currentTarget.dataset.id},
                success: () => {
                    getAllTask(this);
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
    ajax.myRequest({
        url: '/planTask/getAll',
        method: 'get',
        success: res => {
            that.setData({allTask: res.data});
        }
    });
}
