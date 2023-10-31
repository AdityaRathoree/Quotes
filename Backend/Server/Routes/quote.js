const express = require('express')
const db = require('../db')
const router = express.Router()

router.post('/create', (request, response) => {
  const req = request.body
  console.log("register : "+request.body);
  db.query(
    `insert into quotes(user_id,text,author)
      values(${req.user_id},'${req.text}','${req.author}')`,
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

router.get('/getAllQuotes',(request, response) => {
    db.query(
      `select * from quotes`,
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

router.get('/getQuotesbyUser/:user_id',(request, response) => {
  const user_id = request.params.user_id;
  console.log("login : "+request.params);
  db.query(
    `select * from quotes where user_id=?`,[user_id],
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

router.get('/getQuotesbyId/:user_id/:id',(request, response) => {
  console.log("login : "+request.params);
  db.query(
    `select * from quotes where user_id=? and id=?`,[request.params.user_id,request.params.id],
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

router.put('/updateQuotes',(request, response) => {
  const cred = request.body
  console.log("login : "+request.body);
  db.query(
    `update quotes set text=?, author=? where user_id=? and id=?`,[cred.text,cred.author,cred.user_id,cred.id],
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

router.delete('/deleteQuotes/:user_id/:id',(request, response) => {

  db.query(
    `delete from quotes where user_id=? and id=?`,[request.params.user_id, request.params.id],
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
