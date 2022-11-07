import type {FastifyPluginAsync} from 'fastify';
import {db} from "../models/storedb";
import {mailAddressValidate} from "../models/mailAddressValidate";

const monitorRegister: FastifyPluginAsync = async (app) => {
    app.get('/check-health', async () => 'Ok')
    app.post('/register', function (request, reply) {
        let newDb = new db();
        let newRegister = new mailAddressValidate();
        // @ts-ignore
        let pid = request.body.pid
        // @ts-ignore
        let email = request.body.email
        if (pid == null || email == null) {
            reply.code(400).send("Bad Request : pid or email is null")
            return
        }
        // 判断email是否合法
        if (!email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
            reply.code(400).send("Bad Request : email not valid")
            return
        }
        let data = new db()
        data.fromPidSetEmail(pid, email).then(r => {
            newRegister.newRegister(pid, email)
            reply.send("register success! "+pid+" -> "+email)
        }).catch(e => {
            reply.send("register failed!")
        })
    })
    app.get('/pid-list', function (request, reply) {
        let data = new db()
        let res: any = []
        data.getPidList().then(async(r) => {
            for (let i = 0; i < r.length; i++) {
                let email =await data.fromPidGetEmail(r[i])
                res.push({pid: r[i], email: email})
            }
            reply.send(res)
        }).catch(e => {
            reply.send("get pid-list failed!")
        })
    })
}

export default monitorRegister