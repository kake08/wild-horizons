export function filterData (req, destinations) {
    const [, locationType, locationName] = req.url.split('/').filter(Boolean) //return only truey values, 
    return destinations.filter(destination => {
        return destination[locationType]?.toLowerCase() === locationName?.toLowerCase()
        //return only if country or continent matches passed locationName
    })
}

// const { pathname } = new URL(req.url, `http://${req.headers.host}`);
// const [, locationType, locationName] = pathName.split('/').filter(Boolean)