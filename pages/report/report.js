import common from "../../common";

const app = getApp();


Page({});

Component({
    created() {

        // follow the page to load base data
        loadBaseData(this);
        console.log("show time")
    }
});


// load base data
function loadBaseData(that) {
    wx.request({
        url: `${common.URL}/planTaskHistory/findAll`,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'X_Auth_Token': app.globalData.token
        },
        success: data => {
            if (data.statusCode === 200 && data.data.code === '000') {
                that.setData({
                    planHistory: data.data.data
                });
                console.log(data.data)
            }
        },
    });
}