const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: '465',
  secure: true,
  auth: {
    user: 'subasterbot@gmail.com',
    pass: 'xkottjkmwlkxogwf',
  },
})

export default async function MAIL(data: any) {
  return await mailTransporter.sendMail(data)
}
