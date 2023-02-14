export const toFixed = function(data, numFixed) {
    let res = data

    try {
        res = data.toFixed(numFixed)
    } catch (err) {}
    return res
}