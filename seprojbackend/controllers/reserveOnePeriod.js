var roomAllocAlgoSingle=require('./roomAllocAlgoSingle');
async function onReserveOnePeriod(req,res,db){
    const {secnumber,day,period,subject,email}=req.body;
    if(!(secnumber,day,period,subject,email)){
        //console.log("begin")
        return res.status(400).json("Invalid Input. Please enter again")
    }

    console.log(secnumber,day,period,subject,email)
    roomAllocAlgoSingle.handleRoomAllocAlgo(req,res,db,subject,email,secnumber,day,period)

    //while(!(roomnumber)){}

    //console.log(roomnumber)


}


module.exports = {
    onReserveOnePeriod: onReserveOnePeriod
}