import type {FastifyPluginAsync} from 'fastify'

const accounts: FastifyPluginAsync = async (app) => {
  app.get('/accounts', async ({api}) => {
    const accounts = await api.query.system.account.entries();
    return accounts.map(([key, value]) => [
      key.args[0].toJSON(),
      value.data.toJSON(),
    ])
  })
}

export default accounts
