const common = new function () {

    // const baseUrl = "https://igo12.top";  // 线上
    const baseUrl = "http://127.0.0.1:1901"; // 本地开发
    return {
        getUrl: {
            url: baseUrl
        },
        HEADER
    };
};

export default common;
export const HEADER = {'Content-Type': 'application/json'};

