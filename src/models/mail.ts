import nodemailer from "nodemailer";

export class mail{
    user = "==="
    pass = "==="
    host = "==="
    port = 465
    secure = true
    requireTLS = true
    transporter = nodemailer.createTransport({
        host: this.host,
        port: this.port,
        secure: this.secure,
        requireTLS: this.requireTLS,
        auth: {
            user: this.user,
            pass: this.pass,
        },
        logger: true
    });
    async sendMail(to: string, header: string, body: string) {
        // send mail with defined transport object
        const info = await this.transporter.sendMail({
            from: this.user,
            to: to,
            subject: header,
            text: "NULL",
            html: body,
            headers: { 'x-myheader': 'test header' }
        });
        console.log("Message sent: %s", info.response);
    }
}
