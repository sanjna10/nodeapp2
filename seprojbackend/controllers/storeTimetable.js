var roomAllocAlgo=require('./roomAllocAlgo');
const onStoreTimetable =(req,res,db) => {
    const {secnumber,sub_table,fac_table} = req.body;
    if(!(secnumber,sub_table,fac_table)){
        console.log("begin")
        return res.status(400).json("Invalid Input. Please enter again")
    }
    var week_full={
        1:"MONDAY",
        2:"TUESDAY",
        3:"WEDNESDAY",
        4:"THURSDAY",
        5:"FRIDAY"
    }

    

    var new_data;

    db.select('*')
    .from('class_timetable')
    .where('secnumber','=',secnumber)
    .then(data =>{
        //console.log(data.length)
        new_data=data
        //console.log("nd"+new_data)
        var mrk=false;
        
        


        db.transaction(trx=>{
            var queries=[]
            for(var d=1;d<=5;d++){
                for(var p=1;p<=6;p++){
                    if(!(fac_table[week_full[d]][p-1]==="Free")){
                        db.select('*')
                            .from('professor_timetable')
                            .where('email','=',fac_table[week_full[d]][p-1])
                            .andWhere('day','=',week_full[d])
                            .andWhere('period','=',`${p}`)
                            .transacting(trx)
                            .then(fl=>{
                                console.log(fl)
                                if(!((fl[0].secnumber==secnumber)||(fl[0].secnumber==null))){
                                    mrk=true
                                }
                                //console.log("mmmm"+mrk)
    
                                
                                
                            })
                            
                    }

                }
            }
            for(var ech=0;ech<new_data.length;ech++){
                //console.log(new_data[ech].email)
                if(mrk){
                    break
                }

                
                if((new_data[ech].email)){
                    //console.log(new_data[ech])


                    const query1= db('professor_timetable')
                    .where('email','=',new_data[ech].email)
                    .andWhere('day','=',new_data[ech].day)
                    .andWhere('period','=',new_data[ech].period)
                    .andWhere('secnumber','=',secnumber)
                    .update({
                        roomnumber:null,
                        secnumber: null,
                        subject: null
                    })
                    .transacting(trx)
    
                    queries.push(query1)
    
                    const query2=db('class_timetable')
                        .where('secnumber','=',new_data[ech].secnumber)
                        .andWhere('day','=',new_data[ech].day)
                        .andWhere('period','=',new_data[ech].period)
                        .update({
                            roomnumber:null,
                            email: null,
                            subject: null
                        })
                        .transacting(trx)
                    
                    
                    queries.push(query2)
                    if(new_data[ech].roomnumber){
                        const query3=db('room_occ_chart')
                        .where('roomnumber','=',new_data[ech].roomnumber)
                        .andWhere('day','=',new_data[ech].day)
                        .andWhere('period','=',new_data[ech].period)
                        .update({
                            secnumber:null,
                            email: null,
                            subject: null
                        })
                        .transacting(trx)
                    
                    
                        queries.push(query3)
    
    
                    }
    
    
        
                    
                    
                    
                }
            }

            if(mrk){
                queries=[]
            }
            //console.log("iffff"+mrk)
    
            return Promise.all(queries) // Once every query is written
            .then(data1=>{
                trx.commit
                //console.log(data1)
                //console.log("Success clearTimetable")
                //console.log("fff"+mrk)

                if(mrk){
                    return res.status(400).json("Professor Timetable is clashing. Check before uploading")
                }
                else{

                    db.transaction(trx => {
                        const queries = [];
                        var flg=false
                        for (var day=1;day<=5;day++){
                            for(var per=1;per<=6;per++){
                                var ent_fac=fac_table[week_full[day]][per-1];
                                var ent_sub=sub_table[week_full[day]][per-1];
                                if(fac_table[week_full[day]][per-1]==="Free"){
                                    continue
                                }
                                //console.log(fac_table[week_full[day]][per-1])
                                //console.log(sub_table[week_full[day]][per-1])
                                //console.log(day)
                                //console.log(per)
                                //var st_pr=`${per}`
                                //console.log(st_pr)
                                //console.log(secnumber)
                                const query=db('class_timetable')
                                    .where('secnumber', '=', secnumber)
                                    .andWhere('day','=', week_full[day])
                                    .andWhere('period','=', `${per}`)
                                    .update({
                                        email: ent_fac,
                                        subject: ent_sub
                                    })
                                    .transacting(trx)
                                
                                queries.push(query)
    
                                
                
                                const query1=db('professor_timetable')
                                .whereNull('secnumber')
                                .andWhere('email', '=', ent_fac)
                                .andWhere('day','=', week_full[day])
                                .andWhere('period','=', `${per}`)        
                                .update({
                                    secnumber: secnumber,
                                    subject: ent_sub
                                })
                                .transacting(trx)
                
                                queries.push(query1)
        
                                //queries.push(['ssss'])
                    
                
                            }
                        }
                        return Promise.all(queries) // Once every query is written
                            .then(data=>{
                                trx.commit
        
                                //res.json({
                                 //   status:"Success"
                                //})
                                console.log("SUccess storeTimetable")
                                roomAllocAlgo.handleRoomAllocAlgo(req,res,sub_table,fac_table,db,secnumber)
                                
                            }) // We try to execute all of them
                            .catch(err=>{
                                trx.rollback
                                res.status(400).json('Unable to register the Given User, This may be due to server or network error')
                                console.log("busss storeTimetable")
                            }); // And rollback in case any of them goes wrong
                
                        });

                }
            
                
    
    
    
    
            }) // We try to execute all of them
            .catch(err=>{
                trx.rollback
                console.log("Failure clearTimetable")
                console.log(err)
                res.status(400).json('Failure clearTimetable')
            }); // And rollback in case any of them goes wrong*/
    
        })

    })
    .catch(err=>{
        console.log("select query problem")
        res.status(400).json("select query problem")
    })


    


    

}

module.exports = {
    onStoreTimetable: onStoreTimetable
}