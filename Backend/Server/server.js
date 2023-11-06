const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app=express();
const PORT = 7000;

const config = require('./config')
const routerUser = require('./Routes/user')
const routerQuote = require('./Routes/quote')
const routerFavQuote = require('./Routes/favquotes')

app.use(cors());

app.use(express.json());

app.use((req,res,next)=>{
    console.log("server side done");
    next();
})

app.use((request, response, next) => {
    if (request.url == '/user/login' || request.url == '/user/register') {
      next()
    } else {
      const token = request.headers.authorization
      console.log(`token = ${token}`)
      if (token == null) {
        response.send(utils.createResult('missing token'))
        return
      }
  
      try {
        const payload = jwt.decode(token, config.secret)
  
        request.payload = payload
  
        next()
      } catch (ex) {
        response.send('wrong token')
      }
    }
  })

app.use('/user', routerUser)
app.use('/quote', routerQuote)
app.use('/favquotes', routerFavQuote)

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})