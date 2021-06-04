const handleRegister = (req,res,db) =>{
    const {name,email,password,phoneNumber} = req.body;
    
    if(!(email && name && password && phoneNumber)){
        console.log(name,email,password,phoneNumber)
        return res.status(400).json("Empty values not accepted")
    }

    /*db('teachers').insert({
        name:name,
        email:email,
        phonenumber:phoneNumber,
        password:password
    })
    .then( data=>{
        res.send(data[0])

    } )
    .catch(err=>res.status(400).json('unable to register !!'))*/

    var week_full={
        1:"MONDAY",
        2:"TUESDAY",
        3:"WEDNESDAY",
        4:"THURSDAY",
        5:"FRIDAY"
    }

    db.transaction(trx =>{
        const queries=[]
        

        const q1=db.insert({
            name:name,
            email:email,
            phonenumber:phoneNumber,
            password:password
        })
        .into('teachers')
        .transacting(trx)

        queries.push(q1)

        for(var day=1;day<=5;day++){
            for(var per=1;per<=6;per++){
                const q2= db.insert({
                    email:email,
                    day:week_full[day],
                    period:`${per}`,
                    secnumber:null,
                    roomnumber:null,
                    subject:null,

                })
                .into('professor_timetable')
                .transacting(trx)

                queries.push(q2)
                const q3= db.insert({
                    email:email,
                    day:week_full[day],
                    period:`${per}`,
                    secnumber:null,
                    roomnumber:null,
                    subject:null,

                })
                .into('professor_timetable_temp')
                .transacting(trx)

                queries.push(q3)

            }

        }

        return Promise.all(queries) // Once every query is written
            .then(data=>{
                trx.commit
                res.send({
                    name:name,
                    email:email,
                    phonenumber:phoneNumber,
                    password:password
                    })
                
                    console.log("Registration Successful")
                
            }) // We try to execute all of them
            .catch(err=>{
                trx.rollback
                res.status(400).json('unable to register !!')
                console.log("Registration not successful")
            });



    
    
    })
    

    





    /*db('teachers').insert({
            name:name,
            email:email,
            phoneNumber:phoneNumber,
            password:password
            
        })
        
        .returning('name')
        .then(data=>{
            console.log('success')
            console.log(data[0])
            res.send(data[0])
        })
        .catch(err=>{
            console.log("sss")
            res.status(400).json('unable to register !!')
        })*/
    

    
}

module.exports ={
    handleRegister: handleRegister
}