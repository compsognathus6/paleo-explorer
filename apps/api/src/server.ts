import Fastify from 'fastify'

const app = Fastify()

app.get('/health', async () => ({ ok: true }))

app.listen({ port: 3001 }).catch((err) => {
  app.log.error(err)
  process.exit(1)
})
