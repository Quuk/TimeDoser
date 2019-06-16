Page({
    data: {
        timeDisable: false,
        second: 59,
        minute: 24
    },
    onLoad() {
    },
    toSetting() {
        wx.navigateTo({
            url: '/pages/settings/settings'
        })
    },
    setTime() {
        this.setData({
            timeDisable: true,
        });
        clear(this);
        setTime(this);
    },
    stop() {
        this.setData({
            timeDisable: false,
        });
        clear(this);
    }
});

function clear(that) {
    that.setData({
        second: 59,
        minute: 24
    });
}

function setTime(that) {
    let second = that.data.second;
    let minute = that.data.minute;

    if (!that.data.timeDisable) return;

    if (second === 0) {
        if (minute === 0) {
            that.setData({
                timeDisable: false,
            });
            return;
        } else {
            second = 59;
            minute = minute - 1;

            // 延时1s 分钟变化
            setTimeout(function () {
                that.setData({
                    minute: minute,
                });
            }, 1000);
        }
    }

    // -1s 递归
    setTimeout(function () {
        that.setData({
            second: second - 1,
        });
        setTime(that);
    }, 1000);
}