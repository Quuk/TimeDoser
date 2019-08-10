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
        }
    };
};
export default common;

// 获取全局信息
function getToken() {
    let baseUser = wx.getStorageSync("baseUser");
    return baseUser == null ? null : baseUser.token;
}
