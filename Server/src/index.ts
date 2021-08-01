import express from 'express'
import { createServer } from 'http'

const app: express.Application = express()

app.get(
  "/",
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("hello typescript express!");
  }
)

const port: number = Number(process.env.PORT) || 3000
const server = createServer(app)

server.listen(port, () => {
  console.log(`${port} Port Listening`)
})
