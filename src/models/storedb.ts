import level from 'level-ts';
import fs from 'fs';

export class db {
    // 查看文件夹是否存在，不存在则创建
    async checkDirExist(p: string) {
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
    init() {
        this.checkDirExist('./database/poolInfo')
        this.checkDirExist('./database/pid2email')
        this.checkDirExist('./database/email2pid')
        this.checkDirExist('./database/poolList')
    }
    private poolInfo_db = new level('./database/poolInfo');
    private pid2email_db = new level('./database/pid2email');
    private email2pid_db = new level('./database/email2pid');
    private poolList = new level('./database/poolList');

    async saveStake(poolId: string, data: {
        releasingStake: number;
        withdrawQueue: string[];
        ownerReward: number;
        totalStake: number;
        totalShares:number;
        freeStake: number;
        withdrawCount: number
    }) {
        await this.poolInfo_db.put(poolId, data)
    }
    async fromPidGetPoolInfo(pid: string) {
        return await this.poolInfo_db.get(pid).catch(
            (err)=>{
                console.log(err)
            }
        )
    }

    async fromPidSetEmail(pid: string, email: string) {
        await this.pid2email_db.get(pid).then(async (data) => {
            if (data==null || data=="" || data==undefined){
                await this.pid2email_db.put(pid, [email])
                await this.fromEmailSetPid(email,pid)
                await this.setPidList(pid)
            } else{
                if (data.includes(email)){
                    return
                }
                data.push(email)
                await this.pid2email_db.put(pid, data)
                await this.fromEmailSetPid(email,pid)
                await this.setPidList(pid)
            }
        }).catch(async () => {
            await this.pid2email_db.put(pid, [email])
            await this.fromEmailSetPid(email,pid)
            await this.setPidList(pid)
        })
    }
    async fromPidGetEmail(pid: string) {
        return await this.pid2email_db.get(pid)
    }
    async fromEmailSetPid(email: string, pid: string) {
        await this.email2pid_db.get(email).then(async (data) => {
            if (data==null || data=="" || data==undefined){
                await this.email2pid_db.put(email, [pid])
            } else{
                data.push(pid)
                await this.email2pid_db.put(email, data)
            }
        }).catch(()=>{
            this.email2pid_db.put(email, [pid])
        })
    }
    async fromEmailGetPid(email: string) {
        return await this.email2pid_db.get(email)
    }
    async setPidList(pid: string) {
        await this.poolList.get("pidList").then(async (data) => {
            if (data==null || data=="" || data==undefined){
                await this.poolList.put("pidList", [pid])
            } else{
                if (data.includes(pid)){
                    return
                }
                data.push(pid)
                await this.poolList.put("pidList", data)
            }
        }).catch(()=>{
            this.poolList.put("pidList", [pid])
        })
    }
    async getPidList() {
        return await this.poolList.get("pidList").catch(
            (err)=>{
                console.log(err)
                return []
            }
        )
    }
}