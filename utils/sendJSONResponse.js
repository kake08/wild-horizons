export const sendJSONResponse = (res, statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json')
    res.status= statusCode
    res.end(JSON.stringify(payload))
}