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
        checkProject: false,       // 是否点击项目
        createProject: false,      // 创建项目窗口
        nowUpdataProjectId: null,  // 现在修改的项目ID

        updateName: null,     // 修改后的名称
        updateMin: null,      // 修改后的分钟
        updateLogo: null,     // 修改后的logo
    },
    created: function () {
        getAllTask(this);
    },
    methods: {

        // 打开修改项目窗口
        projectUpdata(e) {
            const index = e.currentTarget.dataset.index;
            this.setData({
                nowUpdataProjectId: index,
                createProject: false    // 关掉新增窗口
            });
            this.animate('#am-project-update', [
                {scale: [0.9, 0.9], opacity: 0},
                {scale: [1, 1], opacity: 1},
            ], 100);
        },

        // 关掉修改项目窗口
        updateOneClose(e) {
            this.setData({nowUpdataProjectId: null});
            let id = e.currentTarget.dataset.id;
            this.animate('#tomotoUpdate-' + id, [
                {scale: [1.1, 1.1], opacity: 0},
                {scale: [1, 1], opacity: 1},
            ], 100);

            this.setData({
                updateName: null,
                updateMin: null,
                updateLogo: null,
            })
        },

        // 修改一个任务
        updateOne(e) {
            const tomoto = e.currentTarget.dataset.tomoto;
            tomoto.name = this.data.updateName!==null?this.data.updateName:tomoto.name;
            tomoto.tomatoWorkTime = this.data.updateMin!==null?this.data.updateMin:tomoto.tomatoWorkTime;
            console.log(tomoto)

            // ajax.myRequest({
            //     url: '/planTask/updateTask',
            //     data: {task: tomoto},
            //     success: () => {
            //
            //
            //     }
            // });
        },

        // 删除项目
        projectDelete(e) {
            let index = e.currentTarget.dataset.index;
            ajax.myRequest({
                url: '/planTask/deleteOne',
                data: {taskId: index},
                success: () => {
                    common.sout("删除成功");
                    getAllTask(this);
                }
            });
        },

        // 番茄时钟快速设置时长
        setTime(e) {
            this.setData({formMinute: e.currentTarget.dataset.min});
        },

        // 修改的番茄名称
        setProjectName(e) {
            this.setData({updateName: e.detail.value});
        },

        // 修改的番茄分钟
        setProjectMin(e) {
            let min = e.detail.value.replace(/\D/g,'');
            this.setData({updateMin: min});
        },

        // 快速修改的番茄分钟
        setProjectMinQuick(e) {
            this.setData({updateMin: e.currentTarget.dataset.min});
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

        // 新建番茄时校验是否为数字
        setAddProjectMin(e){
            let min = e.detail.value.replace(/\D/g,'');
            this.setData({formMinute: min});
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

        tomotoInput(e) {
            this.setData({formName: e.detail.value});
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
