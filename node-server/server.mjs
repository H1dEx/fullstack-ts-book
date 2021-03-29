import http from 'http'
let counter = 0;
console.log('testt')
const server = http.createServer((req, res) => {
    ++counter;
    switch (req.method) {
        case 'GET':
            switch (req.url) {
                case '/':
                    res.end('Yo, pay some response for my name!')
                    break;
                case '/a':
                    res.end('Yo, pay some response for a page!!!!!')
                    break;

            }
            break;
        case 'POST':
            switch (req.url) {
                case '/': {
                    let body = []
                    req.on('data', data => {
                        body.push(data)
                    })
                    req.on('end', () => {
                        res.end(body.toString())
                    })
                    break;
                }
            }
            break;
    }
})

server.listen(2000, () => console.log('Server has been started!'))