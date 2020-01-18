const app = getApp();

Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        windowHeight: wx.getSystemInfoSync().windowHeight,
        baseUser: wx.getStorageSync("baseUser"),
        hasWork: false,        // 是否处于工作状态
        changedue: false,      // 是否除于动画过程
        checkProject: false,   // 是否点击项目
        createProject: false,  // 创建项目窗口
        timeList: [{
            title: '15',
            name: 'orange',
            color: '#f37b1d'
        }, {
            title: '25',
            name: 'yellow',
            color: '#fbbd08'
        }, {
            title: '45',
            name: 'olive',
            color: '#8dc63f'
        }, {
            title: '60',
            name: 'green',
            color: '#39b54a'
        }, {
            title: '90',
            name: 'cyan',
            color: '#1cbbb4'
        }, {
            title: '120',
            name: 'blue',
            color: '#0081ff'
        }],
        color1: [
            {inex: 0, color: 'red'},
            {inex: 1, color: 'orange'},
            {inex: 2, color: 'yellow'},
            {inex: 3, color: 'olive'},
            {inex: 4, color: 'green'},
            {inex: 5, color: 'cyan'},
            {inex: 6, color: 'blue'},
            {inex: 7, color: 'purple'},
            {inex: 8, color: 'mauve'},
            {inex: 9, color: 'pink'},
            {inex: 10, color: 'brown'},
            {inex: 11, color: 'black'},
            {inex: 12, color: 'darkGray'},
            {inex: 13, color: 'ghostWhite'},
        ],
        color2: [
            {index: 0, color: 'redLight'},
            {index: 1, color: 'orangeLight'},
            {index: 2, color: 'yellowLight'},
            {index: 3, color: 'oliveLight'},
            {index: 4, color: 'greenLight'},
            {index: 5, color: 'cyanLight'},
            {index: 6, color: 'blueLight'},
            {index: 7, color: 'purpleLight'},
            {index: 8, color: 'mauveLight'},
            {index: 9, color: 'pinkLight'},
            {index: 10, color: 'brownLight'},
            {index: 11, color: 'greyLight'},
        ],
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
            {index: 56, icon: 'usefull'},
        ],
        newProjectInfo: {
            name: '',
            remark: '',
            icon: '',
            color: ''
        }
    },
    onReady() {
        // 设置初始透明度
        setRemarkOpecity(this);
    },

    // 开始计时了
    startTime() {
        if (!this.data.changedue) {
            this.setData({hasWork: true, changedue: true});
            startTime(this) // 字体变化
        }
    },

    // 结束计时
    endTime() {
        if (!this.data.changedue) {
            this.setData({hasWork: false, changedue: true});
            endTime(this)   // 字体变化
        }
    },

    showModal(e) {
        if (!this.data.hasWork) {
            this.setData({modalName: e.currentTarget.dataset.target})
        }
    },

    hideModal() {
        this.setData({modalName: null})
    },

    // 新建一个项目
    createOneOpen() {

        const iconList = this.data.icon;
        const iconIndex = parseInt(Math.random() * iconList.length);
        const icon = iconList[iconIndex].icon;

        const colorList = this.data.color1;
        const colorIndex = parseInt(Math.random() * colorList.length);
        const color = colorList[colorIndex].color;

        console.log(this.data.newProjectInfo)
        this.setData({
            newProjectInfo: {
                icon: icon,
                color: color
            },
            createProject: true
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
    create(e) {
        console.log(this.data.newProjectInfo)
    },
    setProjectRemark(e) {
        this.data.newProjectInfo.remark = e.detail.value;
    },
    setProjectName(e) {
        this.data.newProjectInfo.name = e.detail.value;
    },

    // 进入设置页面
    toSetting() {
        this.setData({modalName: 'setting'});
    }
});

function setRemarkOpecity(that) {
    // 设置初始透明度
    that.animate('#am-home-remark-end', [
        {opacity: 1},
    ], 1);
}

/**
 * 计时字体变化(开始)
 * 1.颜色变深
 * 2.字体变大
 */
function startTime(that) {

    // 1.计时字体变化
    that.animate('#am-home-date', [
        {scale: [1, 1], opacity: 0.5},
        {scale: [1.2, 1.2], opacity: 0.8},
    ], 300);

    // 2.计时备注变化1
    that.animate('#am-home-remark', [
        {translate: [0, 0], opacity: 0, scale: [1, 1]},
        {translate: [-5, 12], opacity: 1, scale: [0.9, 0.9]},
    ], 300);

    // 3.标签变化
    that.animate('#am-home-tag', [
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
        {translate: [12, 12], opacity: 0.3, scale: [0.8, 0.8]},
    ], 300);

    // 4.计时备注变化2
    that.animate('#am-home-remark-end', [
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
        {translate: [-5, 12], opacity: 0, scale: [0.9, 0.9]},
    ], 300);

    // 5.开始按钮变化
    that.animate('#am-home-start-icon', [
        {scale: [1.5, 1.5], opacity: 0},
        {scale: [1, 1], opacity: 1},
    ], 300, function () {
        that.setData({changedue: false});
    });
}

/**
 * 计时字体变化(结束)
 * 和开始相反
 */
function endTime(that) {
    that.animate('#am-home-date', [
        {scale: [1.2, 1.2], opacity: 0.8},
        {scale: [1, 1], opacity: 0.5},
    ], 300);
    that.animate('#am-home-remark', [
        {opacity: 1, scale: [0.9, 0.9]},
        {opacity: 0, scale: [1, 1]},
    ], 300);
    that.animate('#am-home-tag', [
        {translate: [12, 12], opacity: 0.3, scale: [0.8, 0.8]},
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
    ], 300);
    that.animate('#am-home-remark-end', [
        {translate: [-5, 12], opacity: 0, scale: [0.9, 0.9]},
        {translate: [0, 0], opacity: 1, scale: [1, 1]},
    ], 300);
    that.animate('#am-home-start-icon', [
        {scale: [1.5, 1.5], opacity: 0},
        {scale: [1, 1], opacity: 1},
    ], 300, function () {
        that.setData({changedue: false});
    });
}
