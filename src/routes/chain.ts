import type {FastifyPluginAsync} from 'fastify'

const chain: FastifyPluginAsync = async (app) => {
  app.get('/header', async ({rawApi}) => {
    const header = await rawApi.rpc.chain.getHeader()
    return header.toJSON()
  })

  app.get('/timestamp', async ({api}) => {
    const timestamp = await api.query.timestamp.now()
    return timestamp.toNumber()
  })
}

export default chain
