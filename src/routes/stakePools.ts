import type {FastifyPluginAsync} from 'fastify'

const stakePools: FastifyPluginAsync = async (app) => {
  app.get('/stake_pools', async ({api}) => {
    const stakePools = await api.query.phalaStakePool.stakePools.entries()
    return stakePools.map(([key, stakePool]) => stakePool.toJSON())
  })

  app.get('/pool_stakers', async ({api}) => {
    const poolStakers = await api.query.phalaStakePool.poolStakers.entries()
    return poolStakers.map(([key, poolStaker]) => [
      key.args[0].toJSON(),
      poolStaker.toJSON(),
    ])
  })

  app.get('/worker_assignments', async ({api}) => {
    const workerAssignments = await api.query.phalaStakePool.workerAssignments.entries()
    const workerAssignmentsEntry = workerAssignments.reduce<Record<string, unknown>>(
      (acc, [pid, key]) => {
        acc[pid.args[0].toString()] = key
        return acc
      },
      {}
    )

    return workerAssignmentsEntry
  })

  app.get('/sub_account_preimages', async ({api}) => {
    if (api.query.phalaStakePool.subAccountPreimages === undefined) {
      return {};
    }
    
    const subAccountPreimages = await api.query.phalaStakePool.subAccountPreimages.entries()
    const subAccountPreimagesEntry = subAccountPreimages.reduce<Record<string, unknown>>(
      (acc, [miner, pid_and_worker]) => {
        acc[miner.args[0].toString()] = pid_and_worker.toJSON()
        return acc
      },
      {}
    )

    return subAccountPreimagesEntry
  })

  app.get('/pool_contribution_whitelists', async ({api}) => {
    if (api.query.phalaStakePool.poolContributionWhitelists === undefined) {
      return {};
    }
    
    const poolContributionWhitelists = await api.query.phalaStakePool.poolContributionWhitelists.entries()
    const poolContributionWhitelistsEntry = poolContributionWhitelists.reduce<Record<string, unknown>>(
      (acc, [pid, address]) => {
        acc[pid.args[0].toString()] = address
        return acc
      },
      {}
    )

    return poolContributionWhitelistsEntry
  })
}

export default stakePools
