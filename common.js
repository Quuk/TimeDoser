const common = new function () {

    // const baseUrl = "http://47.107.52.39:1901";  // 本地开发
    const baseUrl = "http://127.0.0.1:1901";
    return {
        getUrl: {
            url: baseUrl
        },
        HEADER
    };
};

export default common;
export const HEADER = {'Content-Type': 'application/json'};

