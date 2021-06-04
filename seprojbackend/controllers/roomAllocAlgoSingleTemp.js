const handleRoomAllocAlgo=(req,res,db,subject,email,secnumber,day,period) => {
    db.select('*')
    .from('classroom')
    .then(room_size_table=>{
        db.select('*')
        .from('room_occ_chart_temp')
        .then(room_table =>{
            db.select('nostud')
            .from('classname')
            .where('secnumber','=',secnumber)
            .then(class_strength=>{
                console.log("cc",class_strength)
                var roomnumber=greedyAlgo(req,res,db,subject,email,secnumber,day,period,room_size_table,room_table,class_strength[0].nostud)
                console.log(roomnumber)
                if(roomnumber=="-1"){
                    return res.json({
                        status:"No rooms found"
                    })
                }
                if(roomnumber=="-2"){
                    return res.status(400).json('Unable to register the Given User, This may be due to server or network error')
                }
                db.select('*')
                .from('class_timetable_temp')
                .where('secnumber','=',secnumber)
                .andWhere('day','=',day)
                .andWhere('period','=',period)
                .then(data=>{
                    if(!(data)){
                        return res.json({
                            status:'Invalid Section Number'
                        })
                    }
                    if((data[0].email)){
                        return res.json({
                            status:'Period already taken'
                        })
                    }
            
                    else{
                        db.transaction(trx=>{
                            var queries=[]
                            const q1=db('professor_timetable_temp')
                            .where('email','=',email)
                            .andWhere('day','=',day)
                            .andWhere('period','=',period)
                            .update({
                                roomnumber:roomnumber,
                                secnumber: secnumber,
                                subject: subject
                    
                            }) 
                            .transacting(trx)
                            
                            queries.push(q1)
                
                            const q2=db('class_timetable_temp')
                            .where('secnumber','=',secnumber)
                            .andWhere('day','=',day)
                            .andWhere('period','=',period)
                            .update({
                                roomnumber:roomnumber,
                                email: email,
                                subject: subject
                
                            })
                            .transacting(trx)
                
                            queries.push(q2)
                
                            const q3=db('room_occ_chart_temp')
                            .where('roomnumber','=',roomnumber)
                            .andWhere('day','=',day)
                            .andWhere('period','=',period)
                            .update({
                                secnumber: secnumber,
                                email: email,
                                subject: subject
                
                            })
                            .transacting(trx)
                
                            queries.push(q3)
                
                            return Promise.all(queries)
                            .then(dt=>{
                                trx.commit
                                return res.json({
                                    status:"Success"
                    
                                })
                
                            })
                            .catch(e=>{
                                trx.rollback
                                console.log(e)
                                return res.status(400).json('Failure Reserve period')
                
                            })
                    
                        })
                        }
            
            
            
            
                })



                
                

            })
            
        })
    
    })
    .catch(err =>{
        return "-2"
        
    })


     


}

const greedyAlgo=(req,res,db,subject,email,secnumber,day,period,room_size_table,room_table,class_strength)=>{
   
    //sort based on room number
    room_size_table.sort(function(a, b) { 
        return parseInt(a.roomsize) - parseInt(b.roomsize);
    })

    

    

    var class_strength_no= parseInt(class_strength)
    //console.log("cc",class_strength)
    var position=0;
    while ((position<room_size_table.length)&&(class_strength_no>parseInt(room_size_table[position].roomsize))){
        //console.log(room_size_table[position].roomsize)
        position+=1;
        //console.log("pos",position)
        
    }
    var flag=false
     if(position>=room_size_table.length){
         return "-1"
     }
    

            
    var temp=room_size_table[position].roomnumber
    //console.log(temp)
    var new_pos=serach_room(room_table,temp,day,period)
    //console.log("np",+new_pos)
    //console.log(room_table)
    while((new_pos!=-1)&&(room_table[new_pos].secnumber!=null)){
        if(position>=room_size_table.length){
            return "-1"
        }
        position+=1
        temp=room_size_table[position].roomnumber
        //console.log("chh"+day+`${j}`)
        new_pos=serach_room(room_table,temp,day,period)
        //console.log("np",+new_pos)
    }
    if(new_pos==-1){
        flag=true
        
    }
    

    
    if(flag){
        return "-1"
        
    }
    else{
        return room_table[new_pos].roomnumber
    }



}

const serach_room=(rooms,room,day,per)=>{
    for(var x=0;x<rooms.length;x++){

        if((rooms[x].roomnumber===room)&&(rooms[x].day===day)&&(rooms[x].period===per)){
            return x
        }
    }
    return -1
}

module.exports={
    handleRoomAllocAlgo:handleRoomAllocAlgo
}