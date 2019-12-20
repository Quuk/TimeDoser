import common from "../../common";

const app = getApp();


Page({});

Component({
    data: {
        dayCount: 0,
        weekCount: 0,
        allCount: 0
    },
    created() {
        // follow the page to load base data
        loadBaseData(this);
    }
});

// load base data
function loadBaseData(that) {
    wx.request({
        url: `${common.URL}/report/pageData`,
        header: {'X_Auth_Token': app.globalData.token},
        success: data => {
            if (data.statusCode === 200 && data.data.code === 200) {
                that.setData({pageData: data.data.data});
                // 数字增长效果
                addNum(that, data.data.data);
            }
        },
    });
}

// 数字增长效果
function addNum(that, data) {
    setTime(that, 0, data.dayCount, data.weekCount, data.allCount);
}

// 递增
function setTime(that, num, day, week, all) {
    that.setData({
        dayCount: day === undefined || day < 10 ? 0 : num,
        weekCount: week === undefined || week < 10 ? 0 : num,
        allCount: all === undefined || all < 10 ? 0 : num
    });
    num++;
    if (num <= 25) {
        setTimeout(function () {
            setTime(that, num, day, week, all);
        }, 20);
    } else {
        setTimeEnd(that, day, week, all);
    }
}

// 截止
function setTimeEnd(that, day, week, all) {
    that.setData({
        dayCount: day === undefined ? 0 : day,
        weekCount: week === undefined ? 0 : week,
        allCount: all === undefined ? 0 : all
    });
}
