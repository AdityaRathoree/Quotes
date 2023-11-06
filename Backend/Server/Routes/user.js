const express = require('express')
const db = require('../db')
const router = express.Router()
const utils = require('./utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const cryptoJs = require('crypto-js')
const mailer = require('../mailer')

router.post('/register', (request, response) => {
  const req = request.body
  const enryptpassword = String(cryptoJs.SHA256(req.password))
  db.query(
    `insert into user(email,firstName,lastName,contactNo,password)
      values('${req.email}','${req.firstName}','${req.lastName}','${req.contactNo}','${enryptpassword}')`,
    (error, result) => {
      mailer.sendEmail(
        req.email,
        'Welcome to QuoteVerse!!!',
        `
              <html>
              <body style="font-family: Arial, sans-serif; color: #333;">
              <h1 style="color: #007bff;">Welcome to Quoteverse!</h1>
              <p>Dear ${req.firstName} ${req.lastName},</p>
              <p>We are absolutely thrilled to welcome you to the Quoteverse community!</p>
              <p>At Quoteverse, we're dedicated to making your experience exceptional.</p>
              <p>As a registered member, you now have access to our latest features, exclusive offers, and a community of enthusiastic users just like you.</p>
              <p>Your feedback and engagement are incredibly important to us. Please feel free to share your thoughts and ideas as we constantly strive to improve our services.</p>
              <p>Thank you for joining us on this exciting journey. Should you have any questions, concerns, or just want to say hello, please don't hesitate to reach out to us. We're here to help!</p>
              <p>Once again, welcome aboard!</p>
              <p>Best regards,<br/>The Quoteverse Team</p>
            </body>
              </html>
              `,
        () => {
          response.send(utils.createResult(error, result))
        }
      )
    }
  )
})

router.post('/login',(request, response) => {
    const cred = request.body
    const encryptpassword = String(cryptoJs.SHA256(cred.password))
    db.query(
      `select * from user where email=? and password=?`,[cred.email, encryptpassword],
      (error, result) => {
        console.log("result")
        console.log(result)
        if(result.length == 0) {
          response.send(utils.createResult("User does not exist"))
        }else{
          console.log("inside else")
          const user = result[0]

          const payload = {
            id: user.id,
            name:`${user.firstName} ${user.lastName} `,
          }
          
          const token = jwt.sign(payload,config.secret)
          
          response.send(utils.createResult(null,{
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            id:user.id,
            token:token,
          }))
        }
      }
    )
  }
)

module.exports = router
