import type {FastifyPluginAsync} from 'fastify'

const identities: FastifyPluginAsync = async (app) => {
  app.get('/identities', async ({api}) => {
    const identity = await api.query.identity.identityOf.entries()
    return identity.map(([key, value]) => [
      key.args[0].toJSON(),
      value.toJSON(),
    ])
  })
}

export default identities
