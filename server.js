const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

process.on('uncaughtException', err =>{
    console.log("Uncaught Exception Error");
    console.log(err.name, err.message);
  
        process.exit(1);
});


const app = require('./app')
const mongoose = require('mongoose')



const dbUrl = process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD);
const db = mongoose.connect(dbUrl).then((
    console.log("connected to database❤️")
))


const PORT = 4000;
const server = app.listen(process.env.PORT || PORT, ()=>{
    console.log("server is listening at port 4000");
})

process.on('unhandledRejection', err =>{
    console.log("Unhandled Rejection Error");
    console.log(err.name, err.message);
    server.close(()=>{
        process.exit(1);
    })
})
