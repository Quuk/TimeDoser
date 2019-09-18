Page({
    data: {
        PageCur: 'report'  // report todoList class my
    },
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        })
    }
});
