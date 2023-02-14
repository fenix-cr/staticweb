export const getFeeAdditionalStop = function (listAdditionalStops, totalPrice) {
    let res = 0
    totalPrice = totalPrice == undefined ? 0 : totalPrice
    try {
        if (totalPrice == 0 && listAdditionalStops.length == 0) {
            res = 0
        } else {
            res = (totalPrice / listAdditionalStops.length).toFixed(2)
        }
    } catch (err) {}

    return res
}

export const getFeeWaitingTime = function (waitingTime, totalPrice) {
    let res = 0
    totalPrice = totalPrice == undefined ? 0 : totalPrice
    waitingTime = waitingTime == undefined ? 0 : waitingTime
    try {
        if (totalPrice == 0 && waitingTime == 0) {
            res = 0
        } else {
            res = (totalPrice / waitingTime).toFixed(2)
        }
    } catch (err) {}

    return res
}