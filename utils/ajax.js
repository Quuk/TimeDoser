import common from "../common";

const app = getApp();

// 获取accessToken
function getAccessToken(callback) {
    let baseUserInfo = wx.getStorageSync('baseUserInfo');
    if (baseUserInfo) {
        callback(baseUserInfo);
    } else {
        wx.login({
            success: data => {
                wx.request({
                    url: `${common.URL}/login/getBaseInfo`,
                    header: common.HEADER_NOTOKEN,
                    data: {appCode: data.code},
                    method: "POST",
                    success: data => {
                        if (data.statusCode === 200 && data.data.code === 200) {
                            let baseUserInfo = data.data.data;
                            wx.setStorageSync('baseUserInfo', baseUserInfo);
                            if (typeof (callback) === 'function' && baseUserInfo) {
                                callback(baseUserInfo);
                            }
                        }
                    }
                });
            }
        });
    }
}

// 封装request请求
const myRequest = options => {
    if (options) {
        getAccessToken(function () {
            if (options.header === undefined || options.header === null) {
                options.header = {};
            }
            options.header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            // usertoken在登录后保存在缓存中，所以从缓存中取出，放在header
            let baseUserInfo = wx.getStorageSync('baseUserInfo');
            if (baseUserInfo) {
                options.header['X_Auth_Token'] = baseUserInfo.token;
            }

            //url
            let baseUrl = common.URL;
            if (options.url.indexOf('http') !== 0) {
                options.url = baseUrl + options.url;
            }
            // method、data
            if (options.method === undefined || options.method === null) {
                options.method = 'post';
            }
            // if (options.method.toLowerCase() === 'post') {
            //     if (options.data) {
            //         options.data = JSON.stringify(options.data);
            //         console.log(options.data)
            //     }
            // }

            //success
            if (options.success && typeof (options.success) === 'function') {
                let successCallback = options.success;
                options.success = function (res) {
                    if (res.statusCode === 200) {
                        try {
                            if (parseInt(res.data.code) === 400) {
                                console.error('请重新登录');
                            } else if (parseInt(res.data.code) === 300) {
                                console.error(res.data.msg);
                            }
                            //调用自定义的success
                            successCallback(res.data);
                        } catch (e) {
                            console.error('出错了，' + e + ',接口返回数据:' + res.data);
                        }
                    } else if (res.statusCode === 404) {
                        console.log('404');
                    }
                }
            }
            //执行微信的请求
            wx.request(options);
        });
    }
};


module.exports = {
    myRequest: myRequest
};
