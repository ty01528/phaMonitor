import {db} from './storedb'
import {SavePoolInfo} from './stakePool'
import {mail} from './mail'


export class poolStakeMonitor{
    data = new db()
    async scanChanges(){
        let pidList = await this.data.getPidList().catch(async () => {
            return null
        })
        if (pidList== null||pidList==""||pidList==undefined){
            await SavePoolInfo()
            console.log("No Pid,Waiting register")
            return "No Pid,Waiting register"
        }
        let oldStorageList: any[] = []
        for (let index = 0; index < pidList.length; index++) {
            const pid = pidList[index];
            let poolInfo = await this.data.fromPidGetPoolInfo(pid)
            oldStorageList.push(poolInfo)
            // let poolMail = this.data.fromPidGetEmail(pid)
        }
        await SavePoolInfo().catch().then(async () => {
            for (let index = 0; index < pidList.length; index++) {
                const pid = pidList[index];
                let poolInfoNew = await this.data.fromPidGetPoolInfo(pid)
                let poolMail = await this.data.fromPidGetEmail(pid)
                if (poolInfoNew.freeStake != oldStorageList[index].freeStake ||
                    poolInfoNew.totalStake != oldStorageList[index].totalStake ||
                    poolInfoNew.totalShares != oldStorageList[index].totalShares ||
                    poolInfoNew.releasingStake != oldStorageList[index].releasingStake ||
                    poolInfoNew.withdrawCount != oldStorageList[index].withdrawCount){
                        console.log("send mail")
                    await this.phraseAndSendMail(poolMail,"StakePool "+pid+" Update",pid,poolInfoNew,oldStorageList[index])
                    }
                // await this.phraseAndSendMail(poolMail,"StakePool "+pid+" Update",pid,poolInfoNew,oldStorageList[index])
            }
        })
    }

    async phraseAndSendMail(email: string, subject: string,pid:string, poolInfoNew: any,poolInfo: any) {
        let newMail = new mail()
        let body = " " +
            "<h1>StakePool <b>" +pid+ "</b> Update</h1>" +
            "<p>Hey guys,</p>" +
            "<p>Your StakePool has been updated!</p>" +
            "<hr>"+
            "<p>Pid: <a style='color: chartreuse'>"+pid+"</a></p>" +
            "<p>TotalStake : "+(poolInfo.totalStake ==poolInfoNew.totalStake ? (poolInfo.totalStake):("<s><a  style='color: crimson'>"+poolInfo.totalStake+"</a></s>" +" &rArr; "+poolInfoNew.totalStake ))+"</p>"+
            "<p>TotalShares : "+(poolInfo.totalShares ==poolInfoNew.totalShares ? (poolInfo.totalShares) : ("<s><a  style='color: crimson'>"+poolInfo.totalShares+"</a></s>" + " &rArr; "+poolInfoNew.totalShares ))+"</p>"+
            "<p>FreeStake : "+(poolInfo.freeStake ==poolInfoNew.freeStake ? (poolInfo.freeStake):("<s><a  style='color: crimson'>"+poolInfo.freeStake+"</a></s>" +" &rArr; "+poolInfoNew.freeStake ))+"</p>"+
            "<p>ReleasingStake : "+(poolInfo.releasingStake ==poolInfoNew.releasingStake ?(poolInfo.releasingStake) :("<s><a  style='color: crimson'>"+poolInfo.releasingStake+"</a></s>" +" &rArr; "+poolInfoNew.releasingStake ))+"</p>"+
            "<p>Withdraw : "+(poolInfo.withdrawCount ==poolInfoNew.withdrawCount ? (poolInfo.withdrawCount):("<s><a  style='color: crimson'>"+poolInfo.withdrawCount+"</a></s>" + " &rArr; "+poolInfoNew.withdrawCount ))+"</p>"+
            "<p style='font-size: small'>Click here to get more information <a href='https://app.phala.network/stake-pool/"+pid+"'>app.phala.network</a></p>"+
            "<hr>"+
            "<p style='font-size: xx-small'> Follow this project <a href='https://github.com/ty01528/phaMonitor'>@github" +
            "</a>.  By tianyuan01528@foxmail.com</p>"
        newMail.sendMail(email,subject,body).then(r => {})
        // console.log(poolInfo.withdrawQueue)
    }
}
