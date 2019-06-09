Page({
    data: {
        parentAttr: null,
    },
    onLoad() {
        this.parentAttr = "dsfsd";
        // const endDate =new Date();
        // endDate.setHours(2);
        // this.timerige(endDate)
    },
    toSetting() {
        wx.navigateTo({
            url: '/pages/settings/settings'
        })
    }
});