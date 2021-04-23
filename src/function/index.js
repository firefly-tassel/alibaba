export function deepClone(obj = {}) {
    // 过滤特殊情况
    if (typeof obj !== 'object' || obj === null) {
        // obj 是 null 或者不是对象和数组，直接返回
        return obj;
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
  
    let res;
    res = Array.isArray(obj) ? [] : {};
  
    for (let key in obj) {
        // 判断自身中是否包含自身属性
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key])
        }
    }
    return res;
}