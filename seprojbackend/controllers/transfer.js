const onTransfer = (req,res,db) =>{
    const {emaila,emailb,secnumbera,secnumberb,roomnumber,subject,day,period} = req.body;
    
    if(!(emaila,emailb,secnumbera,secnumberb,roomnumber,subject,day,period)){
        //console.log(name,email,password,phoneNumber)
        return res.status(400).json("Empty values not accepted")
    }

    db.select('*')
    .from('room_occ_chart_temp')
    .where('roomnumber','=',roomnumber)
    .andWhere('day','=',day)
    .andWhere('period','=',period)
    .then(data=>{
        if((data[0].email===emaila)&&(data[0].secnumber==secnumbera)){
            db.transaction(trx => {
                //console.log(data)
                var queries=[]
                
                const q1=db('professor_timetable_temp')
                .where('email', '=', emaila)
                .andWhere('day','=',  day)
                .andWhere('period','=',  period)        
                .update({
                    secnumber: null,
                    subject:  null,
                    roomnumber: null
                })
                .transacting(trx)
        
                queries.push(q1)
        
                const q2=db('professor_timetable_temp')
                .where('email', '=', emailb)
                .andWhere('day','=',  day)
                .andWhere('period','=',  period)        
                .update({
                    secnumber: secnumberb,
                    subject:  subject,
                    roomnumber: roomnumber
                })
                .transacting(trx)
                queries.push(q2)
        
        
                const q3=db('class_timetable_temp')
                .where('secnumber', '=', secnumbera)
                .andWhere('day','=',  day)
                .andWhere('period','=',  period)        
                .update({
                    roomnumber:null,
                    email: null,
                    subject: null
                })
                .transacting(trx)
        
                queries.push(q3)
        
        
                const q4=db('class_timetable_temp')
                .where('secnumber', '=', secnumberb)
                .andWhere('day','=',  day)
                .andWhere('period','=',  period)        
                .update({
                    roomnumber:roomnumber,
                    email: emailb,
                    subject: subject
                })
                .transacting(trx)
        
                queries.push(q4)
        
        
                const q5=db('room_occ_chart_temp')
                    .where('roomnumber', '=', roomnumber)
                    .andWhere('day','=',  day)
                    .andWhere('period','=',  period)        
                    .update({
                        secnumber: secnumberb,
                        subject:  subject,
                        email: emailb
                    })
                    .transacting(trx)
        
                    queries.push(q5)
        
        
        
        
        
        
                
        
                return Promise.all(queries) // Once every query is written
                .then(data=>{
                    trx.commit
                    console.log("SUccess transfer")  
                    res.json({
                        status:"Success"
                    })             
                    
                }) // We try to execute all of them
                .catch(err=>{
                    trx.rollback                
                    
                    res.status(400).json("query problem")
                }); // And rollback in case any of them goes wrong
        
            })
            .catch(err=>{
                console.log("select query problem")
                res.status(400).json("db problem")
            })






        }
        else{
            res.json({
                status:"Illegal access"
            })

        }
    })
    

    
    

    
}

module.exports ={
    onTransfer:onTransfer
}