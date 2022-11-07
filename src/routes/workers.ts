import type {FastifyPluginAsync} from 'fastify'

const workers: FastifyPluginAsync = async (app) => {
  app.get('/workers', async ({api}) => {
    const workers = await api.query.phalaRegistry.workers.entries()
    return workers.map(([key, worker]) => worker.toJSON())
  })
}

export default workers
