const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cors = require('cors');

const login = require('./controllers/login');
const register= require('./controllers/register')
const otp = require('./controllers/otp');
const getTeachers= require('./controllers/getTeachers');
const storeTimetable=require('./controllers/storeTimetable');
const getTeacherTimetable=require('./controllers/getTeacherTimetable');
const getClassTimetable=require('./controllers/getClassTimetable');
const getRommOccchart=require('./controllers/getRoomOccchart');
const changePassword=require('./controllers/changePassword')
const cancelPermanent=require('./controllers/cancelPermanent')
const cancelTemp=require('./controllers/cancelTemp')
const reserveOnePeriod=require('./controllers/reserveOnePeriod')
const reserveOnePeriodTemp=require('./controllers/reserveOnePeriodTemp')
const transferPeriod=require('./controllers/transfer')

const db = knex({
    client: 'pg',
    /*connection: {
      host : 'roomoccupancy.postgres.database.azure.com',
      user : 'dhanvanth_06@roomoccupancy',
      password : 'Thudu@123',
      database : 'roomoccupancy',
      ssl: true
    }*/
    connection: {
      host : 'localhost',
      port: 5432,
      user : 'postgres',
      password : '1077',
      database : 'roomoccupancy',
    }
  });


const app = express();

app.use(bodyParser.json());

app.use(cors());

db.select('email','name').from('teachers').then(data=>{
    console.log(data);
});

app.post('/login', (req,res) => { login.handleLogin(req,res,db)} )
app.post('/register', (req,res) => { register.handleRegister(req,res,db)}) //r
app.post('/otp', (req,res) => { otp.handleotp(req,res)} )
app.post('/verifyotp', (req,res) => { otp.handleverifyotp(req,res)} )
app.post('/getotpindb', (req,res) => { otp.handleotpindb(req,res,db)} )
app.post('/getTeachers', (req,res) => { getTeachers.handleGetTeachers(req,res,db)} ) 
app.post('/storeTimetable', (req,res) => { storeTimetable.onStoreTimetable(req,res,db)} )//r
app.post('/getTeacherTimetable',(req,res)=>{getTeacherTimetable.handleGetTeacherTimetable(req,res,db)})
app.post('/getClassTimetable',(req,res)=>{getClassTimetable.handleGetClassTimetable(req,res,db)})
app.post('/getRoomOccchart',(req,res)=>{getRommOccchart.handleGetRoomOccchart(req,res,db)})
app.post('/changePassword',(req,res)=>{changePassword.handleChangePassword(req,res,db)})
app.post('/cancelPermanent',(req,res)=>{cancelPermanent.onCancelPeriod(req,res,db)})
app.post('/cancelTemp',(req,res)=>{cancelTemp.onCancelPeriod(req,res,db)})
app.post('/reserveOnePeriod',(req,res)=>{reserveOnePeriod.onReserveOnePeriod(req,res,db)})
app.post('/reserveOnePeriodTemp',(req,res)=>{reserveOnePeriodTemp.onReserveOnePeriod(req,res,db)})
app.post('/onTransfer',(req,res)=>{transferPeriod.onTransfer(req,res,db)})

app.listen( 2500 , ()=>{
    console.log('Server running on port 2500');
})