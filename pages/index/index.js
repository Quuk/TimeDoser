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
        formMinute: 25,     // 页面默认25分钟
        formIcon: null,     // 新建项目的icon

        allTask: wx.getStorageSync("allTask"),
        checkProject: false,       // 是否点击项目
        createProject: false,      // 创建项目窗口
        nowUpdataProjectId: null,  // 现在修改的项目ID

        icon: [], // logo list
        updateName: null,     // 修改后的名称
        updateMin: null,      // 修改后的分钟
    },
    created: function () {
        getAllTask(this);
        setDefaultData(this);
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
                formIcon: null,
            })
        },

        // 修改一个任务
        updateOne(e) {
            const tomoto = e.currentTarget.dataset.tomoto;
            tomoto.name = this.data.updateName !== null ? this.data.updateName : tomoto.name;
            tomoto.tomatoWorkTime = this.data.updateMin !== null ? this.data.updateMin : tomoto.tomatoWorkTime;
            tomoto.icon = this.data.formIcon !== null ? this.data.formIcon : tomoto.icon;

            ajax.myRequest({
                url: '/planTask/updateTask',
                data: {
                    id: tomoto.id,
                    name: tomoto.name,
                    icon: tomoto.icon,
                    tomatoWorkTime: tomoto.tomatoWorkTime,
                },
                success: () => {
                    getAllTask(this);
                },
                complete: () => {
                    this.updateOneClose(e);
                }
            });
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
            let min = e.detail.value.replace(/\D/g, '');
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
        },

        toHomePage() {
            wx.navigateTo({
                url: "/pages/my/home/home"
            });
        },

        // 新建番茄时校验是否为数字
        setAddProjectMin(e) {
            let min = e.detail.value.replace(/\D/g, '');
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

            // 随机给一个logo
            this.randomIcon();
        },

        createOneClose() {
            this.setData({
                createProject: false,
                formIcon: null,
            });
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
            let formIcon = this.data.formIcon;

            if (min === "0") {
                common.sout("时间不可设置为0");
                return;
            }

            ajax.myRequest({
                url: '/planTask/addOne',
                data: {
                    name: name || "默认番茄",
                    minute: parseInt(min),
                    icon: formIcon || "add",
                },
                success: () => {
                    common.sout("添加成功");
                    getAllTask(this);

                    // 清空表格数据
                    this.setData({
                        formName: '',
                        formIcon: '',
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

        // random icon
        randomIcon() {
            const iconList = this.data.icon;
            const iconIndex = parseInt(Math.random() * iconList.length);
            const icon = iconList[iconIndex].icon;
            this.setData({formIcon: icon});

            this.animate('#am-project-create-icon', [
                {scale: [1.1, 1.1], opacity: 0},
                {scale: [1, 1], opacity: 1},
            ], 100);
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

function setDefaultData(that) {
    that.setData({
        icon: [
            {index: 0, icon: 'appreciate'},
            {index: 1, icon: 'emoji'},
            {index: 2, icon: 'favor'},
            {index: 3, icon: 'loading'},
            {index: 4, icon: 'roundcheck'},
            {index: 5, icon: 'search'},
            {index: 6, icon: 'time'},
            {index: 7, icon: 'warn'},
            {index: 8, icon: 'camera'},
            {index: 9, icon: 'like'},
            {index: 10, icon: 'deliver'},
            {index: 11, icon: 'evaluate'},
            {index: 12, icon: 'send'},
            {index: 13, icon: 'shop'},
            {index: 14, icon: 'ticket'},
            {index: 15, icon: 'discover'},
            {index: 16, icon: 'footprint'},
            {index: 17, icon: 'cart'},
            {index: 18, icon: 'remind'},
            {index: 19, icon: 'lock'},
            {index: 20, icon: 'goods'},
            {index: 21, icon: 'selection'},
            {index: 22, icon: 'explore'},
            {index: 23, icon: 'present'},
            {index: 24, icon: 'round'},
            {index: 25, icon: 'game'},
            {index: 26, icon: 'vipcard'},
            {index: 27, icon: 'light'},
            {index: 28, icon: 'notice'},
            {index: 29, icon: 'upstage'},
            {index: 30, icon: 'baby'},
            {index: 31, icon: 'clothes'},
            {index: 32, icon: 'creative'},
            {index: 33, icon: 'female'},
            {index: 34, icon: 'male'},
            {index: 35, icon: 'rank'},
            {index: 36, icon: 'bad'},
            {index: 37, icon: 'cameraadd'},
            {index: 38, icon: 'focus'},
            {index: 39, icon: 'file'},
            {index: 40, icon: 'attention'},
            {index: 41, icon: 'read'},
            {index: 42, icon: 'magic'},
            {index: 43, icon: 'tag'},
            {index: 44, icon: 'all'},
            {index: 45, icon: 'write'},
            {index: 46, icon: 'crown'},
            {index: 47, icon: 'musicfill'},
            {index: 48, icon: 'record'},
            {index: 49, icon: 'cardboard'},
            {index: 50, icon: 'mail'},
            {index: 51, icon: 'goodsnew'},
            {index: 52, icon: 'medal'},
            {index: 53, icon: 'newshot'},
            {index: 54, icon: 'news'},
            {index: 55, icon: 'skin'},
            {index: 56, icon: 'usefull'}
        ]
    })
}
