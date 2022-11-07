import fastify from 'fastify'
import querystring from 'querystring'
import humps from 'humps'
import {poolStakeMonitor} from './models/poolStakeMonitor'
import autoLoad from '@fastify/autoload'
import path from 'path'
import * as schedule from 'node-schedule';
import {SavePoolInfo} from './models/stakePool'

let monitor = new poolStakeMonitor()
SavePoolInfo().then(() => {
    console.log("SavePoolInfo success")
})

const envToLogger = {
    development: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            },
        },
    },
    production: true,
    test: false,
}

const app = fastify({
    querystringParser: (str) =>
        humps.camelizeKeys(querystring.parse(str)) as Record<string, string>,
    logger: process.env.NODE_ENV ? envToLogger[process.env.NODE_ENV] : true,
})

schedule.scheduleJob("*/5 * * * *", function () {
    console.log('This runs every 5 minutes');
    monitor.scanChanges().then(r => r).catch(e => console.log(e))
});

app.register(autoLoad, {
    dir: path.join(__dirname, 'routes'),
})


app.listen({
    port: Number(process.env.PORT) || 3001,
    host: process.env.BIND || '0.0.0.0',
})