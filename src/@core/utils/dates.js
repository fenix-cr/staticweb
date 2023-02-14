import moment from "moment"


export const convertToMMDDYYYY = function (data) {
    let res = data

    try {
        if (data != null || data != undefined) {
            res = moment(data).format('MM-DD-YYYY');
        }
    } catch (err) {
        console.log(err)
    }

    return res
}

export const convertToHHMM = function (data) {
    let res = data

    try {
        if (data != null || data != undefined) {
            res = moment(data).format('HH:mm');
        }
    } catch (err) {
        console.log(err)
    }

    return res
}

export const convertToMMDDYYYYHHmm = function (data) {
    let res = data

    try {
        if (data != null || data != undefined) {
            res = moment(data).format('MM-DD-YYYY HH:mm');
        }
    } catch (err) {
        console.log(err)
    }

    return res
}