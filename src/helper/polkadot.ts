import {ApiPromise, WsProvider} from '@polkadot/api'
import {HttpProvider} from '@polkadot/rpc-provider/http'
import {khala} from '@phala/typedefs'
import {memoize} from 'lodash'

export const getApi = memoize(async () => {
  const endpoint =
    // process.env.ENDPOINT || 'wss://khala-archive.phala.network/ws'
    process.env.ENDPOINT || 'wss://khala-api.phala.network/ws'
    // process.env.ENDPOINT || 'https://khala-archive.phala.network/'
  let provider = null
  if (endpoint.startsWith('wss://') || endpoint.startsWith('ws://')) {
    provider = new WsProvider(endpoint, 1000)
  } else if (
    endpoint.startsWith('https://') ||
    endpoint.startsWith('http://')
  ) {
    provider = new HttpProvider(endpoint)
  } else {
    console.warn(`Invalid endpoint ${endpoint}`)
    process.exit(1)
  }

  const api = await ApiPromise.create({provider, types: khala})

  return api
})
