
function sendSMSviaFast2SMS(message,numbers){
    var unirest = require("unirest");
  
    var req = unirest("POST", "https://www.fast2sms.com/dev/bulk");
  
    req.headers({
      "authorization": "54l7ZWSTEPKYsbAwJV8UMryXnuL0dQRFkiO9pG6cofm3BeNgHCdEJBwrtVcUNosTeuvFqY3Mi9xkHSmf"
    });
  
    req.form({
      "sender_id": "FSTSMS",
      "message": message,
      "language": "unicode",
      "route": "p",
      "numbers": numbers,
    });
  
    req.end(function (res) {
      if (res.error) {
        new Error(res.error);
      }
  
      console.log(res.body);
    });
  }
var rndotp="";
const handleotp=(req,res) =>{
    rndotp=""

    const {phonenumber} = req.body;
    if(!(phonenumber)){
        console.log("hii")
        return res.status(400).json("Invalid Input. Please enter again")
    }
    
    
    for(var i=0;i<4;i++){
        var temp=Math.floor(Math.random() * 10); 

        rndotp+=`${temp}`

    }

    var message_temp="Here is your OTP : "+rndotp

    console.log(message_temp)
    //sendSMSviaFast2SMS(message_temp,phonenumber)
    

    res.json({
        status:"Success"

    })


  }

  const handleotpindb=(req,res,db) =>{
    rndotp=""

    const {phonenumber} = req.body;
    if(!(phonenumber)){
        console.log("hii")
        return res.status(400).json("Invalid Input. Please enter again")
    }

    db.select('*')
    .from('teachers')
    .where('phonenumber','=',phonenumber)
    .then(data=>{
      //console.log("  ddd  ",data)
      if(data.length>0){
        for(var i=0;i<4;i++){
          var temp=Math.floor(Math.random() * 10); 
  
          rndotp+=`${temp}`
  
        }
  
        var message_temp="Here is your OTP : "+rndotp
    
        console.log(message_temp)
        //sendSMSviaFast2SMS(message_temp,phonenumber)
        console.log(data)
    
        res.json({
            status:"Success",
            teacher:data[0]
    
        })

          

      }
      else{
        return res.json({
            status:"Phone Number not found"
        })
      }   

    })
    .catch(err=>{
      res.status(400).json("Invalid Input. Please enter again")
    })
    
    
    

  }

  const handleverifyotp= (req,res)=>{
    const {chotp} = req.body;
    if(!(chotp)){
        return res.status(400).json("Invalid Input. Please enter again")
    }
    
    //console.log(rndotp)
    if(chotp===rndotp){
        return res.json({
            status:"Success"
        })
    }
    else{
        return res.json({
            status:"Failed"
        })
    }

}

/*const handleverifyotpindb= (req,res,db)=>{

  const {chotp,phonenumber} = req.body;
    if(!((chotp)&&(phonenumber))){
      console.log(phonenumber)
      console.log(chotp)
        return res.status(400).json("Invalid Input. Please enter again")
    }
    console.log("sss")
    db.select('email')
    .from('teachers')
    .where('phonenumber','=',phonenumber)
    .then(data=>{
      console.log("  ddd  ",data)
      if(data.length>0){
          if(chotp===rndotp){
            console.log("  ddd  ",data)
            return res.json({
                status:"Success"
            })
          }
          else{
              return res.json({
                  status:"OTP Mismatch"
              })
          }

      }
      else{
        return res.json({
            status:"Phone Number not found"
        })
      }   

    })
    .catch(err=>{
      res.status(400).json("Invalid Input. Please enter again")
    })*/
      
    
    
    //console.log(rndotp)
    
//}

  module.exports = {
    handleotp: handleotp,
    handleverifyotp:handleverifyotp,
    handleotpindb:handleotpindb
    //handleverifyotpindb:handleverifyotpindb
}