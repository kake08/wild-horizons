import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { getDataFromDB } from './database/db.js'
import { sendJSONResponse } from './utils/sendJSONResponse.js'
import { filterData } from './utils/filterData.js'
import { getDataByQueryParams } from './utils/getDataByQueryParams.js'
 
const PORT = 8000


const server = http.createServer(async (req, res) => {

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    console.log(urlObj)


    const destinations = await getDataFromDB()

  if (urlObj.pathname === '/api' && req.method === 'GET') {
    const queryObj =  Object.fromEntries(urlObj.searchParams)
    let filteredData = getDataByQueryParams(destinations, queryObj)
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
  else if (req.url.startsWith('/images') && req.method ==='GET') {
    // Extract filename from URL (e.g., /images/filename.jpg -> filename.jpg)
    const fileName = req.url.replace('/images/', '')
    const filePath = path.join(process.cwd(), 'database', 'images', fileName)
    
    // Check if file exists
    if (fs.existsSync(filePath)) {
      const fileExtension = path.extname(fileName).toLowerCase()
      let contentType = 'image/jpeg' // default
      
      if (fileExtension === '.png') contentType = 'image/png'
      else if (fileExtension === '.gif') contentType = 'image/gif'
      else if (fileExtension === '.webp') contentType = 'image/webp'
      
      res.setHeader('Content-Type', contentType)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.statusCode = 200
      
      // Stream the file to the response
      const fileStream = fs.createReadStream(filePath)
      fileStream.pipe(res)
      } else {
       res.statusCode = 404
        res.end('Image not found')
      }
  }
  else {
    const errorResponse = {error: "not found", message: "The requested route does not exist"}
    sendJSONResponse(res, 404, errorResponse)
  }

})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
