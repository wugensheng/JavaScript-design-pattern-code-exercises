const timers = require('timers')

var throttle = function (fn, interval) {
    var __self = fn,
        timer,
        firstTime = true

    return function () {
        var args = arguments,
            __me = this

        if (firstTime) { // 第一次调用
            __self.apply(__me, args)
            return firstTime = false
        }

        if (timer) { // 有定时器，说明前一次延迟还没有执行完成
            return false
        }

        timer = timers.setTimeout(() => {
            timers.clearTimeout(timer)
            timer = null
            __self.apply(__me, args)
        }, interval || 500);
    }
}

timers.setInterval(() => {
    throttle(function () {
        console.log('1')
    }, 500)
}, 400)

