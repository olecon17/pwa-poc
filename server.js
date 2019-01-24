const jsonServer = require('json-server')
const path = require('path')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

console.log(__dirname)
console.log(path.join(__dirname, 'db.json'))
server.use(middlewares)
server.use('/api', router)  // Rewrite routes to appear after /api
server.listen(8000, function () {
    console.log('JSON Server is running')
})
