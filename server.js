import { createServer } from 'node:http'

const PORT = 5000

const server = createServer((req, res) => {
    res.end('hello from the server11')
})

server.listen(PORT, () => console.log("CONNECTED to PORT 5000"))