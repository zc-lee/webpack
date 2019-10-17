class countDown {
    constructor({
        interval = 1000,
        showDays = false,
        startCallBack = null,
        stepCallBack = null,
        endCallBack = null
    }) {
        this.timer = null;
        // 传入参数
        this.interval = interval;
        this.showDays = showDays;

        // 计算参数
        this.elements = []; // 存放计算元素

        // 回调函数
        this.startCallBack = startCallBack;
        this.stepCallBack = stepCallBack;
        this.endCallBack = endCallBack;
    }

    /**
     * @method
     * @description 开始计时
     */
    start() {
        // 开始定时器
        this._createTimer();
        // 开始回调函数
        if (this.startCallBack != null) {
            this.startCallBack();
        }
    }
    /**
     * @method
     * @description 插入计算
     */
    push({
        id = this.elements.length,
        startTime = new Date().getTime(),
        endTime = this.requiredParam('endTime')
    }) {
        let leftTime = this._getLeftTime(startTime, endTime);
        this.elements[`${id}`] = {
            id: id,
            startTime: startTime,
            endTime: endTime,
            leftTime: leftTime,
            format: this._formatLeftTime(leftTime)
        }
        // console.log(this.elements[`${id}`])
        // console.log(this.elements)
        this._watchCreate();
    }
    /**
     * @method
     * @description 结束计时
     */
    end() {
        this._clearTimer();
        if (this.endCallBack != null) {
            this.endCallBack();
        }
    }
    /**
     * @method
     * @description 监听创建定时器
     */
    _watchCreate() {
        // 定时器存在，退出监听
        if (this.timer != null) {
            return false;
        }
        // 存在需要计时元素，开始计时
        for (var key in this.elements) {
            if (this.elements[key].leftTime > 0) {
                this.start();
                return true;
            }
        }
        // 否则退出
        return false;
    }
    /**
     * @method
     * @description 监听清除定时器
     */
    _watchClear() {
        // 无定时器，退出
        if (this.timer == null) {
            return false;
        }
        // 存在需要计时元素，退出
        for (var key in this.elements) {
            if (this.elements[key].leftTime > 0) {
                return false;
            }
        }
        // 否则，结束计时
        this.end();
        return true;
    }
    /**
     * @method
     * @description 监听存在结束的计时
     */
    _watchOneEnd() {
        for (var key in this.elements) {
            if (this.elements[key].leftTime == 0) {
                return true;
            }
        }
        return false;
    }
    /**
     * @method
     * @description 创建定时器
     */
    _createTimer() {
        this._clearTimer();
        this.timer = setInterval(_ => {
            this._step();
        }, this.interval)
    }
    /**
     * @method
     * @description 清除定时器
     */
    _clearTimer() {
        if (this.timer != null) {
            clearInterval(this.timer)
            this.timer = null;
        }
    }
    /**
     * @method
     * @description 获取剩余时间
     */
    _getLeftTime(startTime, endTime) {
        return endTime - startTime > 0 ? endTime - startTime : 0
    }
    /**
     * @method
     * @description 计算剩余时间
     */
    _calculate() {
        for (var key in this.elements) {
            if (this.elements[key].leftTime > 0) {
                // console.log(this.elements[key].leftTime)
                this.elements[key].leftTime -= this.interval;
                this.elements[key].leftTime > 0 ? '' : this.elements[key].leftTime = 0;
                this.elements[key].format = this._formatLeftTime(this.elements[key].leftTime)
                // console.log(this.elements[key].leftTime)
            }
        }
    }
    /**
     * @method
     * @description 每步操作
     */
    _step() {
        this._calculate();
        // console.log(this.elements)
        // return;
        if (this._watchOneEnd()) {
            if (!this._watchClear()) {
                if (this.endCallBack != null) {
                    this.endCallBack();
                }
            }
        } else {
            if (this.stepCallBack != null) {
                this.stepCallBack()
            }
        }
    }

    /**
     * @method
     * @description 格式化剩余时间
     */
    _formatLeftTime(lefttime) {
        let [D, H, M, S, MS] = Array(5).fill(0);
        D = Math.floor(lefttime / (1000 * 60 * 60 * 24));
        if (this.showDays) {
            H = Math.floor(lefttime / 1000 / 60 / 60 % 24);
        } else {
            H = Math.floor(lefttime / 1000 / 60 / 60);
        }
        H=this._formatLessTen(H)
        M = this._formatLessTen(Math.floor(lefttime / 1000 / 60 % 60));
        S = this._formatLessTen(Math.floor(lefttime / 1000 % 60));
        MS = this._formatMs(Math.floor(lefttime % 1000));
        return [D, H, M, S, MS];
        /**
         * notice
         * bug
         * console.log((1/1000/60/60/24))    1.1574074074074076e-8
         * console.log(parseInt(1/1000/60/60/24))  1
         * console.log(parseInt(1/1000/60/60))   2
         * 小数指数形式取整>0
         * 解决 Math.floor 替换 parseInt
         */
    }
    _formatLessTen(i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i;
    }
    _formatMs(i) {
        if (i < 10) {
            i = '00' + i;
            return i;
        };
        if (i < 100) {
            i = '0' + i;
            return i;
        };
        return i;
    }
    /**
     * @method
     * @description 必填参数
     * @param {String} name 
     */
    requiredParam(name) {
        if (Object.prototype.toString.call(name) == `[object Undefined]`) {
            this.throwErrow('Missing param!!!')
        } else {
            this.throwErrow(`${name} is required!!!`)
        }
    }

    /**
     * @method
     * @description 错误抛出
     * @param {String} err 
     */
    throwErrow(err) {
        if (Object.prototype.toString.call(err) == `[object String]`) {
            throw new Error(err)
        } else {
            throw new Error('err type must be String!!!')
        }
    }
}

export default countDown;