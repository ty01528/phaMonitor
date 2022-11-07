import type {FastifyPluginAsync} from 'fastify'

const events: FastifyPluginAsync = async (app) => {
  app.get('/events', async ({api}) => {
    const allRecords = await api.query.system.events()

    return allRecords.map(({event: {method, section, index, data}}) => ({
      data,
      index,
      method,
      section,
    }))
  })
}

export default events
