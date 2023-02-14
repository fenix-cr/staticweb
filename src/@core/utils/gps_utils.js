export const addAddressToList = function(address, coordinate, distanceFromStart, distanceBetwentPoints, listAddresses) {
    let data = {
        address: address,
        coordinates: coordinate,
        distanceFromStart: distanceFromStart,
        distanceBetwentPoints: distanceBetwentPoints
    }
    return listAddresses.push(data)
}