require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // generated ethereal user
    pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  },
});


/**
 * 
 * @param {*} details = {
 *  from: '"Fred Foo 👻" <foo@example.com>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?",
 * }
 */
async function sendMail(details) {
  try {
    await transporter.sendMail(details)
  } catch (error) {
    console.error(error)
  }
}


module.exports = function(config) {
  async function sendMessage(host, phone, msg) {
    try {
      const toAddress = `${phone}@${host}`

      sendMail({
        from: config.from || process.env.EMAIL_FROM,
        to: toAddress,
        subject: config.subject || '',
        text: msg,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const self = {
    alltel: async(phone, msg)=>sendMessage('message.alltel.com', phone, msg),
    att: async(phone, msg)=>sendMessage('txt.att.net', phone, msg),
    tmobile: async(phone, msg)=>sendMessage('tmomail.net', phone, msg),
    virgin: async(phone, msg)=>sendMessage('vmobl.com', phone, msg),
    sprint: async(phone, msg)=>sendMessage('messaging.sprintpcs.com', phone, msg),
    verizon: async(phone, msg)=>sendMessage('vtext.com', phone, msg),
    nextel: async(phone, msg)=>sendMessage('messaging.nextel.com', phone, msg),
    uscellular: async(phone, msg)=>sendMessage('mms.uscc.net', phone, msg),
  }

  return self
}