Page({
    data: {
        PageCur: 'report'
    },
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        })
    }
});
