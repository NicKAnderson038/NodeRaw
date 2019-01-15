const http = require('http')
const { requestHandler } = require('./routes/routes')

// const server = http.createServer((req, res) => {
//   requestHandler(req, res)
// })

const server = http.createServer(requestHandler)

server.listen(3030)
