const onCancelPeriod=(req,res,db)=>{
    const {secnumber,day,period,email}=req.body;
    if(!(secnumber,day,period,email)){
        //console.log("begin")
        return res.status(400).json("Invalid Input. Please enter again")
    }

    db.select('*')
    .from('class_timetable')
    .where('secnumber','=',secnumber)
    .andWhere('day','=',day)
    .andWhere('period','=',period)
    .then(data=>{
        //console.log(data)
        if(!(data)){
            return res.json({
                status:'Invalid Section Number'
            })
        }
        if(!(data[0].email)){
            return res.json({
                status:'Period already free'
            })
        }
        else{
            if(data[0].email==email){
        db.transaction(trx=>{
            var queries=[]
            const q1=db('professor_timetable')
            .where('email','=',data[0].email)
            .andWhere('day','=',day)
            .andWhere('period','=',period)
            .update({
                roomnumber:null,
                secnumber: null,
                subject: null
    
            }) 
            .transacting(trx)
            
            queries.push(q1)

            const q2=db('class_timetable')
            .where('secnumber','=',secnumber)
            .andWhere('day','=',day)
            .andWhere('period','=',period)
            .update({
                roomnumber:null,
                email: null,
                subject: null

            })
            .transacting(trx)

            queries.push(q2)

            const q3=db('room_occ_chart')
            .where('roomnumber','=',data[0].roomnumber)
            .andWhere('day','=',day)
            .andWhere('period','=',period)
            .update({
                secnumber:null,
                email: null,
                subject: null

            })
            .transacting(trx)

            queries.push(q3)


            const q4=db('professor_timetable_temp')
            .where('email','=',data[0].email)
            .andWhere('day','=',day)
            .andWhere('period','=',period)
            .update({
                roomnumber:null,
                secnumber: null,
                subject: null
    
            }) 
            .transacting(trx)
            
            queries.push(q4)

            const q5=db('class_timetable_temp')
            .where('secnumber','=',secnumber)
            .andWhere('day','=',day)
            .andWhere('period','=',period)
            .update({
                roomnumber:null,
                email: null,
                subject: null

            })
            .transacting(trx)

            queries.push(q5)

            const q6=db('room_occ_chart_temp')
            .where('roomnumber','=',data[0].roomnumber)
            .andWhere('day','=',day)
            .andWhere('period','=',period)
            .update({
                secnumber:null,
                email: null,
                subject: null

            })
            .transacting(trx)

            queries.push(q6)



            return Promise.all(queries)
            .then(dt=>{
                trx.commit
                return res.json({
                    status:"Success"
    
                })

            })
            .catch(e=>{
                trx.rollback
                console.log(err)
                res.status(400).json('Failure cancel period')

            })
    
        })
        }
        else{
            return res.json({
                status:"Illegal Access"

            })
        }
        }
        
    })
    .catch(err=>{
        console.log("select query problem")
        res.status(400).json("select query problem")

    })
}

module.exports = {
    onCancelPeriod: onCancelPeriod
}