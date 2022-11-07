import {mail} from './mail'

export class mailAddressValidate{
    newRegister(pid: string, email: string){
        let newMail = new mail();
        let body = " " +
            "<h1>New subscribe for phala-kusama stakepool <b>" +pid+ "</b></h1>" +
            "<p>Hey guys,</p>" +
            "<p style='font-size: larger'>Stakepool <b style='color: firebrick'>"+pid+"</b> has bind with your email: <p style='color: firebrick'>"+email+"</p></p>" +
            "<p style='font-size: small'>Click here to get more information <a href='https://app.phala.network/stake-pool/"+pid+"'>app.phala.network</a></p>"+
            "<hr>"+
            "<p style='font-size: xx-small'> Follow this project <a href='https://github.com/ty01528/phaMonitor'>@github" +
            "</a>.  By tianyuan01528@foxmail.com</p>"
        newMail.sendMail(email, "New subscribe for stakePool "+pid, body).then(() => {
            return "success"
        }).catch(() => {
            return "fail"
        })
    }
}