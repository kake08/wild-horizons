import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { filterData } from './utils/filterData.js'
 
const PORT = 8000

const server = http.createServer(async (req, res) => {

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    console.log(urlObj)


    const destinations = await getDataFromDB()

  if (urlObj.pathname === '/api' && req.method === 'GET') {
    
    if (urlObj.search != '') {
        //NEED TO FILTER DATA IF ' urlObj.search: ?key=value ' exists
        const queryObj =  Object.fromEntries(urlObj.searchParams)
        console.log(queryObj['country'])  
    } else {
        let filteredData = destinations
    }
    sendJSONResponse(res, 200, filteredData)
  } 
  else if (req.url.startsWith('/api/continent') && req.method === 'GET') {

    const filteredData = filterData(req, destinations)
    sendJSONResponse(res, 200, filteredData)
  } 
  else if (req.url.startsWith('/api/country') && req.method==='GET') {
    const filteredData = filterData(req, destinations)
    sendJSONResponse(res, 200, filteredData)
  }
  else {
    const errorResponse = {error: "not found", message: "The requested route does not exist"}
    sendJSONResponse(res, 404, errorResponse)
  }

})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
