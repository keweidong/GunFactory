/**
 * Created by cj on 2015/8/11.
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
// var _FORMAT_SEPARATOR = String.fromCharCode(0x1f);
// var _FORMAT_ARGS_PATTERN = new RegExp('^[^' + _FORMAT_SEPARATOR + ']*'
//     + new Array(100).join('(?:.([^' + _FORMAT_SEPARATOR + ']*))?'));
// String.prototype.format = function () {
//     return (_FORMAT_SEPARATOR +
//         Array.prototype.join.call(arguments, _FORMAT_SEPARATOR)).
//         replace(_FORMAT_ARGS_PATTERN, this);
// }
String.prototype.format = function () {
    const e = arguments;
    return !!this && this.replace(/\{(\d+)\}/g, function (t, r) {
        return e[r] ? e[r] : t;
    });
}
function InvalidCharacterError(message) {
    this.message = message;
}
InvalidCharacterError.prototype = new Error();
InvalidCharacterError.prototype.name = 'InvalidCharacterError';
class StringUtil {
    stringToHex(str) {
        var val = "";
        for (var i = 0; i < str.length; i++) {
            val += str.charCodeAt(i).toString(16);
            val += ",";
        }
        return val;
    }
    arrayBufferToHex(buf) {
        var val = "";
        var bytes = new Uint8Array(buf);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            val += bytes[i].toString(16);
            val += ",";
        }
        return val;
    }
    arrayBufferToString(buf): string {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }

    stringToArrayBuffer(str) {
        var bytes = this.stringToBytes(str);
        var bufView = new Uint8Array(bytes);
        return bufView.buffer;
    }

    arrayBufferTableConnect(bufTab) {
        var tlen = bufTab.length;
        var bufLen = 0;
        for (var i = 0; i < tlen; i++) {
            bufLen += bufTab[i].byteLength;
        }
        var buf = new ArrayBuffer(bufLen);
        var bufView = new Uint8Array(buf);
        bufLen = 0;
        for (var i = 0; i < tlen; i++) {
            var blen = bufTab[i].byteLength;
            var bufViewTmp = new Uint8Array(bufTab[i]);
            for (var j = 0; j < blen; j++) {
                bufView[bufLen] = bufViewTmp[j];
                bufLen++;
            }
        }
        return buf;
    }

    arrayBufferConnect(buf1, buf2) {
        var bufView1 = new Uint8Array(buf1);
        var bufView2 = new Uint8Array(buf2);
        var len1 = bufView1.byteLength;
        var len2 = bufView2.byteLength;
        var len = len1 + len2;
        var buf = new ArrayBuffer(len);
        var bufView = new Uint8Array(buf);
        for (var i = 0; i < len1; i++) {
            bufView[i] = bufView1[i];
        }
        for (var i = 0; i < len2; i++) {
            bufView[len1 + i] = bufView2[i];
        }
        return buf;
    }

    stringToBytes(str): number[] {
        //var st=[];
        //for (var i = 0; i < str.length; i++) {
        //    var ch = str.charCodeAt(i);  // get char
        //    st.push(ch & 0xFF);  // push byte to stack
        //}
        //return st;
        var ch, st, re = [];
        for (var i = 0; i < str.length; i++) {
            ch = str.charCodeAt(i);
            st = [];
            do {
                st.push(ch & 0xFF);
                ch = ch >> 8;
            } while (ch);
            re = re.concat(st.reverse());
        }
        return re;
    }

    bytesToString(bytes) {
        var len = bytes.byteLength;
        var st = "";
        for (var i = 0; i < len; i++) {
            st += String.fromCharCode(bytes[i] & 0xFF);
        }
        return st;
    }

    stringToInt(str) {
        var ret = 0;
        var len = Math.min(4, str.length);
        for (var i = 0; i < len; i++) {
            var ch = str.charCodeAt(i);
            ret += ch << (8 * (3 - i));
        }
        return ret;
    }
    intToString(i) {
        var ret = '';
        ret += String.fromCharCode((i >> 24) & 0xFF);
        ret += String.fromCharCode((i >> 16) & 0xFF);
        ret += String.fromCharCode((i >> 8) & 0xFF);
        ret += String.fromCharCode(i & 0xFF);
        return ret;
    }
    stringToShort(str) {
        var ret = 0;
        var len = Math.min(2, str.length);
        for (var i = 0; i < len; i++) {
            var ch = str.charCodeAt(i);
            ret += ch << (8 * (1 - i));
        }
        return ret;
    }
    shortToString(s) {
        var ret = '';
        ret += String.fromCharCode((s >> 8) & 0xFF);
        ret += String.fromCharCode(s & 0xFF);
        return ret;
    }
    stringToByte(str): any {
        var ret = 0;
        var len = Math.min(1, str.length);
        for (var i = 0; i < len; i++) {
            var ch = str.charCodeAt(i);
            ret += ch;
        }
        return ret;
    }
    byteToString(b) {
        return String.fromCharCode(b & 0xFF);
    }


    hex_string_to_buffer(str) {
        var bytes = [];
        // strip 0x prefix
        if (str.length >= 2 && str.substr(0, 2).toLowerCase() == "0x") {
            str = str.substr(2);
        }
        while (str.length > 0) {
            bytes.unshift(parseInt(str.slice(-2), 16));
            str = str.slice(0, -2);
        }
        return new Uint8Array(bytes).buffer;
    }

    buffer_hex_string(buffer) {
        var bytes = new Uint8Array(buffer);
        var l = [];
        for (var i = 0; i < bytes.length; i++) {
            var b = bytes[i];
            l.push((b < 0x10 ? "0" : "") + b.toString(16));
        }
        return l.join("");
    }

    buffPositive(buffer) {//????????????
        var bytes = new Uint8Array(buffer);
        var l = bytes.length;
        for (var i = 0; i < l; i++) {
            var v = Math.pow(2, 8) - 1 - bytes[i];
            if (i == l - 1)
                bytes[i] = v + 1;
            else
                bytes[i] = v;
        }
        return bytes.buffer;
    }

    buffer2int(buffer) {
        var bytes = new Uint8Array(buffer);
        var sign = 1;
        if (bytes.length > 0) {
            var binaryStr = bytes[0].toString(2);
            if (binaryStr.length < 8) {//?????????
                sign = 1
            } else {
                sign = -1;
            }
        }
        var l = [];
        if (sign == -1) {
            buffer = this.buffPositive(buffer);
        }
        for (var i = 0; i < bytes.length; i++) {
            var b = bytes[i];
            l.push((b < 0x10 ? "0" : "") + b.toString(16));
        }
        var hexStr = l.join("");
        return sign * parseInt(hexStr, 16);
    }

    buffer2uint(buffer) {
        var bytes = new Uint8Array(buffer);
        var l = [];
        for (var i = 0; i < bytes.length; i++) {
            var b = bytes[i];
            l.push((b < 0x10 ? "0" : "") + b.toString(16));
        }
        var hexStr = l.join("");
        return parseInt(hexStr, 16);
    }

    encodeUTF8(str) {
        var temp = "", rs = "";
        for (var i = 0, len = str.length; i < len; i++) {
            temp = str.charCodeAt(i).toString(16);
            rs += "\\u" + new Array(5 - temp.length).join("0") + temp;
        }
        return rs;
    }

    decodeUTF8(str) {
        return str.replace(/(\\u)(\w{4}|\w{2})/gi, function ($0, $1, $2) {
            return String.fromCharCode(parseInt($2, 16));
        });
    }

    //UTF-16???UTF-8
    utf16ToUtf8(s) {
        if (!s) {
            return;
        }

        var i, code, ret = [], len = s.length;
        for (i = 0; i < len; i++) {
            code = s.charCodeAt(i);
            if (code > 0x0 && code <= 0x7f) {
                //?????????
                //UTF-16 0000 - 007F
                //UTF-8  0xxxxxxx
                ret.push(s.charAt(i));
            } else if (code >= 0x80 && code <= 0x7ff) {
                //?????????
                //UTF-16 0080 - 07FF
                //UTF-8  110xxxxx 10xxxxxx
                ret.push(
                    //110xxxxx
                    String.fromCharCode(0xc0 | ((code >> 6) & 0x1f)),
                    //10xxxxxx
                    String.fromCharCode(0x80 | (code & 0x3f))
                );
            } else if (code >= 0x800 && code <= 0xffff) {
                //?????????
                //UTF-16 0800 - FFFF
                //UTF-8  1110xxxx 10xxxxxx 10xxxxxx
                ret.push(
                    //1110xxxx
                    String.fromCharCode(0xe0 | ((code >> 12) & 0xf)),
                    //10xxxxxx
                    String.fromCharCode(0x80 | ((code >> 6) & 0x3f)),
                    //10xxxxxx
                    String.fromCharCode(0x80 | (code & 0x3f))
                );
            }
        }

        return ret.join('');
    }

    //UTF-8???UTF-16
    utf8ToUtf16(s) {
        if (!s) {
            return;
        }

        var i, codes, bytes, ret = [], len = s.length;
        for (i = 0; i < len; i++) {
            codes = [];
            codes.push(s.charCodeAt(i));
            if (((codes[0] >> 7) & 0xff) == 0x0) {
                //?????????  0xxxxxxx
                ret.push(s.charAt(i));
            } else if (((codes[0] >> 5) & 0xff) == 0x6) {
                //?????????  110xxxxx 10xxxxxx
                codes.push(s.charCodeAt(++i));
                bytes = [];
                bytes.push(codes[0] & 0x1f);
                bytes.push(codes[1] & 0x3f);
                ret.push(String.fromCharCode((bytes[0] << 6) | bytes[1]));
            } else if (((codes[0] >> 4) & 0xff) == 0xe) {
                //?????????  1110xxxx 10xxxxxx 10xxxxxx
                codes.push(s.charCodeAt(++i));
                codes.push(s.charCodeAt(++i));
                bytes = [];
                bytes.push((codes[0] << 4) | ((codes[1] >> 2) & 0xf));
                bytes.push(((codes[1] & 0x3) << 6) | (codes[2] & 0x3f));
                ret.push(String.fromCharCode((bytes[0] << 8) | bytes[1]));
            }
        }
        return ret.join('');
    }

    arrayBufferToUtf16(s: ArrayBuffer) {
        return this.utf8ToUtf16(this.arrayBufferToString(s));

    }


    // encoder
    // [https://gist.github.com/999166] by [https://github.com/nignag]

    btoa(input) {
        var str = String(input);
        for (
            // initialize result and counter
            var block, charCode, idx = 0, map = chars, output = '';
            // if the next str index does not exist:
            //   change the mapping table to "="
            //   check if d has no fractional digits
            str.charAt(idx | 0) || (map = '=', idx % 1);
            // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = str.charCodeAt(idx += 3 / 4);
            if (charCode > 0xFF) {
                throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }
            block = block << 8 | charCode;
        }
        return output;
    }
    base64ToUint8(base64Str: string) {
        var bString = atob(base64Str);
        var len = bString.length;
        var arr = new Uint8Array(len);
        while (len--) {
            arr[len] = bString.charCodeAt(len);
        }
        return arr;
    }
    uint8ToBase64(bytes: Uint8Array) {
        var bString = "";
        for (var i = 0, len = bytes.length; i < len; ++i) {
            bString += String.fromCharCode(bytes[i]);
        }
        return btoa(bString);
    }
    // decoder
    // [https://gist.github.com/1020396] by [https://github.com/atk]
    // object.atob || (
    atob(input) {
        var str = (String(input)).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
        if (str.length % 4 === 1) {
            throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (
            // initialize result and counters
            var bc = 0, bs, buffer, idx = 0, output = '';
            // get next character
            buffer = str.charAt(idx++); // eslint-disable-line no-cond-assign
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                // and if not first of each 4 characters,
                // convert the first 8 bits to one ascii character
                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
        ) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    }

    arrayBufferToBytes(buffer) {
        return this.stringToBytes(this.arrayBufferToString(buffer));
    }

    strRepeat(str, num) {
        return new Array(num + 1).join(str);
    }

    public isBase64(str: string) {
        return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/.test(str);
    }
    /** ????????????????????????????????????  */
    public GetLength(str: string) {
        if (!str) return NaN;
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode > 0 && charCode <= 128) realLength += 1;
            else realLength += 2;
        }
        return realLength;
    }
    /**????????????????????????????????????????????????????????????????????????????????????????????? */
    public CutStr(str: string, len: number, endStr: string = "...") {
        if (!str) return null;
        var char_length = 0;
        //???????????????????????????????????????????????????,????????????????????????????????????,????????????????????????(????????????????????????????????????):
        if (this.GetLength(str) <= len) return str;
        for (var i = 0; i < str.length; i++) {
            var son_str = str.charCodeAt(i);
            (son_str > 0 && son_str <= 128) ? char_length += 1 : char_length += 2;
            if (char_length >= len) {
                return str.substr(0, i + 1) + endStr;
            }
        }

        //???????????????????????????
        return str;
    }

    checkIdcard(idcard) {
        var Errors = new Array(
            "????????????!",
            "???????????????????????????!",
            "????????????????????????????????????????????????????????????!",
            "???????????????????????????!",
            "?????????????????????!"
        );
        var area = { 11: "??????", 12: "??????", 13: "??????", 14: "??????", 15: "?????????", 21: "??????", 22: "??????", 23: "?????????", 31: "??????", 32: "??????", 33: "??????", 34: "??????", 35: "??????", 36: "??????", 37: "??????", 41: "??????", 42: "??????", 43: "??????", 44: "??????", 45: "??????", 46: "??????", 50: "??????", 51: "??????", 52: "??????", 53: "??????", 54: "??????", 61: "??????", 62: "??????", 63: "??????", 64: "??????", 65: "??????", 71: "??????", 81: "??????", 82: "??????", 91: "??????" }
        var idcard, Y, JYM;
        var S, M;
        var idcard_array = new Array();
        idcard_array = idcard.split("");
        //????????????
        if (area[parseInt(idcard.substr(0, 2))] == null) {
            return Errors[4];
        }
        //?????????????????????????????????
        switch (idcard.length) {
            case 15:
                {
                    if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                        var ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//??????????????????????????????
                    }
                    else {
                        var ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//??????????????????????????????
                    }
                    if (ereg.test(idcard)) {
                        return Errors[0];
                    }
                    else {
                        return Errors[2];
                    }
                }
                break;
            case 18:
                {
                    //18?????????????????????
                    //?????????????????????????????? 
                    //????????????:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
                    //????????????:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
                    if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                        var ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//?????????????????????????????????????????????
                    }
                    else {
                        var ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//?????????????????????????????????????????????
                    }
                    if (ereg.test(idcard)) {
                        //??????????????????????????????
                        //???????????????
                        S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
                            + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
                            + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
                            + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
                            + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
                            + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
                            + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
                            + parseInt(idcard_array[7]) * 1
                            + parseInt(idcard_array[8]) * 6
                            + parseInt(idcard_array[9]) * 3;
                        Y = S % 11;
                        M = "F";
                        JYM = "10X98765432";
                        M = JYM.substr(Y, 1);//???????????????
                        if (M == idcard_array[17]) {
                            return Errors[0]; //??????ID????????????
                        }
                        else {
                            return Errors[3];
                        }
                    }
                    else {
                        return Errors[2];
                    }
                }
                break;
            default:
                {
                    return Errors[1];
                }
                break;
        }
    }
}
window["StringUtil"] = StringUtil;