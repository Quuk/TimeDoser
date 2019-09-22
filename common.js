// const baseUrl = "http://127.0.0.1:1901";  // 本地开发
const baseUrl = "https://igo12.top";  // 线上开发

const common = new function () {
    return {
        URL: baseUrl,
        HEADER_NOTOKEN: {
            'content-type': 'application/x-www-form-urlencoded',
        },
        sout(msg) {
            wx.showToast({
                title: msg,
                icon: "none",
                mask: true,
                duration: 100
            })
        }
    };
};
export default common;