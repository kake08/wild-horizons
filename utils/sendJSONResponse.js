export const sendJSONResponse = (res, statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json')

    // Change these when in Production - okay for development or if serving public api
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode= statusCode
    res.end(JSON.stringify(payload))
}