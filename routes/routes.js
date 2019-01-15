const fs = require('fs')

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/') {
    res.write('<html>')
    res.write('<head><title>Enter Message</title><head>')
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    )
    res.write('</html>')
    return res.end()
  }
  if (url === '/message' && method === 'POST') {
    /**
     * section 3, lesson 33
     */
    const body = []
    req.on('data', chunk => {
      console.log(chunk)
      body.push(chunk)
    })
    /**
     * Using a 'return' statement before req.on.. makes in synconus.
     * Removing the 'return' makes it async and the code below will run
     * after req.on is called.
     */
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString()
      console.log(parseBody)
      const message = parseBody.split('=')[1]
      // fs.writeFileSync('message.txt', message) // Sync code writing
      // res.statusCode = 302
      // res.setHeader('Location', '/')
      // return res.end()

      /**
       * 'writeFile' is Async for Large files.
       * Save and recommended to use in most situations. Just-in-case.
       */
      fs.writeFile('message.txt', message, err => {
        // off loading to the opperating system which supports multi-threading.
        err ? (res.statusCode = 400) : (res.statusCode = 302)
        res.setHeader('Location', '/')
        return res.end()
      })
    })

    //// create a new file named message.txt with contents 'DUMMY TEXT'
    // fs.writeFileSync('message.txt', 'DUMMY TEXT');
    // res.statusCode = 302;
    // res.setHeader('Location', '/');
    // return res.end();
  }
  res.setHeader('Content-Type', 'text/html')
  res.write('<html>')
  res.write('<head><title>My First Page</title><head>')
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
  res.write('</html>')
  res.end()
}

module.exports = {
  requestHandler,
}
