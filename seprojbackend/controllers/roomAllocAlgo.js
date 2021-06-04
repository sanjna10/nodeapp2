var copyDb=require('./copyDb');
const handleRoomAllocAlgo=(req,res,sub_table,fac_table,db,secnumber) => {
    db.select('*')
    .from('classroom')
    .then(room_size_table=>{
        
        db.select('*')
        .from('room_occ_chart')
        .then(room_table =>{
            db.select('nostud')
            .from('classname')
            .where('secnumber','=',secnumber)
            .then(class_strength=>{
                //console.log("cc",class_strength)
                greedyAlgo(req,res,db,sub_table,fac_table,room_size_table,room_table,class_strength[0].nostud,secnumber)
                

            })
            
        })
    
    })
    .catch(err =>{
        res.status(400).json('Unable to register the Given User, This may be due to server or network error')
    })


     


}

const greedyAlgo=(req,res,db,sub_table,fac_table,room_size_table,room_table,class_strength,secnumber)=>{
    //var small=[]
    //var medium=[]
    //var large=[]
    //sort based on room number
    room_size_table.sort(function(a, b) { 
        return parseInt(a.roomsize) - parseInt(b.roomsize);
    })

    var week_full={
        1:"MONDAY",
        2:"TUESDAY",
        3:"WEDNESDAY",
        4:"THURSDAY",
        5:"FRIDAY"
    }

    /*for(var pos=0;pos<room_size_table.length;pos++){
        if(room_size_table[pos].roomsize<=30){
            small.push(room_size_table[pos].roomnumber)
        }
        else if(room_size_table[pos].roomsize<=70){
            medium.push(room_size_table[pos].roomnumber)
        }
        else{
            large.push(room_size_table[pos].roomnumber)
        }
    }*/

    var class_strength_no= parseInt(class_strength)
    //console.log("cc",class_strength)
    var position=0;
    while (class_strength_no>parseInt(room_size_table[position].roomsize)){
        //console.log(room_size_table[position].roomsize)
        position+=1;
        //console.log("pos",position)
        
    }
    var flag=false
    db.transaction(trx=>{
        var qs=[]

        for(var i=1;i<=5;i++){
            for(var j=1;j<=6;j++){
                //console.log("cc",i+" "+j)
                if(fac_table[week_full[i]][j-1]=="Free")
                    continue;
                var temp=room_size_table[position].roomnumber
                //console.log(temp)
                var new_pos=serach_room(room_table,temp,week_full[i],`${j}`)
                //console.log("np",+new_pos)
                //console.log(room_table)
                while((new_pos!=-1)&&(room_table[new_pos].secnumber!=null)){
                    position+=1
                    temp=room_size_table[position].roomnumber
                    //console.log("chh"+week_full[i]+`${j}`)
                    new_pos=serach_room(room_table,temp,week_full[i],`${j}`)
                    //console.log("np",+new_pos)
                }
                if(new_pos==-1){
                    flag=true
                    break
                }
                var q1=db('room_occ_chart')
                .where('roomnumber','=',room_table[new_pos].roomnumber)
                .andWhere('day','=',week_full[i])
                .andWhere('period','=',`${j}`)
                .update({
                    email: fac_table[week_full[i]][j-1],
                    subject: sub_table[week_full[i]][j-1],
                    secnumber: secnumber
                })
                .transacting(trx)

                qs.push(q1)

                var q2=db('class_timetable')
                .where('secnumber','=',secnumber)
                .andWhere('day','=',week_full[i])
                .andWhere('period','=',`${j}`)
                .update({
                    roomnumber:room_table[new_pos].roomnumber
                })
                .transacting(trx)
                qs.push(q2)

                var q3=db('professor_timetable')
                .where('email','=',fac_table[week_full[i]][j-1])
                .andWhere('day','=',week_full[i])
                .andWhere('period','=',`${j}`)
                .update({
                    roomnumber:room_table[new_pos].roomnumber
                })
                .transacting(trx)
                qs.push(q3)

                

                var q4=db('room_occ_chart_temp')
                .where('roomnumber','=',room_table[new_pos].roomnumber)
                .andWhere('day','=',week_full[i])
                .andWhere('period','=',`${j}`)
                .update({
                    email: fac_table[week_full[i]][j-1],
                    subject: sub_table[week_full[i]][j-1],
                    secnumber: secnumber
                })
                .transacting(trx)

                qs.push(q4)

                var q5=db('class_timetable_temp')
                .where('secnumber','=',secnumber)
                .andWhere('day','=',week_full[i])
                .andWhere('period','=',`${j}`)
                .update({
                    email: fac_table[week_full[i]][j-1],
                    subject: sub_table[week_full[i]][j-1],
                    roomnumber:room_table[new_pos].roomnumber
                })
                .transacting(trx)
                qs.push(q5)

                var q6=db('professor_timetable_temp')
                .where('email','=',fac_table[week_full[i]][j-1])
                .andWhere('day','=',week_full[i])
                .andWhere('period','=',`${j}`)
                .update({
                    secnumber: secnumber,
                    subject: sub_table[week_full[i]][j-1],
                    roomnumber:room_table[new_pos].roomnumber
                })
                .transacting(trx)
                qs.push(q6)





            }
            if(flag){
                qs=[]
                break;
            }
        }
        
        return Promise.all(qs) // Once every query is written
                    .then(data=>{
                        trx.commit

                        
                        //res.json({
                         //   status:"Success"
                        //})
                        if(!(flag)){
                            console.log("Success roomoccupancy chart")
                            //copyDb.onCopyDb(db)
                        }
                            
                        //roomAllocAlgo.handleRoomAllocAlgo(req,res,sub_table,fac_table,db)
                        
                    }) // We try to execute all of them
                    .catch(err=>{
                        trx.rollback
                        res.status(400).json('Unable to register the Given timetable, This may be due to server or network error')
                        console.log("Failure roomoccupancy chart")
                    }); // And rollback in case any of them goes wrong
        
               

    
    })
    .then(data=>{
        if(flag){
            res.status(400).json('Unable to register the Given Timetable, This may be due to server or network error')
        }
        else{
            res.json({
                status:"Success"
            })
            
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(400).json('Unable to register the Given Timetable, This may be due to server or network error')

    })
    


}

const serach_room=(rooms,room,day,per)=>{
    for(var x=0;x<rooms.length;x++){
        //console.log(rooms[x].roomnumber)
        //console.log(rooms[x].day==day)
        //console.log(rooms[x].period==per)

        //console.log(day)
        //console.log(per)
        if((rooms[x].roomnumber===room)&&(rooms[x].day===day)&&(rooms[x].period===per)){
            return x
        }
    }
    return -1
}

module.exports={
    handleRoomAllocAlgo:handleRoomAllocAlgo
}