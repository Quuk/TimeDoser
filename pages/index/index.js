Page({
    data: {
        PageCur: 'todoList'
    },
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        })
    }
});
