export const getItemWaitingTime = function(list) {
    if (list.length == 0)
        return 0
    let res = list.find(element => JSON.parse(element.service.toLowerCase().includes('wait')));
    if (res == undefined)
        return 0

    return res
}

export const getItemsAdditionalStops = function(list) {

    let res = list.filter(element => JSON.parse(element.service.toLowerCase().includes('stop')))

    if (res == undefined)
        return 0

    return res
}