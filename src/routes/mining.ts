import type {FastifyPluginAsync} from 'fastify'

const mining: FastifyPluginAsync = async (app) => {
  app.get('/miners', async ({api}) => {
    const miners = await api.query.phalaMining.miners.entries()
    const minersEntry = miners.reduce<Record<string, unknown>>(
      (acc, [key, miner]) => {
        acc[key.args[0].toString()] = miner.toJSON()
        return acc
      },
      {}
    )

    return minersEntry
  })

  app.get('/stakes', async ({api}) => {
    const stakes = await api.query.phalaMining.stakes.entries()
    const stakesEntry = stakes.reduce<Record<string, string>>(
      (acc, [key, stake]) => {
        acc[key.args[0].toString()] = stake.toString()
        return acc
      },
      {}
    )

    return stakesEntry
  })

  app.get('/worker_bindings', async ({api}) => {
    const workerBindings = await api.query.phalaMining.workerBindings.entries()
    const workerBindingsEntry = workerBindings.reduce<Record<string, string>>(
      (acc, [key, workerBinding]) => {
        acc[key.args[0].toString()] = workerBinding.toString()
        return acc
      },
      {}
    )

    return workerBindingsEntry
  })

  app.get('/miner_bindings', async ({api}) => {
    const minerBindings = await api.query.phalaMining.minerBindings.entries()
    const minerBindingsEntry = minerBindings.reduce<Record<string, string>>(
      (acc, [key, minerBinding]) => {
        acc[key.args[0].toString()] = minerBinding.toString()
        return acc
      },
      {}
    )

    return minerBindingsEntry
  })
}

export default mining
