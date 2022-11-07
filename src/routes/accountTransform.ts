import {FastifyPluginAsync} from 'fastify'
import {encodeAddress, decodeAddress} from '@polkadot/util-crypto'
import {u8aToHex} from '@polkadot/util'

const accountTransform: FastifyPluginAsync = async (app) => {
  app.get<{Querystring: {account: string; output: string}}>(
    '/account_transform',
    async ({query: {account, output}}) => {
      if (output === 'pubkey') {
        return u8aToHex(decodeAddress(account))
      }
      return encodeAddress(account, Number(output))
    }
  )
}

export default accountTransform
