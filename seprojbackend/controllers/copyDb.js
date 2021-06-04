const onCopyDb = (db) =>{

    db.select('*')
    .from('professor_timetable')
    .then(data =>{
        db.transaction(trx => {
            //console.log(data)
            var queries=[]
            for(var i=0; i<data.length;i++){
                //console.log(i)
                const q=db('professor_timetable_temp')
                .where('email', '=', data[i].email)
                .andWhere('day','=',  data[i].day)
                .andWhere('period','=',  data[i].period)        
                .update({
                    secnumber: data[i].secnumber,
                    subject:  data[i].subject,
                    roomnumber: data[i].roomnumber
                })

                queries.push(q)

            }

            return Promise.all(queries) // Once every query is written
            .then(data=>{
                trx.commit
                console.log("SUccess copy timetable")               
                
            }) // We try to execute all of them
            .catch(err=>{
                trx.rollback                
                console.log("copy timetable fail")
            }); // And rollback in case any of them goes wrong

        });
        
        
    })
    .catch(err => console.log(err))



    db.select('*')
    .from('class_timetable')
    .then(data =>{
        db.transaction(trx => {
            //console.log(data)
            var queries=[]
            for(var i=0; i<data.length;i++){
                //console.log(i)
                const q=db('class_timetable_temp')
                .where('secnumber', '=', data[i].secnumber)
                .andWhere('day','=',  data[i].day)
                .andWhere('period','=',  data[i].period)        
                .update({
                    email: data[i].email,
                    subject:  data[i].subject,
                    roomnumber: data[i].roomnumber
                })
            

                queries.push(q)

            }

            return Promise.all(queries) // Once every query is written
            .then(data=>{
                trx.commit
                console.log("SUccess copy timetable")               
                
            }) // We try to execute all of them
            .catch(err=>{
                trx.rollback                
                console.log("copy timetable fail")
            }); // And rollback in case any of them goes wrong

        });
        
        
    })
    .catch(err => console.log(err))







    db.select('*')
    .from('room_occ_chart')
    .then(data =>{
        db.transaction(trx => {
            //console.log(data)
            var queries=[]
            for(var i=0; i<data.length;i++){
                //console.log(i)
                const q=db('room_occ_chart_temp')
                .where('roomnumber', '=', data[i].roomnumber)
                .andWhere('day','=',  data[i].day)
                .andWhere('period','=',  data[i].period)        
                .update({
                    secnumber: data[i].secnumber,
                    subject:  data[i].subject,
                    email: data[i].email
                })
            

                queries.push(q)

            }

            return Promise.all(queries) // Once every query is written
            .then(data=>{
                trx.commit
                console.log("SUccess copy timetable")               
                
            }) // We try to execute all of them
            .catch(err=>{
                trx.rollback                
                console.log("copy timetable fail")
            }); // And rollback in case any of them goes wrong

        });
        
        
    })
    .catch(err => console.log(err))

    
    

    
}

module.exports ={
    onCopyDb:onCopyDb
}