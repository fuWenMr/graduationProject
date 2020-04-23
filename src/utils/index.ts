/**
 * Created by hao.cheng on 2017/4/28.
 */
// 获取url的参数
export const queryString = () => {
    let _queryString: { [key: string]: any } = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [_queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};

/**
 * 校验是否登录
 * @param permits
 */
export const checkLogin = (permits: any): boolean =>
    (process.env.NODE_ENV === 'production' && !!permits) || process.env.NODE_ENV === 'development';

/**
 * 把formData转换为JSON
 */
export function formData2JSON(formData: FormData, extraData = {}) {
    let obj = {} as any;
    formData.forEach((value, key) => {
        obj[key] = value;
    });
    return JSON.stringify(Object.assign(obj, extraData));
}

/**
 * 从 form中取出JSON
 */
export function getJSONByForm(from: any, extraData?: any) {
    const formData = new FormData(from);
    return formData2JSON(formData, extraData);
}
