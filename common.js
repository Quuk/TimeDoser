const baseUrl = "http://127.0.0.1:1901";  // 本地开发
// const baseUrl = "https://igo12.top";  // 线上开发

const common = new function () {
    return {
        URL: baseUrl,
        HEADER: {
            'Content-Type': 'application/json',
            'X_Auth_Token': getToken()
        },
        HEADER_NOTOKEN: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        sout(msg) {
            wx.showToast({
                title: msg,
                icon: "none",
                mask: true
            })
        }
    };
};
export default common;

// 获取全局信息
function getToken() {
    let baseUser = wx.getStorageSync("baseUser");
    if (baseUser === "") {
        // 登录接口
        wx.login({
            success: data => {
                console.log("强制登录.....");
                wx.request({
                    url: `${common.URL}/login/getBaseInfo`,
                    header: common.HEADER_NOTOKEN,
                    data: {appCode: data.code},
                    method: "POST",
                    success: data => {
                        if (data.statusCode === 200 && data.data.code === '000') {
                            console.log("强制获取token:" + data.data.data.token);
                            return data.data.data.token;
                        }
                    }
                });
            }
        });
    } else {
        return baseUser.token;
    }
}