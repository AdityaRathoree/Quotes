const express = require('express')
const db = require('../db')
const router = express.Router()

router.post('/register', (request, response) => {
  const req = request.body
  db.query(
    `insert into user(email,firstName,lastName,contactNo,password)
      values('${req.email}','${req.firstName}','${req.lastName}','${req.contactNo}','${req.password}')`,
    (error, result) => {
      if(error==null)
      {
          var data = JSON.stringify(result) 
          response.setHeader("Content-Type","application/json");
          response.send(data);
      } 
      else
      {
          console.log(error);
          response.setHeader("Content-Type","application/json");
          response.send(error)
      }
    }
  )
})

router.post('/login',(request, response) => {
    const cred = request.body
    console.log("login : "+request.body);
    db.query(
      `select * from user where email=? and password=?`,[cred.email, cred.password],
      (error, result) => {
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.send(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.send(error)
        }
      }
    )
  }
)


module.exports = router
