import Fastify from 'fastify'
console.log('Starting API server...')
import { datasetsRoutes } from './routes/datasets'
console.log('Get ready to serve datasets...')
console.log(`Datasets routes registered: ${datasetsRoutes.name}`)

const app = Fastify({ logger: true })

app.get('/health', async () => ({ ok: true }))

app.register(
  async (api) => {
    await api.register(datasetsRoutes)
  },
  { prefix: '/api' },
)

async function start() {
  try {
    const address = await app.listen({
      port: Number(process.env.PORT) || 3001,
      host: '0.0.0.0',
    })
    app.log.info(`Server listening at ${address}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

async function shutdown(signal: string) {
  app.log.info(`Recieved ${signal}, shutting down gracefully...`)

  try {
    await app.close()
    app.log.info('Server closed successfully')
    process.exit(0)
  } catch (err) {
    app.log.error('Error during shutdown')
    app.log.error(err)
    process.exit(1)
  }
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

start()
