import http from 'node:http'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { filterData } from './utils/filterData.js'
 
const PORT = 8000

const server = http.createServer(async (req, res) => {
  const destinations = await getDataFromDB()

  if (req.url === '/api' && req.method === 'GET') {
    sendJSONResponse(res, 200, destinations)
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
