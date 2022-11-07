import {getApi} from "../helper/polkadot";
import {db} from "./storedb";
import {number} from "@noble/hashes/_assert";

let newDb = new db()

let stake = (n: any) =>{
    if (typeof n === 'number') {
        n = n/1000000000000
    }else if (typeof n === 'string') {
        n = Number(n)/1000000000000
    }
    return n.toFixed(0)
}

async function getStakePoolInfo() {
    let api = await getApi();
    const stakePools = await api.query.phalaStakePool.stakePools.entries()
    let data = stakePools.map(([key, stakePool]) => stakePool.toString())
    return data
}

async function SavePoolInfo() {
    let data = await getStakePoolInfo()
    data.forEach(function (item, index) {
        let dataJson = JSON.parse(item)
        let pid = dataJson.pid
        let withdrawCount = 0
        for (let index = 0;index<dataJson.withdrawQueue.length;index++){
            withdrawCount += dataJson.withdrawQueue[index].shares
        }
        let data = {
            "freeStake": stake(dataJson.freeStake),
            "totalStake": stake(dataJson.totalStake),
            "ownerReward": stake(dataJson.ownerReward),
            "releasingStake": stake(dataJson.releasingStake),
            "totalShares": stake(dataJson.totalShares),
            "withdrawCount": stake(withdrawCount),
            "withdrawQueue": dataJson.withdrawQueue,
        }
        // if (pid == "2285"){
        //     console.log(dataJson)
        // }
        newDb.saveStake(pid,data)
    })
    console.log("save pool info ok")
}
export {SavePoolInfo}