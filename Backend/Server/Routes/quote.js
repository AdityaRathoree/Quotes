const express = require('express')
const db = require('../db')
const router = express.Router()
const utils = require('./utils')

router.post('/create', (request, response) => {
  const req = request.body
  console.log("register : "+request.body);
  db.query(
    `insert into quotes(user_id,text,author,category_id)
      values(${req.user_id},'${req.text}','${req.author}','${req.category_id}')`,
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.get('/getAllQuotes',(request, response) => {
    db.query(
      ` select category.category,category.id,quotes.id, quotes.user_id, quotes.text,quotes.author,quotes.createdDate, quotes.editedDate,quotes.likescount from quotes join category on category.id=quotes.category_id`,
      (error, result) => {
        response.send(utils.createResult(error, result));
      }
    )
  }
)

router.get('/getAllCategories',(request, response) => {
  db.query(
    `select * from category`,
    (error, result) => {
      response.send(utils.createResult(error, result));
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
      response.send(utils.createResult(error, result))
    }
  )
}
)

router.get('/getQuotesbyId/:user_id/:id',(request, response) => {
  console.log("login : "+request.params);
  db.query(
    `select * from quotes where user_id=? and id=?`,[request.params.user_id,request.params.id],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
}
)

router.put('/updateQuotes',(request, response) => {
  const cred = request.body
  console.log("login : "+request.body);
  db.query(
    `update quotes set text=?, author=?, category_id=? where user_id=? and id=?`,[cred.text,cred.author,cred.category_id,cred.user_id,cred.id],
    (error, result) => {
      if(error==null)
      response.send(utils.createResult(error, result))
    }
  )
}
)

router.delete('/deleteQuotes/:user_id/:id',(request, response) => {

  db.query(
    `delete from quotes where user_id=? and id=?`,[request.params.user_id, request.params.id],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
}
)


module.exports = router
