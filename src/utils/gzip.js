import atob from 'atob'
import btoa from 'btoa'
const pako = require('../../node_modules/pako/dist/pako.min')
/**
 * gzip加密
 * @param str
 * @returns {*}
 */
const gzipEncode = (str) => {
    try {
        return btoa(pako.gzip(escape(str), {to: 'string'}));
    } catch (e) {
        return 'Error: 当前字符串不能被Gzip加密';
    }
};

/**
 * gzip解密
 * @param str
 * @returns {string}
 */
const gzipDecode = (str) => {
    try {
        let charData = atob(str)
            .split('')
            .map((x) => x.charCodeAt(0));
        let data = pako.inflate(new Uint8Array(charData));
        let result = String.fromCharCode.apply(null, new Uint16Array(data));
        try {
            return unescape(result);
        } catch (ee) {
            return result;
        }
    } catch (e) {
        throw new Error('Error: 当前字符串不能被Gzip解密');
    }
};

export default {
    gzipEncode,
    gzipDecode,
};
