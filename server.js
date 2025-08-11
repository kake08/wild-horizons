import { createServer } from 'node:http'

const PORT = 5000

const server = createServer((req, res) => {

    console.log(req.url)

    if (req.url == "/api") {
        res.end('This is from the server.')
    }
    else 
        res.end('root url')
        
})

server.listen(PORT, () => console.log("CONNECTED to PORT 5000"))