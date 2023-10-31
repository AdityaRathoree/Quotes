const express = require('express');
const cors = require('cors');
const app=express();
const PORT = 7000;

const routerUser = require('./Routes/user')
const routerQuote = require('./Routes/quote')
const routerFavQuote = require('./Routes/favquotes')

app.use(cors());

app.use(express.json());

app.use('/user', routerUser)
app.use('/quote', routerQuote)
app.use('/favquotes', routerFavQuote)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})