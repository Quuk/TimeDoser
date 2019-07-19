Page({
    data: {
        PageCur: 'my'
    },
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        })
    }
});
