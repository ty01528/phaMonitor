import type {ApiPromise} from '@polkadot/api'
import type {ApiDecoration} from '@polkadot/api/types'
import type {FastifyRequest} from 'fastify'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENDPOINT?: string
      NODE_ENV?: 'development' | 'production'
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    rawApi: ApiPromise
    api: ApiPromise | ApiDecoration<'promise'>
    blockNumber: number
    blockHash: string
  }
}
