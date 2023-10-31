const express = require('express')
const db = require('../db')
const router = express.Router()

router.post('/likeQuotes',(request, response) => {
  const cred = request.body
  db.query(
    `insert into Favquotes (user_id,quote_id)
    select ?,? from dual where not exists(select 2 from quotes where
        user_id=? and id=? )`,[cred.user_id, cred.id,cred.user_id, cred.id],
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

router.delete('/deleteFavQuotes/:user_id/:quote_id',(request, response) => {
  db.query(
    `delete from Favquotes where quote_id=? and user_id=?`,[request.params.quote_id, request.params.user_id],
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

router.get('/getFavQuotes/:user_id',(request, response) => {
  db.query(
    `select Favquotes.quote_id,text,author,createdDate 
    from Favquotes join quotes on Favquotes.quote_id = quotes.id where Favquotes.user_id=?`,[request.params.user_id],
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
