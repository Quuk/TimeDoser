Page({
    data: {
        PageCur: 'timeDoser'
    },
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        })
    }
});
