Page({
    data: {
        PageCur: 'todoList'  // report todoList class my
    },
    NavChange(e) {
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        })
    }
});
