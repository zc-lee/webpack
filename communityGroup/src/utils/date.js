class date {
    constructor(ms) {
        // console.warn(this)
        this.ms = ms || new Date();
    }

    /**
     * @method
     * @description 测试时间参数
     * @param {} ms 
     */
    GMTTest(ms) {
            ms  = ms || this.ms;
        let GMT = new Date(this.iosFormat(ms))
        if (GMT == 'Invalid Date') {
            throw new Error(GMT)
        } else {
            return GMT;
        }
    }

    /**
     * @method
     * @description 获取年
     * @param {*} ms 
     */
    getY(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            y   = GMT.getFullYear();
        return y;
    }

    /**
     * @method
     * @description 获取月
     * @param {*} ms 
     */
    getM(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            m   = GMT.getMonth() + 1;
        return this.formatLength(m);
    }

    /**
     * @method
     * @description 获取日
     * @param {*} ms 
     */
    getD(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            d   = GMT.getDate();
        return this.formatLength(d);
    }

    /**
     * @method
     * @description 获取时
     * @param {*} ms 
     */
    getH(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            H   = GMT.getHours();
        return this.formatLength(H);
    }

    /**
     * @method
     * @description 获取时
     * @param {*} ms 
     */
    getMin(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            M   = GMT.getMinutes();
        return this.formatLength(M);
    }

    /**
     * @method
     * @description 获取时
     * @param {*} ms 
     */
    getS(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            S   = GMT.getSeconds();
        return this.formatLength(S);
    }

    /**
     * @method
     * @description 获取年/月/日
     * @param {} ms 
     */
    getYMD(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            y   = GMT.getFullYear(),
            m   = GMT.getMonth() + 1,
            d   = GMT.getDate();
        // return y+'-'+m+'-'+d; // 苹果不识别'-'
        return [y, m, d].map(this.formatLength).join('/')
    }

    /**
     * @method
     * @description 获取年/月/日
     * @param {} ms 
     */
    getYMDs(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            y   = GMT.getFullYear(),
            m   = GMT.getMonth() + 1,
            d   = GMT.getDate();
        // return y+'-'+m+'-'+d; // 苹果不识别'-'
        return [y, m, d].map(this.formatLength).join('-')
    }

    /**
     * @method
     * @description 获取时: 分: 秒
     * @param {} ms 
     */
    getHMS(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            h   = GMT.getHours(),
            m   = GMT.getMinutes(),
            s   = GMT.getSeconds();
        // return h+'-'+m+'-'+s; // 苹果不识别'-'
        return [h, m, s].map(this.formatLength).join(':')
    }
    /**
     * @method
     * @description 获取年/月/日 时: 分: 秒
     * @param {} ms 
     */
    getYMDHMS(ms) {
        ms = ms || this.ms;
        return this.getYMD(ms) + ' ' + this.getHMS(ms);
    }

    /**
     * @method
     * @description 获取年-月-日 时: 分: 秒
     * @param {} ms 
     */
    getYMDHMSs(ms) {
        ms = ms || this.ms;
        return this.getYMDs(ms) + ' ' + this.getHMS(ms);
    }

    getObj(ms) {
            ms  = ms || this.ms;
        let GMT = this.GMTTest(ms),
            Y   = GMT.getFullYear(),
            M   = GMT.getMonth() + 1,
            D   = GMT.getDate(),
            h   = GMT.getHours(),
            m   = GMT.getMinutes(),
            s   = GMT.getSeconds();
        return [Y, M, D, h, m, s].map(this.formatLength);
    }
    /**
     * @method
     * @description 格式化单位长度
     * @param {} ms 
     */
    formatLength(ms) {
        // ms=ms||this.ms;
        // console.log(ms)
        return String(ms)[1] ? ms: '0' + ms;
    }
    /**
     * @method
     * @description 苹果兼容
     * @param {String} str 
     */
    iosFormat(str){
        if(String(str).match(/-/)){
            str = String(str).replace(/-/g, '/')
        }
        return str;
    }
}

export default new date();